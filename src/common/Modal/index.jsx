import React from 'react';

import './index.css';

const Modal = ({active, setActive}) => {
    return(
        <div className={`modal${active ? ' active' : ''}`}>
            <div className="modal__inner">
                <div className="modal__content">
                    <div className="modal__content--top">
                        <h2 className="modal__title">
                            Get on WhiteList
                        </h2>

                        <img src="/assets/img/cross.svg" alt="Cross" className="modal__close" onClick={() => setActive(false)} />
                    </div>

                    <div className="modal__content--bottom">
                        <p className="modal__text blue">
                            Collection name
                        </p>

                        <input type="text" className="input modal__input" placeholder='Enter your discord username' />

                        <button className="button modal__button">
                            Support will contact you
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;