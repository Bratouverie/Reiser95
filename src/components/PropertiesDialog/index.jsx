import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import Dialog from '../../common/Dialog';
import PropertyRow from './PropertyRow';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import Autocomplite from '../../common/Autocomplite/Autocomplite';
import Loader from '../../common/Loader';

import css from './PropertiesDialog.module.css';

const PropertiesDialog = props => {
    const { open, onClose, properties: propertiesP, setPropertiesHandler } = props;

    const [propertiesList, setPropertiesList] = useState([]);

    const { state: gerPropertiesRS, request: getProperties } = useRequest({
        url: 'properties/',
        requestType: REQUEST_TYPE.DATA,
        isAuth: true,
    });

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

    const onSaveHandler = useCallback(() => {}, [properties]);

    const setPropertiesValue = useCallback(option => {
        console.log({ option });
    }, []);

    useEffect(() => {
        getProperties({});
    }, []);

    useEffect(() => {
        if (gerPropertiesRS.result.data) {
            setPropertiesList(gerPropertiesRS.result.data);
        }
    }, [gerPropertiesRS.result]);

    console.log({ propertiesList });

    return (
        <Dialog
            visible={open}
            onClose={onClose}
            classes={{
                paper: css.PropertiesDialog_dialog_paper,
            }}
            title="Add Properties"
        >
            <p>
                Properties show up underneath your item, are clickable, and can be filtered in your
                collection's sidebar.
            </p>

            <Autocomplite
                multiple
                disableCloseOnSelect
                className={css.autocomplite}
                label="Already existing properties"
                defaultValue={propertiesP.map(p => ({
                    name: `${p.name} - ${p.type}`,
                    value: p.id,
                }))}
                isOptionEqualToValue={(option, value) => {
                    return value.value === option.value;
                }}
                options={propertiesList.map(p => ({ name: `${p.name} - ${p.type}`, value: p.id }))}
                getOptionLabel={option => option.name}
                onChange={setPropertiesValue}
            />

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

            <button className={css.PropertiesDialog_dialog_add_more} onClick={onAddMoreHandler}>
                Add more
            </button>

            <button className={css.PropertiesDialog_dialog_save} onClick={onSaveHandler}>
                Save
            </button>
        </Dialog>
    );
};

export default React.memo(PropertiesDialog);
