import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import Dialog from '../../common/Dialog';
import LevelsRow from './LevelsRow';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import Loader from '../../common/Loader';

import './index.css';

const LevelsDialog = props => {
    const { open, onClose, levels: levelsP, setLevelsHandler } = props;

    const [properties, setProperties] = useState(
        levelsP && levelsP.length > 0
            ? levelsP
            : [
                  {
                      id: _.uniqueId('levels_'),
                      name: '',
                      from: '',
                      to: '',
                  },
              ],
    );
    const [uploadCounter, setUploadCounter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { state: postPropertyState, request: onPostLevel, onClearState } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        method: HTTP_METHODS.POST,
        url: 'levels_stats/',
        isAuth: true,
    });

    const onChangeLevel = useCallback((id, key, value) => {
        setProperties(p =>
            p.map(levels => {
                if (levels.id === id) {
                    return {
                        ...levels,
                        [key]: value,
                    };
                }

                return levels;
            }),
        );
    }, []);

    const onAddMoreHandler = useCallback(() => {
        setProperties(p => [
            ...p,
            {
                id: _.uniqueId('levels_'),
                name: '',
                from: '',
                to: '',
            },
        ]);
    }, []);

    const onDeleteRowHandler = useCallback(id => {
        setProperties(p => p.filter(levels => levels.id !== id));
    }, []);

    const onSaveHandler = useCallback(() => {
        if (properties.length) {
            setUploadCounter(0);
        } else {
            setIsLoading(false);
            setLevelsHandler([]);
        }
    }, [properties]);

    useEffect(() => {
        if (uploadCounter || uploadCounter === 0) {
            setIsLoading(true);
            onPostLevel({
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
                setLevelsHandler(properties);
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
                paper: 'LevelsDialog_dialog_paper',
            }}
            title="Add Levels"
        >
            <p>
                Stats show up underneath your item, are clickable, and can be filtered in your
                collection's sidebar.
            </p>

            {properties.map(p => (
                <LevelsRow
                    key={p.id}
                    id={p.id}
                    from={p.from}
                    to={p.to}
                    onChangeLevel={onChangeLevel}
                    onDeleteRowHandler={onDeleteRowHandler}
                />
            ))}

            <button className="LevelsDialog_dialog_add_more" onClick={onAddMoreHandler}>
                Add more
            </button>

            {isLoading ? (
                <div className="LevelsDialog_dialog_loaderContainer">
                    <Loader />
                </div>
            ) : (
                <button className="LevelsDialog_dialog_save" onClick={onSaveHandler}>
                    Save
                </button>
            )}
        </Dialog>
    );
};

export default React.memo(LevelsDialog);
