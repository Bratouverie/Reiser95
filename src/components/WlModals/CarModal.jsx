import React from 'react';
import './index.css';

import Input from '../../common/Input';

const CarModal  = ({active, setActive}) => {
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
                            Tesla NFT Certificates
                        </p>

                        <p className="create__item--text">
                            To get on Whitelist let us know the information about your car
                        </p>

                        <Input title="Enter model of the car" placeholder="e.g. Model S Performance" />
                        <Input title="Year" placeholder="e.g. 2020" />
                        <Input title="Color" placeholder="e.g. Red" />
                        <Input title="VIN" placeholder="e.g. 5YJSA1E48LF411210" />
                        <Input title="Country of origin (Made in)" placeholder="e.g. Made in USA" />
                        <Input title="Place of purchase (shop adress: country, city, street, office)" placeholder="e.g. 5840 W. Centinela Ave, Los Angeles, CA 90045, USA" />
                        <Input title="Date of purchase" placeholder="e.g. Feb 14, 2021" />
                        <Input title="Price" placeholder="e.g. Price 89.900$" />
                        <Input title="Car number" placeholder="e.g. 8YGK825" />
                        <Input title="URL link to a picture of your item" placeholder="e.g. https://dropbox.com/..." />
                        <Input textarea title="Describe story about the car" placeholder="e.g. The battery in my car ran out. My phone also ran out. I went to the nearest house to call. A beautiful girl opened the door for me. We met and started dating. Then we got married. A miracle? Thank you Tesla!" />

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

export default CarModal;