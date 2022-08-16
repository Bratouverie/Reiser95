import React from "react";

import "./index.css";

import StatsItem from './StatsItem';

const data = {
    avatar: '/assets/img/avatar.png',
    collection: 'Collection name',
    volume: '18,531.52',
    day: '-81.93%',
    week: '+119.08%',
    price: '1.45',
    owners: '10.3K',
    items: '20.2K'
}

const Stats = () => {
    return (
        <div className="stats default__padding">
            <div className="container">
                <div className="stats__inner">
                    <h2 className="title stats__title">Top NFTs</h2>

                    <p className="stats__text">
                        The top NFTs on CheckBrandcom, ranked by volume, floor
                        price and other statistics.
                    </p>

                    <div className="stats__content">
                        <div className="stats__item--names">
                            <div className="stats__item--collection stats__item--item stats__item--name">
                                Collection
                            </div>

                            <div className="stats__item--volume stats__item--item stats__item--name">
                                Volume
                            </div>

                            <div className="stats__item--day stats__item--item stats__item--name">
                                24h %
                            </div>

                            <div className="stats__item--week stats__item--item stats__item--name">
                                7d %
                            </div>

                            <div className="stats__item--price stats__item--item stats__item--name">
                                Floor Price
                            </div>

                            <div className="stats__item--owners stats__item--item stats__item--name">
                                Owners
                            </div>

                            <div className="stats__item--items stats__item--item stats__item--name">
                                Items
                            </div>
                        </div>

                        <StatsItem data={data} id="1" />
                        <StatsItem data={data} id="2" />
                        <StatsItem data={data} id="3" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
