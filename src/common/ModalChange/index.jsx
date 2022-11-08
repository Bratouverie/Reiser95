import React from 'react';

import './index.css';

const ModalChange = ({active, setActive, placeholder = "", value = "", setValue, callback = () => {}}) => {
    const changeData = (e) => {
        setValue(e.target.value);
    }

    const changeFunction = () => {
        if(!value){
            alert("Please enter data");
        }
        else{
            callback();
            setActive(false);
        }
    }

    return(
        <div className={`modal${active ? ' active' : ''}`}>
            <div className="modal__inner">
                <div className="modal__content">
                    <div className="modal__content--top">
                        <h2 className="modal__title">
                            Change name
                        </h2>

                        <img src="/assets/img/cross.svg" alt="Cross" className="modal__close" onClick={() => setActive(false)} />
                    </div>

                    <div className="modal__content--bottom">
                        <input type="text" className="input modal__input" placeholder={placeholder} value={value} onChange={changeData} />

                        <button className="button modal__button" onClick={changeFunction}>
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalChange;