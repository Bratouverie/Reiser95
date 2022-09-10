import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

const Main = () => {
    return(
        <section className="main">
            <div className="main__banner"></div>

            <div className="container">
                <div className="main__inner">
                    <h1 className="main__title">
                        CHECKBRANDCOM
                    </h1>

                    <p className="main__subtitle">
                        NFT Minting Platform
                    </p>

                    <p className="main__text">
                        You can mint an NFT certificate with new features:
                    </p>

                    <div className="main__content">
                        <div className="main__item"></div>

                        <div className="main__item"></div>

                        <div className="main__item"></div>
                    </div>



                    <p className="main__text">
                        Besides the NFT certificate, you will receive a QR code that will give you a shortcut to all of the above-mentioned places
                    </p>

                    <div className="main__content">
                        <div className="main__item"></div>
                    </div>

                    <p className="main__text">
                        To get an NFT certificate, you need to have one of the items of the brands listed on our platform
                    </p>

                    <div className="main__square">
                        <Link to="/" className="main__square--item"></Link>
                        <Link to="/" className="main__square--item"></Link>
                        <Link to="/" className="main__square--item"></Link>
                        <Link to="/" className="main__square--item"></Link>
                        <Link to="/" className="main__square--item"></Link>
                        <Link to="/" className="main__square--item"></Link>
                    </div>

                    <p className="main__text">
                        So, you need to contact the Discord moderator and go through the authentication process:
                    </p>



                    <p className="main__text">
                        Our next step: You will receive the NFT certificate as soon as you buy a branded item
                    </p>

                    <div className="main__content">
                        <div className="main__item"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main;