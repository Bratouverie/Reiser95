import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {hidePage} from '../../functions/data';
import {deletePage} from '../../redux/slices/pages';

const PageItem = ({data}) => {
    const auth = useSelector(state => state.auth);

    const [edit, setEdit] = React.useState(false);
    const [del, setDel] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();

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

    const deletePageFunc = () => {
        setLoading(true);
        const res = hidePage(id, auth.accessToken);
        
        res.then(data => {
            dispatch(deletePage(id));
            alert("Page deleted");
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className={`control__item${loading ? ' loading' : ''}`}>
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
                    <span className="control__button--confirm" onClick={deletePageFunc}>Confirm</span>
                )}
            </button>
        </div>
    );
};

export default PageItem;
