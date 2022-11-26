import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import Dialog from '../../common/Dialog';
import PropertyRow from './PropertyRow';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { HTTP_METHODS } from '../../const/http/HTTP_METHODS';
import Loader from '../../common/Loader';

import './index.css';

const PropertiesDialog = props => {
    const { open, onClose, properties: propertiesP, setPropertiesHandler } = props;

    const [properties, setProperties] = useState(
        propertiesP && propertiesP.length > 0
            ? propertiesP
            : [
                  {
                      id: _.uniqueId('property_'),
                      name: '',
                      type: '',
                  },
              ],
    );
    const [uploadCounter, setUploadCounter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { state: postPropertyState, request: onPostPropery, onClearState } = useRequest({
        requestType: REQUEST_TYPE.DATA,
        method: HTTP_METHODS.POST,
        url: 'properties/',
        isAuth: true,
    });

    const onChangePropery = useCallback((id, key, value) => {
        setProperties(p =>
            p.map(property => {
                if (property.id === id) {
                    return {
                        ...property,
                        [key]: value,
                    };
                }

                return property;
            }),
        );
    }, []);

    const onAddMoreHandler = useCallback(() => {
        setProperties(p => [
            ...p,
            {
                id: _.uniqueId('property_'),
                name: '',
                type: '',
            },
        ]);
    }, []);

    const onDeleteRowHandler = useCallback(id => {
        setProperties(p => p.filter(property => property.id !== id));
    }, []);

    const onSaveHandler = useCallback(() => {
        if (properties.length) {
            setUploadCounter(0);
        } else {
            setIsLoading(false);
            setPropertiesHandler([]);
        }
    }, [properties]);

    useEffect(() => {
        if (uploadCounter || uploadCounter === 0) {
            setIsLoading(true);
            onPostPropery({
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
                setPropertiesHandler(properties);
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
                paper: 'PropertiesDialog_dialog_paper',
            }}
            title="Add Properties"
        >
            <p>
                Properties show up underneath your item, are clickable, and can be filtered in your
                collection's sidebar.
            </p>

            {properties.map(p => (
                <PropertyRow
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    type={p.type}
                    onChangePropery={onChangePropery}
                    onDeleteRowHandler={onDeleteRowHandler}
                />
            ))}

            <button className="PropertiesDialog_dialog_add_more" onClick={onAddMoreHandler}>
                Add more
            </button>

            {isLoading ? (
                <div className="PropertiesDialog_dialog_loaderContainer">
                    <Loader />
                </div>
            ) : (
                <button className="PropertiesDialog_dialog_save" onClick={onSaveHandler}>
                    Save
                </button>
            )}
        </Dialog>
    );
};

export default React.memo(PropertiesDialog);
