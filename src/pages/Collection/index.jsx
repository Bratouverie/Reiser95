import React from "react";

import "./index.css";

const Collection = () => {
    return (
        <>
            <div className="collection__header">
                <div className="container collection__container posr">
                    <div className="collection__avatar--inner">
                        <img
                            src="/assets/img/brand1.png"
                            alt="avatar"
                            className="collection__avatar"
                        />
                    </div>
                </div>
            </div>

            <div className="collection">
                <div className="container">
                    <div className="collection__inner">
                        <div className="collection__link--inner">
                            <button className="button collection__get--whitelist default__hover">
                                <img
                                    src="/assets/img/star.svg"
                                    alt="star"
                                    className="collection__button--icon"
                                />
                                Get on White List
                            </button>

                            <div className="collection__social--inner">
                                <a
                                    href="https://google.com"
                                    className="collection__social--link default__hover"
                                >
                                    <img
                                        src="/assets/img/twitter.svg"
                                        alt="twitter"
                                        className="collection__social--icon"
                                    />
                                </a>

                                <a
                                    href="https://google.com"
                                    className="collection__social--link default__hover"
                                >
                                    <img
                                        src="/assets/img/opensea.svg"
                                        alt="opensea"
                                        className="collection__social--icon"
                                    />
                                </a>

                                <a
                                    href="https://google.com"
                                    className="collection__social--link default__hover"
                                >
                                    <img
                                        src="/assets/img/insta.svg"
                                        alt="instagram"
                                        className="collection__social--icon"
                                    />
                                </a>

                                <a
                                    href="https://google.com"
                                    className="collection__social--link default__hover"
                                >
                                    <img
                                        src="/assets/img/dots.svg"
                                        alt="more"
                                        className="collection__social--icon"
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="collection__social--mobile">
                            <a href="https://google.com" className="collection__social--link--mobile">
                                <img src="/assets/img/insta.svg" alt="instagram" className="collection__social--img" />
                            </a>

                            <a href="https://google.com" className="collection__social--link--mobile">
                                <img src="/assets/img/opensea.svg" alt="opensea" className="collection__social--img" />
                            </a>

                            <a href="https://google.com" className="collection__social--link--mobile">
                                <img src="/assets/img/discord-white.svg" alt="discord" className="collection__social--img" />
                            </a>

                            <a href="https://google.com" className="collection__social--link--mobile line">
                                <img src="/assets/img/twitter.svg" alt="twitter" className="collection__social--img" />
                            </a>

                            <a href="https://google.com" className="collection__social--link--mobile">
                                <img src="/assets/img/star.svg" alt="twitter" className="collection__social--img" />
                            </a>

                            <a href="https://google.com" className="collection__social--link--mobile">
                                <img src="/assets/img/give.svg" alt="twitter" className="collection__social--img" />
                            </a>

                            <a href="https://google.com" className="collection__social--link--mobile">
                                <img src="/assets/img/dots-white.svg" alt="twitter" className="collection__social--img" />
                            </a>
                        </div>

                        <h2 className="title collection__title">
                            Versace NTF Certificates
                        </h2>

                        <div className="collection__text">
                            Created by{" "}
                            <span className="blue">CheckBrandcom</span>
                        </div>

                        <a
                            href="https://google.com"
                            className="collection__discord--link default__hover"
                        >
                            <img
                                src="/assets/img/discord.svg"
                                alt="discord"
                                className="collection__discord--icon"
                            />
                            Discord support
                        </a>

                        <div className="collection__data">
                            <div className="collection__data--item">
                                <h3 className="collection__data--title">5</h3>

                                <p className="collection__data--text">items</p>
                            </div>

                            <div className="collection__data--item">
                                <h3 className="collection__data--title">0</h3>

                                <p className="collection__data--text">owners</p>
                            </div>

                            <div className="collection__data--item">
                                <h3 className="collection__data--title">
                                    <img
                                        src="/assets/img/eth.svg"
                                        alt="eth"
                                        className="collection__data--eth"
                                    />
                                    0
                                </h3>

                                <p className="collection__data--text">
                                    floor price
                                </p>
                            </div>

                            <div className="collection__data--item">
                                <h3 className="collection__data--title">
                                    <img
                                        src="/assets/img/eth.svg"
                                        alt="eth"
                                        className="collection__data--eth"
                                    />
                                    0
                                </h3>

                                <p className="collection__data--text">
                                    volume traded
                                </p>
                            </div>
                        </div>

                        <p className="collection__desc">
                            'Unique cards designed to certify branded items.
                            Each NFT is associated with a real tangible brand
                            item. Before minting a token, we authenticate the
                            thing with which it will be associated. In case of
                            authentication confirmation, the user gets access to
                            the NFT certificate creation service.
                        </p>
                    </div>
                </div>
            </div>

            <div className="collection__items">
                <div className="container">
                    <div className="collection__items--inner">
                        <p className="collection__items--value">5 items</p>

                        <div className="collection__items--content">
                            <div className="collection__item">
                                <div className="collection__item--img--inner"></div>

                                <div className="collection__item--data--inner">
                                    <div className="collection__item--data--card">
                                        <p className="collection__item--title">
                                            Unique card #002
                                        </p>

                                        <p className="collection__item--text">
                                            Versace NFT Certificates
                                        </p>
                                    </div>

                                    <div className="collection__item--data--price">
                                        <p className="collection__item--text right">
                                            Price
                                        </p>

                                        <p className="collection__item--text right">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            \\\
                                        </p>
                                    </div>
                                </div>

                                <div className="collection__item--button--inner">
                                    <div className="collection__item--text bold">
                                        For auction
                                    </div>

                                    <p className="collection__item--button--text">
                                        Investor&rsquo;s royalty 10%
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
                                            className="eth"
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
                                            className="eth"
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
                                            Unique card #002
                                        </p>

                                        <p className="collection__item--text">
                                            Versace NFT Certificates
                                        </p>
                                    </div>

                                    <div className="collection__item--data--price">
                                        <p className="collection__item--text right">
                                            Price
                                        </p>

                                        <p className="collection__item--text right">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            \\\
                                        </p>
                                    </div>
                                </div>

                                <div className="collection__item--button--inner">
                                    <div className="collection__item--text bold">
                                        For auction
                                    </div>

                                    <p className="collection__item--button--text">
                                        Investor&rsquo;s royalty 10%
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
                                            className="eth"
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
                                            className="eth"
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
                                            Unique card #002
                                        </p>

                                        <p className="collection__item--text">
                                            Versace NFT Certificates
                                        </p>
                                    </div>

                                    <div className="collection__item--data--price">
                                        <p className="collection__item--text right">
                                            Price
                                        </p>

                                        <p className="collection__item--text right">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            \\\
                                        </p>
                                    </div>
                                </div>

                                <div className="collection__item--button--inner">
                                    <div className="collection__item--text bold">
                                        For auction
                                    </div>

                                    <p className="collection__item--button--text">
                                        Investor&rsquo;s royalty 10%
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
                                            className="eth"
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
                                            className="eth"
                                        />
                                        0.01
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collection;
