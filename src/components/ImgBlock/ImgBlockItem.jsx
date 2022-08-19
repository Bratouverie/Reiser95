import React from "react";
import { Link } from "react-router-dom";

const ImgBlockItem = ({ path, id, alt = "img" }) => {
    return (
        <Link to={`/collection/${id}`} className="imgblock__item">
            <img src={path} alt={alt} className="imgblock__item--img" />
        </Link>
    );
};

export default ImgBlockItem;
