import React from "react";

const StatsItem = ({ data, id }) => {
    const { avatar, collection, volume, day, week, price, owners, items } =
        data;

    const [fade, setFade] = React.useState(false);

    return (
        <div className="stats__item--values">
            <div className="stats__item--collection stats__item--item">
                <p className="stats__item--value">{id}</p>

                <div className="stats__item--avatar--inner">
                    <img
                        src={avatar}
                        alt="avatar"
                        className="stats__item--avatar"
                    />
                </div>

                <div className="stats__item--wrapper">
                    <p className="stats__item--value">{collection}</p>

                    <button className="button stats__item--more" onClick={() => setFade(!fade)}>{fade ? '-Less' : '+More'}</button>
                </div>
            </div>

            <div className="stats__item--volume stats__item--item">
                <img
                    src="/assets/img/eth.svg"
                    alt="eth"
                    className="stats__item--eth"
                />

                <p className="stats__item--value">{volume}</p>
            </div>

            <div className={`stats__item--fade${fade ? ' active' : ''}`}>
                <div className="stats__item--day stats__item--wrap">
                    <p className="stats__item--wrap--title">24h %</p>

                    <div
                        className={`stats__item--item stats__item--value ${
                            day[0] === "-" ? "loss" : "profit"
                        }`}
                    >
                        {day}
                    </div>
                </div>

                <div className="stats__item--week stats__item--wrap">
                    <p className="stats__item--wrap--title">7d %</p>

                    <div
                        className={`stats__item--item stats__item--value ${
                            week[0] === "-" ? "loss" : "profit"
                        }`}
                    >
                        {week}
                    </div>
                </div>

                <div className="stats__item--price stats__item--wrap">
                    <p className="stats__item--wrap--title">Floor Price</p>

                    <div className="stats__item--item">
                        <img
                            src="/assets/img/eth.svg"
                            alt="eth"
                            className="stats__item--eth"
                        />

                        <p className="stats__item--value">{price}</p>
                    </div>
                </div>

                <div className="stats__item--owners stats__item--wrap">
                    <p className="stats__item--wrap--title">Owners</p>

                    <div className="stats__item--item stats__item--value">
                        {owners}
                    </div>
                </div>

                <div className="stats__item--items stats__item--wrap">
                    <p className="stats__item--wrap--title">Items</p>

                    <div className="stats__item--item stats__item--value">
                        {items}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsItem;
