import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import Dialog from '../../common/Dialog';
import StatsRow from './StatsRow';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import Loader from '../../common/Loader';

import './index.css';

const StatsDialog = props => {
    const { open, onClose, stats: statsP, setStatsHandler } = props;

    const [properties, setProperties] = useState(
        statsP && statsP.length > 0
            ? statsP
            : [
                  {
                      id: _.uniqueId('stats_'),
                      name: '',
                      from: '',
                      to: '',
                  },
              ],
    );
    const [uploadCounter, setUploadCounter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { state: postPropertyState, request: onPostStat, onClearState } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        method: HTTP_METHODS.POST,
        url: 'levels_stats/',
        isAuth: true,
    });

    const onChangeStat = useCallback((id, key, value) => {
        setProperties(p =>
            p.map(stats => {
                if (stats.id === id) {
                    return {
                        ...stats,
                        [key]: value,
                    };
                }

                return stats;
            }),
        );
    }, []);

    const onAddMoreHandler = useCallback(() => {
        setProperties(p => [
            ...p,
            {
                id: _.uniqueId('stats_'),
                name: '',
                from: '',
                to: '',
            },
        ]);
    }, []);

    const onDeleteRowHandler = useCallback(id => {
        setProperties(p => p.filter(stats => stats.id !== id));
    }, []);

    const onSaveHandler = useCallback(() => {
        if (properties.length) {
            setUploadCounter(0);
        } else {
            setIsLoading(false);
            setStatsHandler([]);
        }
    }, [properties]);

    useEffect(() => {
        if (uploadCounter || uploadCounter === 0) {
            setIsLoading(true);
            onPostStat({
                data: {
                    name: properties[uploadCounter].name,
                    type: properties[uploadCounter].type,
                },
            });
        }
    }, [uploadCounter]);

    useEffect(() => {
        if (postPropertyState && postPropertyState.result.data) {
            onClearState();
            if (properties[uploadCounter + 1]) {
                setUploadCounter(p => p + 1);
            } else {
                setIsLoading(false);
                setStatsHandler(properties);
                onClose();
            }
        }
    }, [uploadCounter, properties, postPropertyState]);

    useEffect(
        () => () => {
            onClearState();
        },
        [],
    );

    return (
        <Dialog
            visible={open}
            onClose={onClose}
            classes={{
                paper: 'StatsDialog_dialog_paper',
            }}
            title="Add Stats"
        >
            <p>
                Stats show up underneath your item, are clickable, and can be filtered in your
                collection's sidebar.
            </p>

            {properties.map(p => (
                <StatsRow
                    key={p.id}
                    id={p.id}
                    from={p.from}
                    to={p.to}
                    onChangeStat={onChangeStat}
                    onDeleteRowHandler={onDeleteRowHandler}
                />
            ))}

            <button className="StatsDialog_dialog_add_more" onClick={onAddMoreHandler}>
                Add more
            </button>

            {isLoading ? (
                <div className="StatsDialog_dialog_loaderContainer">
                    <Loader />
                </div>
            ) : (
                <button className="StatsDialog_dialog_save" onClick={onSaveHandler}>
                    Save
                </button>
            )}
        </Dialog>
    );
};

export default React.memo(StatsDialog);
