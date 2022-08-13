import React from 'react';

import './index.css';

const BrandBg = ({src = "/assets/img/brand-bg.png"}) => {
    return(
        <div className="brand__bg">
            <img src={src} alt="bg" className="brand__bg--img" />
        </div>
    )
}

export default BrandBg;