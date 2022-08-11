import React from "react";

const StatsItem = ({ data, id }) => {
    const { avatar, collection, volume, day, week, price, owners, items } = data;

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

                <p className="stats__item--value">{collection}</p>
            </div>

            <div className="stats__item--volume stats__item--item">
                <img
                    src="/assets/img/eth.svg"
                    alt="eth"
                    className="stats__item--eth"
                />

                <p className="stats__item--value">{volume}</p>
            </div>

            <div className="stats__item--day stats__item--item stats__item--value loss">
                {day}
            </div>

            <div className="stats__item--week stats__item--item stats__item--value profit">
                {week}
            </div>

            <div className="stats__item--price stats__item--item">
                <img
                    src="/assets/img/eth.svg"
                    alt="eth"
                    className="stats__item--eth"
                />

                <p className="stats__item--value">{price}</p>
            </div>

            <div className="stats__item--owners stats__item--item stats__item--value">
                {owners}
            </div>

            <div className="stats__item--items stats__item--item stats__item--value">
                {items}
            </div>
        </div>
    );
};

export default StatsItem;
