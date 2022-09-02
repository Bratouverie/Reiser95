import React from "react";

const Token = () => {
    return (
        <div className="statistics__inner">
            <h2 className="statistics__title">Tokens</h2>

            <div className="statistics__content">
                <div className="statistics__token--item titles">
                    <p className="statistics__subtitle">Item</p>

                    <p className="statistics__subtitle">Price</p>

                    <p className="statistics__subtitle">Profit</p>

                    <p className="statistics__subtitle">OpenSea URL</p>

                    <p className="statistics__subtitle">CheBrcom URL</p>

                    <p className="statistics__subtitle">Item Link</p>

                    <p className="statistics__subtitle">Description</p>

                    <p className="statistics__subtitle">Properties</p>

                    <p className="statistics__subtitle">Levels</p>

                    <p className="statistics__subtitle">Stats</p>

                    <p className="statistics__subtitle">Unlockable Content</p>

                    <p className="statistics__subtitle">Hidden</p>

                    <p className="statistics__subtitle">Fee % Inv./Cre.</p>

                    <p className="statistics__subtitle">Blockchain</p>

                    <p className="statistics__subtitle">Freeze Metadata</p>

                    <p className="statistics__subtitle">Status</p>
                </div>

                <div className="statistics__token--item">
                    <div className="statistics__collection">
                        <p className="stats__item--value">1</p>

                        <div className="stats__item--avatar--inner">
                            <img
                                src="/assets/img/avatar.png"
                                alt="avatar"
                                className="stats__item--avatar"
                            />
                        </div>

                        <div className="stats__item--wrapper">
                            <p className="stats__item--value">Token name</p>
                        </div>
                    </div>

                    <div className="statistics__profit">
                        <img
                            src="/assets/img/eth.svg"
                            alt="eth"
                            className="eth"
                        />

                        <p className="statistics__profit--val">0,00</p>
                    </div>

                    <p className="statistics__text">---</p>

                    <p className="statistics__text">/adress token123...</p>

                    <p className="statistics__text">/adress token123...</p>

                    <p className="statistics__text">/adress token123...</p>

                    <p className="statistics__text">Describe of token123...</p>

                    <p className="statistics__text">Type/ Name</p>

                    <p className="statistics__text">Name/ Value</p>

                    <p className="statistics__text">Name/ Value</p>

                    <p className="statistics__text">Text text text</p>

                    <p className="statistics__account">No</p>

                    <p className="statistics__page center">4.5/0.5</p>

                    <p className="statistics__page center">Ethereum</p>

                    <p className="statistics__creator">Yes</p>

                    <p className="statistics__creator">Ready</p>
                </div>
            </div>
        </div>
    );
};

export default Token;
