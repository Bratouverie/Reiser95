import React from 'react';

import './index.css';

import ImgBlockItem from './ImgBlockItem';

const ImgBlock = (props) => {
    const { title, data } = props;

    return (
        <div className="imgblock default__padding">
            <div className="container">
                <div className="imgblock__inner">
                    <h2 className="imgblock__title">{title}</h2>

                    {data.length > 0 ? (
                        <div className="imgblock__content">
                            {data.map((data) => (
                                <ImgBlockItem key={data.id} path={data.logo} id={data.id} />
                            ))}
                        </div>
                    ) : (
                        <div className="collection__items--none">No items to display</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImgBlock;
