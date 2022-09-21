import React from "react";

import "./index.css";

import ModalChange from "../../common/ModalChange";

const Profile = () => {
    const [modal, setModal] = React.useState(false);

    return (
        <>
            <section className="profile">
                <div className="container">
                    <div className="profile__inner">
                        <div className="profile__buttons">
                            <button className="button profile__share">
                                <img
                                    src="/assets/img/share.svg"
                                    alt="share"
                                    className="profile__share--icon"
                                />
                            </button>

                            <button className="button profile__share">
                                <img
                                    src="/assets/img/dots-white.svg"
                                    alt="dots"
                                    className="profile__share--icon"
                                />
                            </button>
                        </div>

                        <div className="profile__ava--inner">
                            <img
                                src="/assets/img/profile.png"
                                alt="ava"
                                className="profile__ava--img"
                            />

                            <button
                                className="button profile__settings"
                                onClick={() => setModal(true)}
                            >
                                <img
                                    src="/assets/img/settings.svg"
                                    alt="settings"
                                    className="profile__settings--icon"
                                />
                            </button>
                        </div>

                        <p className="profile__name">Collector name</p>

                        <div className="profile__wrap">
                            <div className="profile__wallet">
                                <img
                                    src="/assets/img/eth.svg"
                                    alt="eth"
                                    className="eth"
                                />
                                0x495f...7b5e
                            </div>

                            <p className="profile__date">Joined Month Year</p>
                        </div>

                        <div className="collection__items--content">
                            <div className="collection__item">
                                <div className="collection__item--img--inner"></div>

                                <div className="collection__item--data--inner">
                                    <div className="collection__item--data--card">
                                        <p className="collection__item--title">
                                            Unique card #004
                                        </p>

                                        <p className="collection__item--text">
                                            Versace NFT Certificates
                                        </p>
                                    </div>

                                    <div className="collection__item--data--price">
                                        <p className="collection__item--text right">
                                            Price
                                        </p>

                                        <p className="collection__item--text right bold">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            0.01
                                        </p>
                                    </div>
                                </div>

                                <div className="collection__item--button--inner">
                                    <button className="button collection__item--button blue__button">
                                        Mint
                                    </button>

                                    <p className="collection__item--button--text">
                                        Investor&rsquo;s royalty 4.5%
                                    </p>
                                </div>
                            </div>

                            <div className="collection__item">
                                <div className="collection__item--img--inner"></div>

                                <div className="collection__item--data--inner">
                                    <div className="collection__item--data--card">
                                        <p className="collection__item--title">
                                            Unique card #005
                                        </p>

                                        <p className="collection__item--text">
                                            Versace NFT Certificates
                                        </p>
                                    </div>
                                </div>

                                <div className="collection__item--button--inner end">
                                    <p className="collection__item--text right bold">
                                        Last
                                        <img
                                            src="/assets/img/eth.svg"
                                            alt="eth"
                                            className="eth m"
                                        />
                                        0.01
                                    </p>
                                </div>
                            </div>

                            <div className="collection__item">
                                <div className="collection__item--img--inner"></div>

                                <div className="collection__item--data--inner">
                                    <div className="collection__item--data--card">
                                        <p className="collection__item--title">
                                            Unique card #005
                                        </p>

                                        <p className="collection__item--text">
                                            Versace NFT Certificates
                                        </p>
                                    </div>

                                    <div className="collection__item--data--price">
                                        <p className="collection__item--text right">
                                            Price
                                        </p>

                                        <p className="collection__item--text right bold">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            0.01
                                        </p>
                                    </div>
                                </div>

                                <div className="collection__item--button--inner end">
                                    <p className="collection__item--text right bold">
                                        Last
                                        <img
                                            src="/assets/img/eth.svg"
                                            alt="eth"
                                            className="eth m"
                                        />
                                        0.01
                                    </p>
                                </div>
                            </div>

                            <div className="collection__item">
                                <div className="collection__item--img--inner"></div>

                                <div className="collection__item--data--inner">
                                    <div className="collection__item--data--card">
                                        <p className="collection__item--title">
                                            Unique card #001
                                        </p>

                                        <p className="collection__item--text">
                                            Versace NFT Certificates
                                        </p>
                                    </div>

                                    <div className="collection__item--data--price">
                                        <p className="collection__item--text right">
                                            Price
                                        </p>

                                        <p className="collection__item--text right bold">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            0.01
                                        </p>
                                    </div>
                                </div>

                                <div className="collection__item--button--inner">
                                    <button className="button collection__item--button green">
                                        Book
                                    </button>

                                    <p className="collection__item--button--text">
                                        Investor&rsquo;s royalty 4.5%
                                    </p>
                                </div>
                            </div>

                            <div className="collection__item">
                                <div className="collection__item--img--inner"></div>

                                <div className="collection__item--data--inner">
                                    <div className="collection__item--data--card">
                                        <p className="collection__item--title">
                                            Unique card #003
                                        </p>

                                        <p className="collection__item--text">
                                            Versace NFT Certificates
                                        </p>
                                    </div>

                                    <div className="collection__item--data--price">
                                        <p className="collection__item--text right">
                                            Price
                                        </p>

                                        <p className="collection__item--text right bold">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            0.01
                                        </p>
                                    </div>
                                </div>

                                <div className="collection__item--button--inner">
                                    <button className="button collection__item--button white">
                                        Booked
                                    </button>

                                    <p className="collection__item--button--text">
                                        Investor&rsquo;s royalty 4.5%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ModalChange active={modal} setActive={setModal} />
        </>
    );
};

export default Profile;
