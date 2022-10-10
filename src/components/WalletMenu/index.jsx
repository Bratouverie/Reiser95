import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './index.css';

import {connectWallet, logout, getShortAddress} from '../../functions/auth';

const WalletMenu = ({active, setActive}) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const connect = async () => {
        await connectWallet(dispatch);
    }

    const quit = async () => {
        const res = await logout(auth.accessToken, dispatch);
        console.log(res);
    }

    return(
        <div className={`wallet__menu${active ? ' active' : ''}`}>
            <img src="/assets/img/cross.svg" alt="cross" className="wallet__menu--close" onClick={() => setActive(false)} />

            <div className="wallet__menu--content">
                {auth.isAuth
                ? <div className="wallet__menu--auth">
                    <div className="wallet__menu--box">
                        <div className="wallet__menu--user--inner">
                            <div className="wallet__menu--user--img--inner">
                                <img src={auth.image ? auth.image : `/assets/img/avatar.png`} alt="user" className="wallet__menu--user--img" />
                            </div>

                            <p className="wallet__menu--user--name">
                                {auth.username}
                            </p>
                        </div>

                        <p className="wallet__menu--address">
                            {getShortAddress(auth.walletAddress)}
                        </p>
                    </div>

                    <div className="wallet__menu--balance--inner">
                        <div className="wallet__menu--balance">
                            <p className="wallet__menu--balance--text">
                                Total balance
                            </p>

                            <p className="wallet__menu--balance--value">
                                {auth.balance.toFixed(4)} ETH
                            </p>
                        </div>
                    </div>

                    <div className="wallet__menu--crypto--content">
                        <div className="wallet__menu--crypto--item">
                            <img src="/assets/img/eth.svg" alt="eth" className="wallet__menu--crypto--icon" />

                            <div className="wallet__menu--crypto--wrap">
                                <div className="wallet__menu--crypto--wrap--item">
                                    <p className="wallet__menu--crypto--title">
                                        ETH
                                    </p>

                                    <p className="wallet__menu--crypto--title">
                                        0.0000
                                    </p>
                                </div>

                                <div className="wallet__menu--crypto--wrap--item">
                                    <p className="wallet__menu--crypto--text">
                                        Ethereum
                                    </p>

                                    <p className="wallet__menu--crypto--text">
                                        $ 0.00 USD
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="button wallet__menu--auth--button" onClick={quit}>
                        Log Out
                    </button>
                </div>
                : <div className="wallet__menu--noauth">
                    <div className="wallet__menu--box">
                        <div className="wallet__menu--user--inner">
                            <div className="wallet__menu--user--img--inner">
                                <img src={auth.image ? auth.image : `/assets/img/avatar.png`} alt="user" className="wallet__menu--user--img" />
                            </div>

                            <p className="wallet__menu--user--name">
                                My wallet
                            </p>
                        </div>
                    </div>

                    <p className="wallet__text">
                        Connect with one of our available <span className="blue">wallet</span> providers or create a new one.
                    </p>

                    <div className="wallet__items">
                        <div className="wallet__item">
                            <div className="wallet__item--wrap">
                                <img src="/assets/img/metamask.svg" alt="metamask" className="wallet__item--icon" />

                                MetaMask
                            </div>

                            <button className="button wallet__item--connect" onClick={connect}>
                                Connect
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default WalletMenu;