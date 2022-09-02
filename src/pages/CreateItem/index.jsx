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
                                Pack
                            </p>

                            <p className="create__item--text">
                                This is the Pack where your item will appear.
                            </p>

                            
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