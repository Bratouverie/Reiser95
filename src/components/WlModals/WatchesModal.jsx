import React from 'react';
import './index.css';

import Input from '../../common/Input';

const WatchesModal = (props) => {
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
                    <p className="blue">Omega NFT Certificates</p>

                    <p className="create__item--text">
                        To get on Whitelist let us know the information about your watch
                    </p>

                    <Input
                        title="Enter your product's model name"
                        placeholder="e.g. Speedmaster Professional Moonwatch"
                    />
                    <Input title="Case material" placeholder="e.g. Rose gold" />
                    <Input title="Case diameter" placeholder="e.g. 39.7 mm" />
                    <Input title="Dial" placeholder="e.g. Black" />
                    <Input title="Country of origin (Made in)" placeholder="e.g. Swiss made" />
                    <Input
                        title="Place of purchase (shop adress: country, city, street, office)"
                        placeholder="e.g. Reed's Jewelers, 926 Inspiration Dr, Wilmington, 28405, USA"
                    />
                    <Input title="Date of purchase" placeholder="e.g. Nov 17, 2022" />
                    <Input title="Price" placeholder="e.g. Price 31.000$" />
                    <Input title="Serial number (if any)" placeholder="e.g. s/n 1024" />
                    <Input
                        title="URL link to a picture of your item"
                        placeholder="e.g. https://dropbox.com/..."
                    />
                    <Input
                        textarea
                        title="Describe story about your watch"
                        placeholder="e.g. I had a memorable victory at the Crans-sur-Sierre Golf Club in Switzerland. I received an OMEGA watch as my prize. A very nice watch!"
                    />

                    <div className="create__item">
                        <p className="create__item--title">
                            Attention! The information above will be uploaded to the NFT metadata.
                        </p>
                    </div>

                    <Input title="Specify data for feedback" placeholder="Email" />
                    <Input placeholder="Discord name" />

                    <div className="modal__buttons">
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

export default React.memo(WatchesModal);
