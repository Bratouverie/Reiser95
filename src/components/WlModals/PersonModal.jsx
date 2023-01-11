import React from 'react';
import './index.css';

import Input from '../../common/Input';

const PersonModal  = ({active, setActive}) => {
    return(
        <div className={`modal${active ? ' active' : ''}`}>
            <div className="modal__inner">
                <div className="modal__content">
                    <div className="modal__content--top">
                        <h2 className="modal__title">
                            Get on Whitelist
                        </h2>

                        <img src="/assets/img/cross.svg" alt="Cross" className="modal__close" onClick={() => setActive(false)} />
                    </div>

                    <div className="modal__content--bottom">
                        <p className="blue">
                            Dojacat NFT Super Story
                        </p>

                        <p className="create__item--text">
                            To get on Whitelist specify data for feedback
                        </p>

                        <Input placeholder="Email" />
                        <Input placeholder="Discord name" />

                        <div className="modal__buttons">
                            <button className="button button__default">
                                Start Checking
                            </button>
                        </div>

                        <div className="modal__info">
                            <div className="modal__info--block">
                                After confirmation, the information will be sent to the moderator for verification.
                                If verified successfully, you will receive an email with further instructions. 
                                Whitelist cannot be sold or transferred to another person. It will be attached to your wallet.
                                Only you will be able to mint NFT of this collection.
                                After confirmation, the information will be sent to the moderator for verification.
                                If verified successfully, you will receive an email with further instructions. 
                                Whitelist cannot be sold or transferred to another person. It will be attached to your wallet.
                                Only you will be able to mint NFT of this collection.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PersonModal;