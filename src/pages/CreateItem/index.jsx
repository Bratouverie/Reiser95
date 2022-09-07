import React from 'react';

import './index.css';

const CreateItem = () => {
    return(
        <div className="default__padding createpage">
            <div className="container">
                <div className="createpage__inner">
                    <h2 className="title left">
                        Create Item
                    </h2>

                    <p className="text left">
                        Item upload interface
                    </p>

                    <div className="create__content">
                        <div className="create__item half">
                            <p className="create__item--title required">
                                Item
                            </p>

                            <p className="create__item--text">
                                This is the Pack where your item will appear.
                            </p>

                            <div className="create__item--select--inner">
                                <select className="select create__item--select">
                                    <option>Item name</option>
                                    <option>Item name 2</option>
                                    <option>Item name 3</option>
                                    <option>Item name 4</option>
                                    <option>Item name 5</option>
                                </select>

                                <img
                                    src="/assets/img/arrow-select.png"
                                    alt="arrow"
                                    className="create__item--select--icon"
                                />
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title required">
                                Add Images, Videos, Audios, or 3D Models
                            </p>

                            <p className="create__item--text">
                                File types supported: JPG, PNG, GIF, SVG, Mp4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max 1000 files
                            </p>

                            <input id="createitemImgs" type="file" className="file" accept="image/png, image/gif, image/jpeg" />

                            <label htmlFor="createitemImgs" className="create__item--label img">
                                <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                            </label>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title required">
                                Preview Image
                            </p>

                            <p className="create__item--text">
                                Because you&rsque;ve included multimedia, you&rsque;ll need to provide an images (PNG, JPG, or GIF) for the card display of your item.
                            </p>

                            <input id="createitemPreview" type="file" className="file" accept="image/png, image/gif, image/jpeg" />

                            <label htmlFor="createitemPreview" className="create__item--label img">
                                <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                            </label>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title required">
                                Loading table
                            </p>

                            <p className="create__item--text">
                                The table shows which files with which name and price will be uploaded to the smart contract and readiness for uploading. All tokens will have the same characteristics (Link, Description, Collection name, Properties, Blockchain, etc.). But you can change the price of tokens in the table.
                            </p>

                            <div className="create__loading">
                                <div className="create__loading--content">
                                    <div className="create__loading--item">
                                        <p className="create__loading--title"></p>

                                        <p className="create__loading--title">
                                            Token name
                                        </p>

                                        <p className="create__loading--title">
                                            Token Image
                                        </p>

                                        <p className="create__loading--title">
                                            Token Preview
                                        </p>

                                        <p className="create__loading--title">
                                            Price
                                        </p>

                                        <p className="create__loading--title">
                                            Fee
                                        </p>

                                        <p className="create__loading--title">
                                            Upload
                                        </p>
                                    </div>

                                    <div className="create__loading--item">
                                        <p className="create__loading--text">
                                            1
                                        </p>

                                        <p className="create__loading--text">
                                            Common name{" "}
                                            <span className="green__c">
                                                001
                                            </span>
                                        </p>

                                        <p className="create__loading--text">
                                            001.mp4
                                        </p>

                                        <p className="create__loading--text">
                                            001.gif
                                        </p>

                                        <p className="create__loading--text">
                                            Price{" "}
                                            <span className="green__c">
                                                0.01 ETH
                                            </span>
                                        </p>

                                        <p className="create__loading--text">
                                            Fee{" "}
                                            <span className="green__c">
                                                4.5/0.5
                                            </span>
                                        </p>

                                        <p className="create__loading--text">
                                            100%
                                        </p>
                                    </div>
                                </div>

                                <button className="button create__loading--button">
                                    Submit Upload
                                </button>
                            </div>
                        </div>

                        <div className="create__item half">
                            <p className="create__item--title required">
                                Token name
                            </p>

                            <p className="create__item--text">
                                Choose a “common name” so that all tokens have the same name.
                            </p>

                            <input
                                type="text"
                                className="input create__item--input"
                                placeholder="Token name = filename.ext"
                            />
                        </div>

                        <div className="create__item half">
                            <p className="create__item--title">
                                Numbering
                            </p>

                            <p className="create__item--text">
                                When choosing a common name, enter from which number the numbering will start.
                            </p>

                            <input
                                type="text"
                                className="input create__item--input"
                                placeholder="1"
                            />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Tokens price
                            </p>

                            <p className="create__item--text">
                                The price at which the tokens will be put up for sale. All tokens in the pack will have the same price.
                            </p>
                            
                            <div className="control__item">
                                <input
                                    type="text"
                                    className="input create__item--input"
                                    placeholder="0.01"
                                />

                                <div className="create__item--select--inner small">
                                    <select className="select create__item--select">
                                        <option>Eth</option>
                                        <option>Btc</option>
                                        <option>Eur</option>
                                        <option>Usd</option>
                                    </select>

                                    <img
                                        src="/assets/img/arrow-select.png"
                                        alt="arrow"
                                        className="create__item--select--icon"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Investor's royalty
                            </p>

                            <p className="create__item--text">
                                Enter the percentage that will be accrued to the first owner of the token from the second and subsequent sales.
                            </p>

                            <input type="text" className="input create__item--input" placeholder="4.5" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Creator&rsquo;s royalty
                            </p>

                            <p className="create__item--text">
                                Enter the percentage that will be accrued to the team of token creators from the first and subsequent sales.
                            </p>

                            <input type="text" className="input create__item--input" placeholder="0.5" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Creator royalty distribution:
                            </p>

                            <div className="control__item">
                                <input type="text" className="input control__input control__input--mini" value="10" />

                                <input type="text" className="input control__input" value="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF" />

                                <button className="button control__item--settings default__hover">
                                    <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                                </button>

                                <button className="button control__item--confirm default__hover delete">
                                    Delete
                                </button>
                            </div>

                            <div className="control__item">
                                <input type="text" className="input control__input control__input--mini" value="10" />

                                <input type="text" className="input control__input" value="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF" />

                                <button className="button control__item--settings default__hover">
                                    <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                                </button>

                                <button className="button control__item--confirm default__hover delete">
                                    Delete
                                </button>
                            </div>

                            <div className="control__item">
                                <input type="text" className="input control__input control__input--mini" placeholder="10" />

                                <input type="text" className="input control__input" placeholder="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF" />

                                <button className="button control__item--settings default__hover">
                                    <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                                </button>

                                <button className="button control__item--confirm default__hover save">
                                    Save
                                </button>
                            </div>

                            <button className="button control__add default__hover">
                                + Add Wallet address
                            </button>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Income distribution
                            </p>

                            <p className="create__item--text">
                                Income is equal to the cost of selling the token minus royalties. Enter the percentage distribution of income from the sale of tokens.
                            </p>

                            <div className="control__item">
                                <input type="text" className="input control__input control__input--mini" value="10" />

                                <input type="text" className="input control__input" value="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF" />

                                <button className="button control__item--settings default__hover">
                                    <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                                </button>

                                <button className="button control__item--confirm default__hover delete">
                                    Delete
                                </button>
                            </div>

                            <div className="control__item">
                                <input type="text" className="input control__input control__input--mini" value="10" />

                                <input type="text" className="input control__input" value="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF" />

                                <button className="button control__item--settings default__hover">
                                    <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                                </button>

                                <button className="button control__item--confirm default__hover delete">
                                    Delete
                                </button>
                            </div>

                            <div className="control__item">
                                <input type="text" className="input control__input control__input--mini" placeholder="10" />

                                <input type="text" className="input control__input" placeholder="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF" />

                                <button className="button control__item--settings default__hover">
                                    <img src="/assets/img/settings-white.svg" alt="settings" className="control__item--settings--icon" />
                                </button>

                                <button className="button control__item--confirm default__hover save">
                                    Save
                                </button>
                            </div>

                            <button className="button control__add default__hover">
                                + Add Wallet address
                            </button>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                External Link
                            </p>

                            <p className="create__item--text">
                                Item&rsquo;s page will include a link to this URL on this item&rsquo;s detail page, so that users can click to learn more about it. This link will be displayed on item&rsquo;s detail CheckBrand.com page:
                            </p>

                            <input type="text" className="input create__item--input" placeholder="https://OpenSea.io/collection/collectionname" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--text">
                                This link will be displayed on item&rsquo;s detail OpenSea.io page:
                            </p>

                            <input type="text" className="input create__item--input" placeholder="https://CheckBrand.com/pagename" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                Description
                            </p>

                            <p className="create__item--text">
                                The description will be included on the item&rsquo;s detail page underneath its image. 
                            </p>

                            <textarea type="text" className="input create__item--textarea" placeholder="Provide a detailed description of your item."></textarea>
                        </div>

                        <div className="create__item">
                            <div className="create__item--checkbox--inner">
                                <div className="create__item--checkbox--wrapper">
                                    <img src="/assets/img/menu2.svg" alt="prop" className="create__item--checkbox--wrapper--icon" />

                                    <div className="create__item--checkbox--text">
                                        <p className="create__item--checkbox--text--title">
                                            Properties
                                        </p>

                                        <p className="create__item--checkbox--text--text">
                                            Textual traits that show up as rectangles
                                        </p>
                                    </div>
                                </div>

                                <button className="button create__item--add">
                                    <img src="/assets/img/plus.png" alt="add" className="create__item--add--icon" />
                                </button>
                            </div>
                        </div>

                        <div className="create__item">
                            <div className="create__item--checkbox--inner">
                                <div className="create__item--checkbox--wrapper">
                                    <img src="/assets/img/star2.svg" alt="star" className="create__item--checkbox--wrapper--icon" />

                                    <div className="create__item--checkbox--text">
                                        <p className="create__item--checkbox--text--title">
                                            Levels
                                        </p>

                                        <p className="create__item--checkbox--text--text">
                                            Numerical traits that show as a progress bar
                                        </p>
                                    </div>
                                </div>

                                <button className="button create__item--add">
                                    <img src="/assets/img/plus.png" alt="add" className="create__item--add--icon" />
                                </button>
                            </div>
                        </div>

                        <div className="create__item">
                            <div className="create__item--checkbox--inner">
                                <div className="create__item--checkbox--wrapper">
                                    <img src="/assets/img/stats.svg" alt="stat" className="create__item--checkbox--wrapper--icon" />

                                    <div className="create__item--checkbox--text">
                                        <p className="create__item--checkbox--text--title">
                                            Stats
                                        </p>

                                        <p className="create__item--checkbox--text--text">
                                            Numerical traits that just show as numbers
                                        </p>
                                    </div>
                                </div>

                                <button className="button create__item--add">
                                    <img src="/assets/img/plus.png" alt="add" className="create__item--add--icon" />
                                </button>
                            </div>
                        </div>

                        <div className="create__item">
                            <div className="create__item--checkbox--inner">
                                <div className="create__item--checkbox--wrapper">
                                    <img src="/assets/img/lock.png" alt="lock" className="create__item--checkbox--wrapper--icon" />

                                    <div className="create__item--checkbox--text">
                                        <p className="create__item--checkbox--text--title">
                                            Unlockable Content
                                        </p>

                                        <p className="create__item--checkbox--text--text">
                                            Include unlockable content that can only be revealed by the owner of the item.
                                        </p>
                                    </div>
                                </div>

                                <div className="create__item--checkbox--box">
                                    <input type="checkbox" className="create__item--checkbox" id="lock" />

                                    <label htmlFor="lock" className="create__item--checkbox--label"></label>
                                </div>
                            </div>

                            <textarea
                                type="text"
                                className="input create__item--textarea"
                                placeholder="Enter content (access key, code to redeem, link to a file, etc.)"
                            ></textarea>
                        </div>

                        <div className="create__item">
                            <div className="create__item--checkbox--inner">
                                <div className="create__item--checkbox--wrapper">
                                    <img src="/assets/img/warn.png" alt="warn" className="create__item--checkbox--wrapper--icon" />

                                    <div className="create__item--checkbox--text">
                                        <p className="create__item--checkbox--text--title">
                                            Hidden Content
                                        </p>

                                        <p className="create__item--checkbox--text--text">
                                            Upload a cover that will be
                                            displayed on all tokens in the pack
                                            until you disable this feature.
                                        </p>
                                    </div>
                                </div>

                                <div className="create__item--checkbox--box">
                                    <input
                                        type="checkbox"
                                        className="create__item--checkbox"
                                        id="hidden"
                                    />

                                    <label
                                        htmlFor="hidden"
                                        className="create__item--checkbox--label"
                                    ></label>
                                </div>
                            </div>

                            <label
                                htmlFor="createaccountBanner"
                                className="create__item--label cover"
                            >
                                <img
                                    src="/assets/img/img.png"
                                    alt="img"
                                    className="create__item--label--img"
                                />
                            </label>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">Blockchain</p>

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
                            <div className="create__item--checkbox--inner">
                                <div className="create__item--checkbox--wrapper">
                                    <div className="create__item--checkbox--text">
                                        <p className="create__item--checkbox--text--title">
                                            Freeze metadata
                                        </p>

                                        <p className="create__item--checkbox--text--text">
                                            Freeze your metadata will allow you
                                            to permanently lock and store all of
                                            this item&rsquo;s content in
                                            decentralized file storage.
                                        </p>
                                    </div>
                                </div>

                                <div className="create__item--checkbox--box">
                                    <input
                                        type="checkbox"
                                        className="create__item--checkbox"
                                        id="freze"
                                    />

                                    <label
                                        htmlFor="freze"
                                        className="create__item--checkbox--label"
                                    ></label>
                                </div>
                            </div>

                            <button className="button create__item--def--button">
                                Freeze
                            </button>
                        </div>
                    </div>

                    <div className="create__button--content">
                        <div className="create__button--wrapper">
                            <button className="button create__button default__hover">
                                Upload on site
                            </button>

                            <button className="button create__button filled">
                                Upload in Blockchane
                            </button>

                            <button className="button create__button default__hover delete">
                                Delete Pack
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

export default CreateItem;