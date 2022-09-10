import React from 'react';

import './index.css';

const CreateCollection = () => {
    return(
        <div className="default__padding createpage">
            <div className="container">
                <div className="createpage__inner">
                    <h2 className="title left">
                        Create a collection
                    </h2>

                    <p className="text left">
                        Collection is creating on the OpenSea and is visible on CheckBrandcom
                    </p>

                    <div className="create__content">
                        <div className="create__item half">
                            <p className="create__item--title required">
                                Logo image
                            </p>

                            <p className="create__item--text">
                                This image will also be used for navigation. 350 x 350 recommended. 
                            </p>

                            <label htmlFor="createaccountBanner" className="create__item--label logo">
                                <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                            </label>
                        </div>

                        <div className="create__item half">
                            <p className="create__item--title">
                                Smart-contract administrator
                            </p>

                            <input type="text" className="input create__item--input" placeholder="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Featured image
                            </p>

                            <p className="create__item--text">
                                This image will be used for featuning your collection on the Account page. 600 x 400 recommended.
                            </p>

                            <label htmlFor="createaccountBanner" className="create__item--label cover">
                                <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                            </label>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Banner image
                            </p>

                            <p className="create__item--text">
                                This image will appear at the top of account page. 1400 x 400 recommended.
                            </p>

                            <input id="createaccountBanner" type="file" className="file" accept="image/png, image/gif, image/jpeg" />

                            <label htmlFor="createaccountBanner" className="create__item--label banner">
                                <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                            </label>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title required">
                                Name
                            </p>

                            <input type="text" className="input create__item--input" placeholder="Enter Collection name" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                URL OpenSea
                            </p>

                            <p className="create__item--text">
                                Customize your URL on OpenSea. Must only contain lowercase letters, numbers, and hyphens.
                            </p>

                            <input type="text" className="input create__item--input" placeholder="https://opensea.io/collection/custom URL" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                URL CheckBrandcom
                            </p>

                            <p className="create__item--text">
                                Customize your URL on CheckBrandcom. Must only contain lowercase letters, numbers, and hyphens.
                            </p>

                            <input type="text" className="input create__item--input" placeholder="https://checkbrand.com/collection/custom URL" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Description
                            </p>

                            <p className="create__item--text">
                                Markdown syntax is supported. 0 of 1000 characters used.
                            </p>

                            <textarea type="text" className="input create__item--textarea"></textarea>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Category OpenSea
                            </p>

                            <p className="create__item--text">
                                Adding a category will help make your item discoverable on OpenSea.
                            </p>

                            <div className="create__item--select--prop">
                                <button className="button create__item--option active">
                                    Art

                                    <img src="/assets/img/check.svg" alt="icon" className="create__item--icon" />
                                </button>

                                <button className="button create__item--option">
                                    Collectibles
                                </button>

                                <button className="button create__item--option">
                                    Music
                                </button>

                                <button className="button create__item--option">
                                    Photography
                                </button>

                                <button className="button create__item--option">
                                    Sports
                                </button>

                                <button className="button create__item--option">
                                    Trading cards
                                </button>

                                <button className="button create__item--option">
                                    Utility
                                </button>
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                CheckBrandcom Page
                            </p>

                            <p className="create__item--text">
                                Select the page that hosts the account where you want to create the collection.
                            </p>

                            <div className="create__item--select--prop">
                                <button className="button create__item--option active">
                                    Brands

                                    <img src="/assets/img/check.svg" alt="icon" className="create__item--icon" />
                                </button>

                                <button className="button create__item--option">
                                    Persons
                                </button>

                                <button className="button create__item--option">
                                    Alco
                                </button>

                                <button className="button create__item--option">
                                    Watches
                                </button>

                                <button className="button create__item--option">
                                    Avto
                                </button>
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Account
                            </p>

                            <p className="create__item--text">
                                Choose an account to place the collection.
                            </p>

                            <div className="create__item--account--inner">
                                

                                <div className="create__item--account--content">
                                    <div className="create__item--account--item">
                                        <input type="radio" name="accounts" className="create__item--account--checkbox" id="account1" />

                                        <label htmlFor="account1" className="create__item--account--item--label">
                                            <span className="create__item--account--item--label--wrap">
                                                <p className="create__item--account--item--num">
                                                    1
                                                </p>

                                                <span className="create__item--account--item--img"></span>

                                                <p className="create__item--account--item--name">
                                                    Account name
                                                </p>
                                            </span>

                                            <span className="create__item--account--item--circle"></span>
                                        </label>
                                    </div>

                                    <div className="create__item--account--item">
                                        <input type="radio" name="accounts" className="create__item--account--checkbox" id="account2" />

                                        <label htmlFor="account2" className="create__item--account--item--label">
                                            <span className="create__item--account--item--label--wrap">
                                                <p className="create__item--account--item--num">
                                                    2
                                                </p>

                                                <span className="create__item--account--item--img"></span>

                                                <p className="create__item--account--item--name">
                                                    Versace
                                                </p>
                                            </span>

                                            <span className="create__item--account--item--circle"></span>
                                        </label>
                                    </div>

                                    <div className="create__item--account--item">
                                        <input type="radio" name="accounts" className="create__item--account--checkbox" id="account3" />

                                        <label htmlFor="account3" className="create__item--account--item--label">
                                            <span className="create__item--account--item--label--wrap">
                                                <p className="create__item--account--item--num">
                                                    3
                                                </p>

                                                <span className="create__item--account--item--img"></span>

                                                <p className="create__item--account--item--name">
                                                    Armani
                                                </p>
                                            </span>

                                            <span className="create__item--account--item--circle"></span>
                                        </label>
                                    </div>

                                    <div className="create__item--account--item">
                                        <input type="radio" name="accounts" className="create__item--account--checkbox" id="account4" />

                                        <label htmlFor="account4" className="create__item--account--item--label">
                                            <span className="create__item--account--item--label--wrap">
                                                <p className="create__item--account--item--num">
                                                    4
                                                </p>

                                                <span className="create__item--account--item--img"></span>

                                                <p className="create__item--account--item--name">
                                                    Gucci
                                                </p>
                                            </span>

                                            <span className="create__item--account--item--circle"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Links
                            </p>

                            <div className="create__item--links">
                                <div className="create__item--link">
                                    <img src="/assets/img/opensea.svg" alt="opensea" className="create__item--link--icon" />

                                    <input className="input create__item--link--input" placeholder="https://opensea.io/abcdef" />
                                </div>
                                
                                <div className="create__item--link">
                                    <img src="/assets/img/discord-white.svg" alt="discord" className="create__item--link--icon" />

                                    <input className="input create__item--link--input" placeholder="https://discord.gg/abcdef" />
                                </div>

                                <div className="create__item--link">
                                    <img src="/assets/img/insta.svg" alt="instagram" className="create__item--link--icon" />

                                    <input className="input create__item--link--input" placeholder="https://www.instagram.com/YourinstagramHandle" />
                                </div>

                                <div className="create__item--link">
                                    <img src="/assets/img/twitter.svg" alt="twitter" className="create__item--link--icon" />

                                    <input className="input create__item--link--input" placeholder="https://twitter.com/abcdef" />
                                </div>
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Creator Earnings
                            </p>

                            <p className="create__item--text">
                                Collect a fee when a user re-sells on item you originally created. This is deducted from the final sale price and paid monthly to a payout address of your choosing.
                            </p>

                            <p className="create__item--text">
                                Percentage fee
                            </p>

                            <input type="text" className="input create__item--input" placeholder="e.g. 5" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Blockchain
                            </p>

                            <p className="create__item--text">
                                Select the blockchain where you&rsquo;d like new items from this collection to be added by default.
                            </p>

                            <div className="create__item--select--inner">
                                <select className="select create__item--select">
                                    <option>Ethereum</option>
                                    <option>Ethereum 2</option>
                                    <option>Ethereum 3</option>
                                    <option>Ethereum 4</option>
                                    <option>Ethereum 5</option>
                                </select>

                                <img
                                    src="/assets/img/arrow-select.png"
                                    alt="arrow"
                                    className="create__item--select--icon"
                                />
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Payment tokens
                            </p>

                            <p className="create__item--text">
                                These tokens can used to buy and sell your items.
                            </p>

                            <div className="create__item--select--prop">
                                <button className="button create__item--pay--button">
                                    <img src="/assets/img/eth.svg" alt="eth" className="create__item--pay--icon" />

                                    <span className="create__item--pay--button--wrap">
                                        <p className="create__item--pay--button--title">
                                            Eth
                                        </p>

                                        <p className="create__item--pay--button--text">
                                            Ethereum
                                        </p>
                                    </span>
                                </button>

                                <button className="button create__item--pay--button">
                                    <img src="/assets/img/cat.png" alt="eth" className="create__item--pay--icon" />

                                    <span className="create__item--pay--button--wrap">
                                        <p className="create__item--pay--button--title">
                                            Eth
                                        </p>

                                        <p className="create__item--pay--button--text">
                                            Ethereum
                                        </p>
                                    </span>
                                </button>
                            </div>

                            <div className="create__item--select--inner">
                                <select className="select create__item--select">
                                    <option>Add token</option>
                                    <option>Add token 2</option>
                                    <option>Add token 3</option>
                                    <option>Add token 4</option>
                                    <option>Add token 5</option>
                                </select>

                                <img
                                    src="/assets/img/arrow-select.png"
                                    alt="arrow"
                                    className="create__item--select--icon"
                                />
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Display theme
                            </p>

                            <p className="create__item--text">
                                Change how your items are shown.
                            </p>

                            <div className="create__item--theme--inner">
                                <button className="button create__item--theme--item">
                                    <img src="/assets/img/display1.png" alt="theme" className="create__item--theme--item--img" />

                                    <p className="create__item--theme--item--title">
                                        Padded
                                    </p>

                                    <p className="create__item--theme--item--text">
                                        Recommended for assets with transparent background
                                    </p>
                                </button>

                                <button className="button create__item--theme--item">
                                    <img src="/assets/img/display2.png" alt="theme" className="create__item--theme--item--img" />

                                    <p className="create__item--theme--item--title">
                                        Contained
                                    </p>

                                    <p className="create__item--theme--item--text">
                                        Recommended for assets that are not a 1:1 ratio
                                    </p>
                                </button>

                                <button className="button create__item--theme--item active">
                                    <img src="/assets/img/display3.png" alt="theme" className="create__item--theme--item--img" />

                                    <p className="create__item--theme--item--title">
                                        Covered
                                    </p>

                                    <p className="create__item--theme--item--text">
                                        Recommended for assets that can extend to the edge
                                    </p>

                                    <img src="/assets/img/check.svg" alt="icon" className="create__item--icon" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="create__button--content">
                        <div className="create__button--wrapper">
                            <button className="button create__button default__hover">
                                Create
                            </button>

                            <button className="button create__button filled">
                                Upload in Blockchane
                            </button>

                            <button className="button create__button default__hover delete">
                                Delete Collection
                            </button>
                        </div>

                        <div className="create__button--wrapper">
                            <button className="button create__button default__hover">
                                Submit changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCollection;