import React from "react";

import './index.css';

import ImgBlockItem from './ImgBlockItem';

const ImgBlock = ({title, data}) => {
    return (
        <div className="imgblock default__padding">
            <div className="container">
                <div className="imgblock__inner">
                    <h2 className="imgblock__title">{title}</h2>

                    <div className="imgblock__content">
                        {data.map((data, id) => <ImgBlockItem key={id} path={data.path} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImgBlock;
