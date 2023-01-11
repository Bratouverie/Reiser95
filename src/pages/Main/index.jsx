import React from "react";

import "./index.css";

import PersonModal from '../../components/WlModals/PersonModal';
import BrandModal from '../../components/WlModals/BrandModal';
import WatchesModal from '../../components/WlModals/WatchesModal';
import AlcoModal from '../../components/WlModals/AlcoModal';
import CarModal from '../../components/WlModals/CarModal';
import NrcModal from '../../components/WlModals/NrcModal';

const Main = () => {
    const [person, setPerson] = React.useState(false);
    const [brand, setBrand] = React.useState(false);
    const [watches, setWatches] = React.useState(false);
    const [alco, setAlco] = React.useState(false);
    const [car, setCar] = React.useState(false);
    const [nrc, setNrc] = React.useState(false);

    return (
        <section className="main">
            <PersonModal active={person} setActive={setPerson} />
            <BrandModal active={brand} setActive={setBrand} />
            <WatchesModal active={watches} setActive={setWatches} />
            <AlcoModal active={alco} setActive={setAlco} />
            <CarModal active={car} setActive={setCar} />
            <NrcModal active={nrc} setActive={setNrc} />

            <div className="main__banner">
                <img src="/assets/img/main-img.jpg" alt="banner" className="main__banner--img" />
            </div>

            <div className="container">
                <div className="main__inner">
                    <button className="button default__button" onClick={() => setPerson(true)}>Person</button>
                    <button className="button default__button" onClick={() => setBrand(true)}>Brand</button>
                    <button className="button default__button" onClick={() => setWatches(true)}>Watches</button>
                    <button className="button default__button" onClick={() => setAlco(true)}>Alco</button>
                    <button className="button default__button" onClick={() => setCar(true)}>Car</button>
                    <button className="button default__button" onClick={() => setNrc(true)}>NRC</button>

                    <h1 className="main__title">CHECKBRANDCOM</h1>

                    <p className="main__subtitle">Minting Platform</p>

                    <p className="main__text">
                        You can mint Brand NFT Certificates with new features:
                    </p>

                    <div className="main__content first">
                        <div className="main__item">
                            <img src="/assets/img/main-img1.jpg" alt="banner" className="main__item--img" />

                            <p className="main__item--text">
                                Pass to private parties
                            </p>
                        </div>

                        <div className="main__item">
                            <img src="/assets/img/main-img2.jpg" alt="banner" className="main__item--img" />

                            <p className="main__item--text">
                                Pass to airport bussiness lounges
                            </p>
                        </div>

                        <div className="main__item">
                            <img src="/assets/img/main-img3.jpg" alt="banner" className="main__item--img" />

                            <p className="main__item--text">
                                Pass to concert of your fave celebs
                            </p>
                        </div>
                    </div>

                    <div className="main__grid">
                        <div className="main__grid--content horiz">
                            <div className="main__grid--item text">
                                <span className="orange mr1">Vip</span> service
                            </div>

                            <div className="main__grid--item">
                                <img src="/assets/img/vip1.jpg" alt="banner" className="main__grid--img" />

                                <p className="main__item--text">
                                    in cofes and restorantes
                                </p>
                            </div>

                            <div className="main__grid--item">
                                <img src="/assets/img/vip2.jpg" alt="banner" className="main__grid--img" />

                                <p className="main__item--text">
                                    in the banks
                                </p>
                            </div>
                        </div>

                        <div className="main__grid--content verti">
                            <div className="main__grid--item">
                                <img src="/assets/img/discount1.jpg" alt="banner" className="main__grid--img" />

                                <div className="main__grid--text--inner">
                                    <p className="main__grid--text--title">
                                        discount
                                    </p>

                                    <p className="main__grid--text--text">
                                        on physical items
                                    </p>
                                </div>
                            </div>

                            <div className="main__grid--item">
                                <img src="/assets/img/discount2.jpg" alt="banner" className="main__grid--img" />

                                <div className="main__grid--text--inner">
                                    <p className="main__grid--text--title">
                                        discount
                                    </p>

                                    <p className="main__grid--text--text">
                                        on virtual items
                                    </p>
                                </div>
                            </div>

                            <div className="main__grid--item">
                                <img src="/assets/img/discount3.jpg" alt="banner" className="main__grid--img" />

                                <div className="main__grid--text--inner">
                                    <p className="main__grid--text--title">
                                        discount
                                    </p>

                                    <p className="main__grid--text--text">
                                        on servies
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="main__text">
                        Besides the NFT, you will receive a QR code that will give you a shortcut to all of the above-mentioned places
                    </p>

                    <div className="main__content">
                        <div className="main__item">
                            <img src="/assets/img/main-img4.jpg" alt="banner" className="main__item--img" />
                        </div>
                    </div>

                    <p className="main__text">
                        To get Brand NFT Certificate, you need to have one of the items of the brands listed on our platform
                    </p>

                    <div className="main__square">
                        <div className="main__square--item">
                            <img src="/assets/img/brand-logo1.png" alt="brand" className="main__square--img" />

                            <p className="main__square--text">
                                Calvin Clein
                            </p>
                        </div>
                        
                        <div className="main__square--item">
                            <img src="/assets/img/brand-logo2.png" alt="brand" className="main__square--img" />

                            <p className="main__square--text">
                                Omega
                            </p>
                        </div>
                        
                        <div className="main__square--item">
                            <img src="/assets/img/brand-logo3.png" alt="brand" className="main__square--img" />

                            <p className="main__square--text">
                                Cwatch
                            </p>
                        </div>

                        <div className="main__square--item">
                            <img src="/assets/img/brand-logo4.png" alt="brand" className="main__square--img" />

                            <p className="main__square--text">
                                Jagermeister
                            </p>
                        </div>

                        <div className="main__square--item">
                            <img src="/assets/img/brand-logo5.png" alt="brand" className="main__square--img" />

                            <p className="main__square--text">
                                Balenciaga
                            </p>
                        </div>

                        <div className="main__square--item">
                            <img src="/assets/img/brand-logo6.png" alt="brand" className="main__square--img" />

                            <p className="main__square--text">
                                Hugo Boss
                            </p>
                        </div>
                    </div>

                    <p className="main__text big__margin">
                        Sequence of actions to get Brand NFT Certificate
                    </p>

                    <div className="main__three">
                        <div className="main__three--content">
                            <p className="main__three--text">
                                Choose a brand
                            </p>

                            <div className="main__item--three">
                                <img src="/assets/img/main-img5.jpg" alt="banner" className="main__item--img" />
                            </div>
                        </div>

                        <div className="main__three--content">
                            <p className="main__three--text">
                                Connect your wallet
                            </p>

                            <div className="main__item--three">
                                <img src="/assets/img/main-img6.jpg" alt="banner" className="main__item--img" />
                            </div>
                        </div>

                        <div className="main__three--content">
                            <p className="main__three--text">
                                Click the “Get on Whitelist” button
                            </p>

                            <div className="main__item--three">
                                <img src="/assets/img/main-img7.jpg" alt="banner" className="main__item--img" />
                            </div>
                        </div>
                    </div>

                    <p className="main__text">
                        Our next step <br/>You will receive the NFT as soon as you buy a branded item
                    </p>

                    <div className="main__content first">
                        <div className="main__item">
                            <img src="/assets/img/main-img8.jpg" alt="banner" className="main__item--img" />
                        </div>
                    </div>

                    <div className="main__footer">
                        <div className="main__footer--content">
                            <div className="main__footer--logo--wrap">
                                <div className="main__footer--logo">
                                    Choose your brand now
                                </div>
                            </div>

                            <div className="main__footer--social">
                                <a href="https://google.com" className="main__footer--social--link">
                                    <img src="/assets/img/twitter-gold.png" alt="twitter" className="main__footer--social--icon"/>
                                </a>

                                <a href="https://google.com" className="main__footer--social--link">
                                    <img src="/assets/img/discord-gold.png" alt="discord" className="main__footer--social--icon"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Main;
