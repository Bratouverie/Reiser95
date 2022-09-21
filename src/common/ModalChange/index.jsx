import React from 'react';

const ModalChange = ({active, setActive}) => {
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
                        <input type="text" className="input modal__input" placeholder='Enter your discord username' />

                        <button className="button modal__button">
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalChange;