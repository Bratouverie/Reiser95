import React from 'react';
import './index.css';

import Input from '../../common/Input';
import CustomSelect from '../../common/CustomSelect/CustomSelect';

const NrcModal  = ({active, setActive}) => {
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
                            Lissa Brand NFT Certificates
                        </p>

                        <p className="create__item--text">
                            To get on Whitelist let us know your idea
                        </p>

                        <Input title="Name of the product" placeholder="T-Shot Fox" />
                        <Input title="Material" placeholder="Polyester" />

                        <div className="create__item">
                            <CustomSelect placeholder="Choose the size" optionsList={[
                                {value: "Test", name: "Тест"}
                            ]}  />
                        </div>
                        
                        <Input title="Coloror" placeholder="<color of NFT>" />
                        <Input title="Country of origin (Made in)" placeholder="Made in USA" />
                        <Input title="Place of purchase" placeholder="www.checkbrand.com" />
                        <Input title="Date of purchase" placeholder="<mint date>" />
                        <Input title="Price" placeholder="<NFT price>" />
                        <Input title="Unique number" placeholder="<unique card nr>" />
                        <Input title="URL link to a  picture" placeholder="<will be added>" />
                        <Input textarea title="Describe idea about the developed of this product" placeholder="e.g. I want to make the world a better place. To do this, I am working on a project to improve people's quality of life. The idea is for everyone involved in the project to use a fully autonomous and decentralized payment system without commissions." />

                        <div className="create__item">
                            <p className="create__item--title">
                                Attention! The information above will be uploaded to the NFT metadata.
                            </p>
                        </div>

                        <Input title="Specify data for feedback" placeholder="Email" />
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

export default NrcModal;