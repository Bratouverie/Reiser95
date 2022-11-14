import React from "react";

import './index.css';

import ImgBlockItem from './ImgBlockItem';

const ImgBlock = ({title, data}) => {
    return (
        <div className="imgblock default__padding">
            <div className="container">
                <div className="imgblock__inner">
                    <h2 className="imgblock__title">{title}</h2>

                    {data.length > 0
                    ? <div className="imgblock__content">
                        {data.map((data, id) => <ImgBlockItem key={id} path={data.path} id={id} />)}
                    </div>
                    : <div className="collection__items--none">
                        No items to display
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default ImgBlock;
