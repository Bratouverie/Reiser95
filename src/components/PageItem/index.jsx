import React from "react";

import api from '../../api';

const PageItem = ({data}) => {
    const [edit, setEdit] = React.useState(false);
    const [del, setDel] = React.useState(false);

    const {name, id} = data;

    const confirmFunc = (attr) => {
        if(attr === "edit"){
            setDel(false);
            setEdit(!edit);
        }
        else{
            setEdit(false);
            setDel(!del);
        }
    };

    const hidePage = () => {
        // api.patch(`page/hide/${id}/`, {
        //     hide: true
        // }).then(data => {
        //     console.log(data);
        // }).catch(e => {
        //     console.log(e);
        // });
    }

    return (
        <div className="control__item">
            <input
                type="text"
                readOnly
                placeholder={name}
                className="input control__input"
            />

            <button
                className="button control__item--settings default__hover"
                onClick={() => confirmFunc("edit")}
            >
                <img
                    src="/assets/img/settings-white.svg"
                    alt="settings"
                    className="control__item--settings--icon"
                />

                {edit && <span className="control__button--confirm">Edit</span>}
            </button>

            <button
                className="button control__item--confirm default__hover delete"
                onClick={() => confirmFunc("delete")}
            >
                Delete
                {del && (
                    <span className="control__button--confirm" onClick={hidePage}>Confirm</span>
                )}
            </button>
        </div>
    );
};

export default PageItem;
