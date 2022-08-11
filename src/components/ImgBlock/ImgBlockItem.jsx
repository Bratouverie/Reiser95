import React from "react";

const ImgBlockItem = ({path, alt = "img"}) => {
    return (
        <div className="imgblock__item">
            <img
                src={path}
                alt={alt}
                className="imgblock__item--img"
            />
        </div>
    );
};

export default ImgBlockItem;
