import React from 'react';
import './index.css';

import Input from '../../common/Input';

const BrandModal  = ({active, setActive}) => {
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
                            Reebok NFT Certificates
                        </p>

                        <p className="create__item--text">
                            To get on Whitelist let us know the information about your item
                        </p>

                        <Input title="Enter name of the product" placeholder="e.g. Shaq Attaq Basketball Shoes" />
                        <Input title="Material" placeholder="e.g. Eco-leather" />
                        <Input title="The size" placeholder="e.g. Size 10.5" />
                        <Input title="Color" placeholder="e.g. Color Black" />
                        <Input title="Country of origin (Made in)" placeholder="e.g. Made in Indonesia" />
                        <Input title="Place of purchase (shop adress: country, city, street, office)" placeholder="e.g. Newark Avenue 160, Jersey, USA" />
                        <Input title="Date of purchase" placeholder="e.g. Okt 29, 2022" />
                        <Input title="Price" placeholder="e.g. Price 180$" />
                        <Input title="Unique number (if any)" placeholder="e.g. Item no. P00584395" />
                        <Input title="URL link to a picture of your item" placeholder="e.g. https://dropbox.com/..." />
                        <Input textarea title="Describe story about your branded item" placeholder="e.g. In these sneakers I won the basketball World Cup, the Universe Cup and all the Galaxy Cups of the world. Very pleasant memories." />

                        <div className="create__item">
                            <p className="create__item--title">
                                Attention! The information above will be uploaded to the NFT metadata.
                            </p>
                        </div>

                        <Input title="Specify data for feedback" placeholder="Email" />
                        <Input placeholder="Discord name" />

                        <div className="modal__buttons">
                            <button className="button button__default half">
                                Edit
                            </button>

                            <button className="button button__default delete half">
                                Delete
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

export default BrandModal;