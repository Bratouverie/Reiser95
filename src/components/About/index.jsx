import React from 'react';

import './index.css';

const About = ({title, text}) => {
    return(
        <div className="aboutblock default__padding">
            <div className="container">
                <div className="aboutblock__inner">
                    <h2 className="title aboutblock__title">
                        {title}
                    </h2>

                    <p className="aboutblock__text">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;