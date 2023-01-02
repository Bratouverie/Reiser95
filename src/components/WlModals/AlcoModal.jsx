import React from 'react';
import './index.css';

import Input from '../../common/Input';

const AlcoModal = (props) => {
    const { onClose, onCreate, isLoading } = props;

    return (
        <>
            <div className="modal__content">
                <div className="modal__content--top">
                    <h2 className="modal__title">Get on Whitelist</h2>

                    <img
                        src="/assets/img/cross.svg"
                        alt="Cross"
                        className="modal__close"
                        onClick={onClose}
                    />
                </div>

                <div className="modal__content--bottom">
                    <p className="blue">Jack Daniel&rsquo;s NFT Certificates</p>

                    <p className="create__item--text">
                        To get on Whitelist let us know the information about your bottle
                    </p>

                    <Input
                        title="Enter name of the product"
                        placeholder="e.g. Old nr 7 - Black Lable"
                    />
                    <Input title="Categories" placeholder="e.g. Whiskey" />
                    <Input title="Year" placeholder="e.g. 1973" />
                    <Input title="Content (m)" placeholder="e.g. 750ml" />
                    <Input title="Country of origin (Made in)" placeholder="e.g. Made in USA" />
                    <Input
                        title="Place of purchase (shop adress: country, city, street, office)"
                        placeholder="e.g. 1950 Cascade Hollow Rd, Tullahoma, TN 37388, USA"
                    />
                    <Input title="Date of purchase" placeholder="e.g. Jul 15, 2017" />
                    <Input title="Price" placeholder="e.g. Price 369.95$" />
                    <Input title="Unique number (if any)" placeholder="e.g. L3 281 1324 4M" />
                    <Input
                        title="URL link to a picture of your item"
                        placeholder="e.g. https://dropbox.com/..."
                    />
                    <Input
                        textarea
                        title="Describe story of the bottle"
                        placeholder="e.g. I had a friend that I had not seen for 5 years come to visit me. To celebrate I got a bottle of Jack, which I had been saving for a special occasion. We drank and my friend told me many interesting stories that had happened to him. It was a wonderful memory..."
                    />

                    <div className="create__item">
                        <p className="create__item--title">
                            Attention! The information above will be uploaded to the NFT metadata.
                        </p>
                    </div>

                    <Input title="Specify data for feedback" placeholder="Email" />
                    <Input placeholder="Discord name" />

                    <div className="modal__buttons">
                        {/* <button className="button button__default half">Edit</button> */}

                        {isLoading ? (
                            <button className="button button__default" disabled>
                                Loading...
                            </button>
                        ) : (
                            <button onClick={onCreate} className="button button__default">
                                Start Checking
                            </button>
                        )}
                    </div>

                    <div className="modal__info">
                        <div className="modal__info--block">
                            After confirmation, the information will be sent to the moderator for
                            verification. If verified successfully, you will receive an email with
                            further instructions. Whitelist cannot be sold or transferred to another
                            person. It will be attached to your wallet. Only you will be able to
                            mint NFT of this collection. After confirmation, the information will be
                            sent to the moderator for verification. If verified successfully, you
                            will receive an email with further instructions. Whitelist cannot be
                            sold or transferred to another person. It will be attached to your
                            wallet. Only you will be able to mint NFT of this collection.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(AlcoModal);
