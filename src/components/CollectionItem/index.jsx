import React from 'react';

const CollectionItem = props => {
    return (
        <div className="collection__item">
            <div className="collection__item--img--inner"></div>

            <div className="collection__item--data--inner">
                <div className="collection__item--data--card">
                    <p className="collection__item--title">Unique card #004</p>

                    <p className="collection__item--text">Versace NFT Certificates</p>
                </div>

                <div className="collection__item--data--price">
                    <p className="collection__item--text right">Price</p>

                    <p className="collection__item--text right bold">
                        <img src="/assets/img/eth.svg" alt="eth" className="eth" />
                        0.01
                    </p>
                </div>
            </div>

            <div className="collection__item--button--inner">
                <button className="button collection__item--button blue__button">Mint</button>

                <p className="collection__item--button--text">Investor&rsquo;s royalty 4.5%</p>
            </div>
        </div>
    );
};

export default CollectionItem;
