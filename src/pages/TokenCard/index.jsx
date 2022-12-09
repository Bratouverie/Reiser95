import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CenteredContainer from '../../common/CenteredContainer';
import Loader from '../../common/Loader';
import StatChart from '../../components/StatChart';
import NOTIFICATION_TYPES from '../../const/notifications/NOTIFICATION_TYPES';
import { NotificationContext } from '../../context/NotificationContext';
import { REQUEST_TYPE, useRequest } from '../../hooks/useRequest';
import { roundInt } from '../../utils/roundInt';

import './index.css';
// token item type
// {
//     "id": "8aa7cdc3-e278-476b-a71e-6a89c1805233",
//     "wallet_owner": "0x65ed0458d0967ddafca7585af492c4ae7c485953",
//     "hide": false,
//     "mint": false,
//     "upload_blockchain": false,
//     "freeze": false,
//     "profit": "0.00000000",
//     "creator_royalty_distribution": [
//         {
//             "id": "d8319752-f2b5-4804-aad7-ce2bf7dd9501",
//             "percent": "100.00000000",
//             "wallet": "ewqewq"
//         }
//     ],
//     "income_distribution": [
//         {
//             "id": "966e54dd-994b-4dc9-9ace-9a96e57b3590",
//             "percent": "100.00000000",
//             "wallet": "ewqewqewq"
//         }
//     ],
//     "properties": [
//         {
//             "id": "6ae1c2bc-dff3-45ba-bb48-5c47488b27d8",
//             "name": "stfgring",
//             "type": "string"
//         },
//         {
//             "id": "ac9eaf95-7935-446f-993f-d2b522c3ab50",
//             "name": "ekqwnke",
//             "type": "wqkeknqwke"
//         }
//     ],
//     "levels_stats": [],
//     "collection": {
//         "id": "283f7c36-254f-4492-b0e2-ff87205d90c2",
//         "name": "BurgerCarCollection"
//     },
//     "pack": {
//         "id": "60204f69-ee98-422f-8f21-c8456015ecd5",
//         "name": "eqweq"
//     },
//     "price_in_usd": "0",
//     "type": "standard",
//     "name": "BurgerCarItem 002",
//     "price": "0.10000000",
//     "status_price": "auction",
//     "investor_royalty": "2.50000000",
//     "creator_royalty": "2.50000000",
//     "description": "ewqewqe",
//     "close": false,
//     "close_image": null,
//     "unlockable": false,
//     "unlockable_content": null,
//     "status": "stop",
//     "address": null,
//     "file_1": "https://gateway.storjshare.io/demo-bucket/62702e1a8354406596d82e1ca4c0cf43.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221209%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221209T152957Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=94818b29de666d9fcb972fa44ac079fbc89a5fadf29c0f23ea5c6da21726d2a4",
//     "file_2": "https://gateway.storjshare.io/demo-bucket/4b48608521c14fd99a458991c3982620.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221209%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221209T152957Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b0b13e3692f4a41d33b34d1262bc228c0d452b423e12bf48345e5e6f13eeab64",
//     "file_1_name_ext": "62702e1a8354406596d82e1ca4c0cf43.png",
//     "file_2_name_ext": "4b48608521c14fd99a458991c3982620.png",
//     "url_opensea": null,
//     "currency_token": "f56d23c1-5e64-4bf6-9a24-43bbf4c2b6ea"
// }

const TokenCard = () => {
    const { id } = useParams();

    const {
        actions: { addNotification },
    } = useContext(NotificationContext);

    const { state: getTokenRS, request: onGetToken } = useRequest({
        requestType: REQUEST_TYPE.DATA,
    });

    const [prop, setProp] = useState(true);
    const [desc, setDesc] = useState(true);
    const [about, setAbout] = useState(true);
    const [details, setDetails] = useState(true);
    const [history, setHistory] = useState(true);
    const [list, setList] = useState(true);
    const [offers, setOffers] = useState(true);
    const [more, setMore] = useState(true);
    const [act, setAct] = useState(true);

    const [token, setToken] = useState();

    useEffect(() => {
        onGetToken({
            url: `token/${id}/`,
        });
    }, [id]);

    useEffect(() => {
        if (getTokenRS.result && getTokenRS.result.data) {
            setToken(getTokenRS.result.data);
        }

        if (getTokenRS.error) {
            addNotification({
                type: NOTIFICATION_TYPES.ERROR,
                text: getTokenRS.error,
            });
        }
    }, [getTokenRS]);

    if (getTokenRS.isProcessing || !token) {
        return (
            <CenteredContainer>
                <Loader />
            </CenteredContainer>
        );
    }

    return (
        <div className="token__card">
            <div className="container">
                <div className="token__card--inner">
                    <div className="mobile__profile--inner">
                        <div className="profile__buttons">
                            <button className="button profile__share">
                                <img
                                    src="/assets/img/share.svg"
                                    alt="share"
                                    className="profile__share--icon"
                                />
                            </button>

                            <button className="button profile__share">
                                <img
                                    src="/assets/img/dots-white.svg"
                                    alt="dots"
                                    className="profile__share--icon"
                                />
                            </button>
                        </div>

                        <div className="profile__ava--inner">
                            <img
                                src="/assets/img/profile.png"
                                alt="ava"
                                className="profile__ava--img"
                            />
                        </div>

                        <p className="profile__owned">
                            Owned by <span className="blueC">Username</span>
                        </p>
                    </div>

                    <div className="token__card--content">
                        <div className="token__card--left">
                            <div className="token__card--img--inner">
                                <div className="token__card--img--box">
                                    <button className="button token__card--copy">
                                        <img
                                            src="/assets/img/eth.svg"
                                            alt="eth"
                                            className="token__card--copy--icon"
                                        />
                                    </button>
                                </div>

                                <div
                                    style={{
                                        backgroundImage: `url('${token.file_1}')`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                    className="token__card--img"
                                ></div>
                            </div>

                            <div className="token__card--wrap stack mobileoff">
                                <div className="token__card--item">
                                    <button
                                        onClick={() => setDesc(!desc)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/dates.svg"
                                                alt="dates"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                Description
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                desc ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {desc && (
                                        <div className="token__card--item--bottom">
                                            <p className="token__card--item--about--text">
                                                Created by{' '}
                                                <span className="blueC">{token.pack.name}</span>
                                            </p>

                                            <p className="token__card--item--about--text">
                                                {token.description}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="token__card--item">
                                    <button
                                        onClick={() => setProp(!prop)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/prop.svg"
                                                alt="prop"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                Properties
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                prop ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {prop && (
                                        <div className="token__card--item--bottom">
                                            <div className="token__card--item--prop">
                                                {(token.properties || []).map(p => (
                                                    <div
                                                        key={p.id}
                                                        className="token__card--item--prop--item"
                                                    >
                                                        <p className="token__card--item--prop--item--subtitle">
                                                            Bloodline
                                                        </p>

                                                        <p className="token__card--item--prop--item--title">
                                                            {p.name}
                                                        </p>

                                                        <p className="token__card--item--prop--item--text">
                                                            {p.type}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="token__card--item">
                                    <button
                                        onClick={() => setAbout(!about)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/about.svg"
                                                alt="about"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                About ZEВ RUN Legacy
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                about ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {about && (
                                        <div className="token__card--item--bottom">
                                            <div className="token__card--item--about">
                                                <div className="token__card--item--about--item">
                                                    <div className="token__card--item--about--img"></div>

                                                    <p className="token__card--item--about--text">
                                                        Information about the token Information
                                                        about the token Information about the token
                                                        Information about the token Information
                                                        about the token Information about the token
                                                        Information about the token Information
                                                        about the token Information about the token
                                                        Information about the token
                                                    </p>
                                                </div>

                                                <div className="token__card--item--social">
                                                    <a
                                                        href="https://google.com"
                                                        className="token__card--item--social--link"
                                                    >
                                                        <img
                                                            src="/assets/img/web.svg"
                                                            alt="web"
                                                            className="token__card--item--social--icon"
                                                        />
                                                    </a>

                                                    <a
                                                        href="https://google.com"
                                                        className="token__card--item--social--link"
                                                    >
                                                        <img
                                                            src="/assets/img/twitter.svg"
                                                            alt="twitter"
                                                            className="token__card--item--social--icon"
                                                        />
                                                    </a>

                                                    <a
                                                        href="https://google.com"
                                                        className="token__card--item--social--link"
                                                    >
                                                        <img
                                                            src="/assets/img/dots.svg"
                                                            alt="dots"
                                                            className="token__card--item--social--icon"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="token__card--item">
                                    <button
                                        onClick={() => setDetails(!details)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/details.svg"
                                                alt="details"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">Details</p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                details ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {details && (
                                        <div className="token__card--item--bottom">
                                            <div className="token__card--item--details">
                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Contract Address
                                                    </p>

                                                    <p className="token__card--item--details--item--text blueC">
                                                        0xa5f1...f215
                                                    </p>
                                                </div>

                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Token ID
                                                    </p>

                                                    <p className="token__card--item--details--item--text blueC">
                                                        {token.id}
                                                    </p>
                                                </div>

                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Token Standard
                                                    </p>

                                                    <p className="token__card--item--details--item--text bold">
                                                        ERC-721
                                                    </p>
                                                </div>

                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Blockchain
                                                    </p>

                                                    <p className="token__card--item--details--item--text bold">
                                                        Ethereum
                                                    </p>
                                                </div>

                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Investor/Creator Earnings
                                                    </p>

                                                    <p className="token__card--item--details--item--text bold">
                                                        {Number(token.investor_royalty)}/
                                                        {Number(token.creator_royalty)}%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="token__card--content--right">
                            <div className="token__card--content--title--inner">
                                <p className="token__card--content--subtitle">
                                    {token.collection.name}
                                </p>

                                <div className="token__card--item--social">
                                    <button className="button token__card--item--social--link">
                                        <img
                                            src="/assets/img/reload.svg"
                                            alt="reload"
                                            className="token__card--item--social--icon"
                                        />
                                    </button>

                                    <button className="button token__card--item--social--link">
                                        <img
                                            src="/assets/img/copy.svg"
                                            alt="copy"
                                            className="token__card--item--social--icon"
                                        />
                                    </button>

                                    <button className="button token__card--item--social--link">
                                        <img
                                            src="/assets/img/share.svg"
                                            alt="share"
                                            className="token__card--item--social--icon"
                                        />
                                    </button>

                                    <button className="button token__card--item--social--link">
                                        <img
                                            src="/assets/img/dots.svg"
                                            alt="dots"
                                            className="token__card--item--social--icon"
                                        />
                                    </button>
                                </div>
                            </div>

                            <h2 className="token__card--content--title">{token.name}</h2>

                            <div className="token__card--content--name--inner">
                                <p className="token__card--content--name">
                                    Owned by <span className="blueC">Username</span>
                                </p>
                            </div>

                            <div className="token__card--price">
                                <div className="token__card--price--wrap--text">
                                    <p className="token__card--price--text">
                                        Booking ends January 00,2023 at 0:00am +10
                                    </p>
                                </div>

                                <div className="token__card--price--timer">
                                    <div className="token__card--price--timer--inner">
                                        <div className="token__card--price--timer--item">
                                            <p className="token__card--price--timer--item--num">
                                                00
                                            </p>

                                            <p className="token__card--price--text">Days</p>
                                        </div>

                                        <div className="token__card--price--timer--item">
                                            <p className="token__card--price--timer--item--num">
                                                00
                                            </p>

                                            <p className="token__card--price--text">Hours</p>
                                        </div>

                                        <div className="token__card--price--timer--item">
                                            <p className="token__card--price--timer--item--num">
                                                00
                                            </p>

                                            <p className="token__card--price--text">Minutes</p>
                                        </div>

                                        <div className="token__card--price--timer--item">
                                            <p className="token__card--price--timer--item--num">
                                                00
                                            </p>

                                            <p className="token__card--price--text">Seconds</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="token__card--price--box">
                                    <p className="token__card--price--text">Current price</p>

                                    <div className="token__card--content--price--val--inner">
                                        <img
                                            src="/assets/img/eth.svg"
                                            alt="eth"
                                            className="eth__icon"
                                        />

                                        <p className="token__card--content--price--val">
                                            {token.price}
                                        </p>

                                        <p className="token__card--price--text">($34.18)</p>
                                    </div>

                                    <button className="button token__card--content--price--buy">
                                        {/* <img
                                            src="/assets/img/wallet.svg"
                                            alt="wallet"
                                            className="token__card--content--price--buy--icon"
                                        />
                                        Buy now */}
                                        Book
                                    </button>

                                    {/* <div className="token__card--content--buttons">
                                        <button className="button token__card--content--button--card">
                                            <img
                                                src="/assets/img/card.svg"
                                                alt="card"
                                                className="token__card--content--button--card--icon"
                                            />
                                            Buy with card
                                        </button>

                                        <button className="button token__card--content--button--offer">
                                            <img
                                                src="/assets/img/market.svg"
                                                alt="market"
                                                className="token__card--content--button--card--icon"
                                            />
                                            Make offer
                                        </button>
                                    </div> */}
                                </div>
                            </div>

                            <div className="token__card--wrap full mobileoff">
                                <div className="token__card--item">
                                    <button
                                        onClick={() => setHistory(!history)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/history.svg"
                                                alt="history"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                Price History
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                history ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {history && (
                                        <div className="token__card--item--bottom">
                                            <StatChart />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="token__card--wrap full mobileoff">
                                <div className="token__card--item">
                                    <button
                                        onClick={() => setList(!list)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/listings.svg"
                                                alt="listings"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                Listings
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                list ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {list && (
                                        <div className="token__card--item--bottom nop">
                                            <div className="token__card--content--listing--item titles">
                                                <p className="token__card--content--listing--item--title">
                                                    Price
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    USD Price
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    Expiration
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    From
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.000 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $00.00
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    1 day
                                                </p>

                                                <p className="token__card--content--listing--item--title blueC">
                                                    Username
                                                </p>

                                                <button className="button token__card--content--listing--item--button">
                                                    Book
                                                </button>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.000 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $00.00
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    1 day
                                                </p>

                                                <p className="token__card--content--listing--item--title blueC">
                                                    Username
                                                </p>

                                                <button className="button token__card--content--listing--item--button">
                                                    Book
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="token__card--wrap full mobileoff">
                                <div className="token__card--item">
                                    <button
                                        onClick={() => setOffers(!offers)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/menu2.svg"
                                                alt="menu2"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">Offers</p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                offers ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {offers && (
                                        <div className="token__card--item--bottom nop">
                                            <div className="token__card--content--listing--item titles">
                                                <p className="token__card--content--listing--item--title">
                                                    Price
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    USD Price
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    Floor Difference
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    Expiration
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    From
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="token__card--wrap stack mobile">
                                <div className="token__card--item">
                                    <button
                                        onClick={() => setDesc(!desc)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/dates.svg"
                                                alt="dates"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                Description
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                desc ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {desc && (
                                        <div className="token__card--item--bottom">
                                            <p className="token__card--item--about--text">
                                                Created by{' '}
                                                <span className="blueC">{token.pack.name}</span>
                                            </p>

                                            <p className="token__card--item--about--text">
                                                {token.description}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="token__card--item">
                                    <button
                                        onClick={() => setProp(!prop)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/prop.svg"
                                                alt="prop"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                Properties
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                prop ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {prop && (
                                        <div className="token__card--item--bottom">
                                            <div className="token__card--item--prop">
                                                <div className="token__card--item--prop--item">
                                                    <p className="token__card--item--prop--item--subtitle">
                                                        Bloodline
                                                    </p>

                                                    <p className="token__card--item--prop--item--title">
                                                        Buterin
                                                    </p>

                                                    <p className="token__card--item--prop--item--text">
                                                        64% have this trait
                                                    </p>
                                                </div>

                                                <div className="token__card--item--prop--item">
                                                    <p className="token__card--item--prop--item--subtitle">
                                                        Bloodline
                                                    </p>

                                                    <p className="token__card--item--prop--item--title">
                                                        Buterin
                                                    </p>

                                                    <p className="token__card--item--prop--item--text">
                                                        64% have this trait
                                                    </p>
                                                </div>

                                                <div className="token__card--item--prop--item">
                                                    <p className="token__card--item--prop--item--subtitle">
                                                        Bloodline
                                                    </p>

                                                    <p className="token__card--item--prop--item--title">
                                                        Buterin
                                                    </p>

                                                    <p className="token__card--item--prop--item--text">
                                                        64% have this trait
                                                    </p>
                                                </div>

                                                <div className="token__card--item--prop--item">
                                                    <p className="token__card--item--prop--item--subtitle">
                                                        Bloodline
                                                    </p>

                                                    <p className="token__card--item--prop--item--title">
                                                        Buterin
                                                    </p>

                                                    <p className="token__card--item--prop--item--text">
                                                        64% have this trait
                                                    </p>
                                                </div>

                                                <div className="token__card--item--prop--item">
                                                    <p className="token__card--item--prop--item--subtitle">
                                                        Bloodline
                                                    </p>

                                                    <p className="token__card--item--prop--item--title">
                                                        Buterin
                                                    </p>

                                                    <p className="token__card--item--prop--item--text">
                                                        64% have this trait
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="token__card--item">
                                    <button
                                        onClick={() => setAbout(!about)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/about.svg"
                                                alt="about"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                About ZEВ RUN Legacy
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                about ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {about && (
                                        <div className="token__card--item--bottom">
                                            <div className="token__card--item--about">
                                                <div className="token__card--item--about--item">
                                                    <div className="token__card--item--about--img"></div>

                                                    <p className="token__card--item--about--text">
                                                        Information about the token Information
                                                        about the token Information about the token
                                                        Information about the token Information
                                                        about the token Information about the token
                                                        Information about the token Information
                                                        about the token Information about the token
                                                        Information about the token
                                                    </p>
                                                </div>

                                                <div className="token__card--item--social">
                                                    <a
                                                        href="https://google.com"
                                                        className="token__card--item--social--link"
                                                    >
                                                        <img
                                                            src="/assets/img/web.svg"
                                                            alt="web"
                                                            className="token__card--item--social--icon"
                                                        />
                                                    </a>

                                                    <a
                                                        href="https://google.com"
                                                        className="token__card--item--social--link"
                                                    >
                                                        <img
                                                            src="/assets/img/twitter.svg"
                                                            alt="twitter"
                                                            className="token__card--item--social--icon"
                                                        />
                                                    </a>

                                                    <a
                                                        href="https://google.com"
                                                        className="token__card--item--social--link"
                                                    >
                                                        <img
                                                            src="/assets/img/dots.svg"
                                                            alt="dots"
                                                            className="token__card--item--social--icon"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="token__card--item">
                                    <button
                                        onClick={() => setDetails(!details)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/details.svg"
                                                alt="details"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">Details</p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                details ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {details && (
                                        <div className="token__card--item--bottom">
                                            <div className="token__card--item--details">
                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Contract Address
                                                    </p>

                                                    <p className="token__card--item--details--item--text blueC">
                                                        0xa5f1...f215
                                                    </p>
                                                </div>

                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Token ID
                                                    </p>

                                                    <p className="token__card--item--details--item--text blueC">
                                                        202703
                                                    </p>
                                                </div>

                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Token Standard
                                                    </p>

                                                    <p className="token__card--item--details--item--text bold">
                                                        ERC-721
                                                    </p>
                                                </div>

                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Blockchain
                                                    </p>

                                                    <p className="token__card--item--details--item--text bold">
                                                        Ethereum
                                                    </p>
                                                </div>

                                                <div className="token__card--item--details--item">
                                                    <p className="token__card--item--details--item--text">
                                                        Investor/Creator Earnings
                                                    </p>

                                                    <p className="token__card--item--details--item--text bold">
                                                        3/2%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="token__card--item">
                                    <button
                                        onClick={() => setHistory(!history)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/history.svg"
                                                alt="history"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                Price History
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                history ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {history && (
                                        <div className="token__card--item--bottom">
                                            <StatChart />
                                        </div>
                                    )}
                                </div>

                                <div className="token__card--item">
                                    <button
                                        onClick={() => setList(!list)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/listings.svg"
                                                alt="listings"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">
                                                Listings
                                            </p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                list ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {list && (
                                        <div className="token__card--item--bottom nop">
                                            <div className="token__card--content--listing--item titles">
                                                <p className="token__card--content--listing--item--title">
                                                    Price
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    USD Price
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    Expiration
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    From
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.000 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $00.00
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    1 day
                                                </p>

                                                <p className="token__card--content--listing--item--title blueC">
                                                    Username
                                                </p>

                                                <button className="button token__card--content--listing--item--button">
                                                    Book
                                                </button>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.000 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $00.00
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    1 day
                                                </p>

                                                <p className="token__card--content--listing--item--title blueC">
                                                    Username
                                                </p>

                                                <button className="button token__card--content--listing--item--button">
                                                    Book
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="token__card--item">
                                    <button
                                        onClick={() => setOffers(!offers)}
                                        className="button token__card--item--top"
                                    >
                                        <span className="token__card--item--top--title--inner">
                                            <img
                                                src="/assets/img/menu2.svg"
                                                alt="menu2"
                                                className="token__card--item--top--title--icon"
                                            />

                                            <p className="token__card--item--top--title">Offers</p>
                                        </span>

                                        <img
                                            src="/assets/img/arrow-select.png"
                                            alt="arrow"
                                            className={`token__card--item--open${
                                                offers ? ' active' : ''
                                            }`}
                                        />
                                    </button>

                                    {offers && (
                                        <div className="token__card--item--bottom nop">
                                            <div className="token__card--content--listing--item titles">
                                                <p className="token__card--content--listing--item--title">
                                                    Price
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    USD Price
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    Floor Difference
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    Expiration
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    From
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>

                                            <div className="token__card--content--listing--item">
                                                <p className="token__card--content--listing--item--title">
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth"
                                                    />
                                                    0.056 ETH
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    $19.14
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    42% below
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    3 days
                                                </p>

                                                <p className="token__card--content--listing--item--title">
                                                    0C958A
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="token__card--wrap full">
                        <div className="token__card--item">
                            <button
                                onClick={() => setAct(!act)}
                                className="button token__card--item--top"
                            >
                                <span className="token__card--item--top--title--inner">
                                    <img
                                        src="/assets/img/activity.svg"
                                        alt="activity"
                                        className="token__card--item--top--title--icon"
                                    />

                                    <p className="token__card--item--top--title">Item Activity</p>
                                </span>

                                <img
                                    src="/assets/img/arrow-select.png"
                                    alt="arrow"
                                    className={`token__card--item--open${act ? ' active' : ''}`}
                                />
                            </button>

                            {act && (
                                <div className="token__card--item--bottom nop">
                                    <div className="token__card--content--listing--item titles">
                                        <p className="token__card--content--listing--item--title">
                                            Event
                                        </p>

                                        <p className="token__card--content--listing--item--title">
                                            Price
                                        </p>

                                        <p className="token__card--content--listing--item--title">
                                            From
                                        </p>

                                        <p className="token__card--content--listing--item--title">
                                            To
                                        </p>

                                        <p className="token__card--content--listing--item--title">
                                            Date
                                        </p>
                                    </div>

                                    <div className="token__card--content--listing--item">
                                        <p className="token__card--content--listing--item--title">
                                            <img
                                                src="/assets/img/listings.svg"
                                                alt="listing"
                                                className="icon__temp"
                                            />
                                            List
                                        </p>

                                        <p className="token__card--content--listing--item--title">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            0.008
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            Username
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC"></p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            2 monts ago
                                        </p>
                                    </div>

                                    <div className="token__card--content--listing--item">
                                        <p className="token__card--content--listing--item--title">
                                            <img
                                                src="/assets/img/hand2.svg"
                                                alt="listing"
                                                className="icon__temp"
                                            />
                                            Bid
                                        </p>

                                        <p className="token__card--content--listing--item--title">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            0.008
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            Username
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC"></p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            2 monts ago
                                        </p>
                                    </div>

                                    <div className="token__card--content--listing--item">
                                        <p className="token__card--content--listing--item--title">
                                            <img
                                                src="/assets/img/transfer.svg"
                                                alt="transfer"
                                                className="icon__temp"
                                            />
                                            Transfer
                                        </p>

                                        <p className="token__card--content--listing--item--title"></p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            Username
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            Username
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            2 monts ago
                                        </p>
                                    </div>

                                    <div className="token__card--content--listing--item">
                                        <p className="token__card--content--listing--item--title">
                                            <img
                                                src="/assets/img/cart.svg"
                                                alt="cart"
                                                className="icon__temp"
                                            />
                                            Sale
                                        </p>

                                        <p className="token__card--content--listing--item--title">
                                            <img
                                                src="/assets/img/eth.svg"
                                                alt="eth"
                                                className="eth"
                                            />
                                            0.008
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            Username
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            Username
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            2 monts ago
                                        </p>
                                    </div>

                                    <div className="token__card--content--listing--item">
                                        <p className="token__card--content--listing--item--title">
                                            <img
                                                src="/assets/img/baby.svg"
                                                alt="baby"
                                                className="icon__temp"
                                            />
                                            Minted
                                        </p>

                                        <p className="token__card--content--listing--item--title"></p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            Username
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            Username
                                        </p>

                                        <p className="token__card--content--listing--item--title blueC">
                                            2 monts ago
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="token__card--wrap full">
                        <div className="token__card--item">
                            <button
                                onClick={() => setMore(!more)}
                                className="button token__card--item--top"
                            >
                                <span className="token__card--item--top--title--inner">
                                    <img
                                        src="/assets/img/more.svg"
                                        alt="more"
                                        className="token__card--item--top--title--icon"
                                    />

                                    <p className="token__card--item--top--title">
                                        More From This Collection
                                    </p>
                                </span>

                                <img
                                    src="/assets/img/arrow-select.png"
                                    alt="arrow"
                                    className={`token__card--item--open${more ? ' active' : ''}`}
                                />
                            </button>

                            {more && (
                                <>
                                    <div className="token__card--item--bottom token__card--list">
                                        <div className="collection__item">
                                            <Link
                                                to="/token/1"
                                                className="collection__item--img--inner"
                                            ></Link>

                                            <div className="collection__item--data--inner">
                                                <div className="collection__item--data--card">
                                                    <p className="collection__item--title">
                                                        Unique card #005
                                                    </p>

                                                    <p className="collection__item--text">
                                                        Versace NFT Certificates
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="collection__item--button--inner end">
                                                <p className="collection__item--text right bold">
                                                    Last
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth m"
                                                    />
                                                    0.01
                                                </p>
                                            </div>
                                        </div>

                                        <div className="collection__item">
                                            <Link
                                                to="/token/1"
                                                className="collection__item--img--inner"
                                            ></Link>

                                            <div className="collection__item--data--inner">
                                                <div className="collection__item--data--card">
                                                    <p className="collection__item--title">
                                                        Unique card #005
                                                    </p>

                                                    <p className="collection__item--text">
                                                        Versace NFT Certificates
                                                    </p>
                                                </div>

                                                <div className="collection__item--data--price">
                                                    <p className="collection__item--text right">
                                                        Price
                                                    </p>

                                                    <p className="collection__item--text right bold">
                                                        <img
                                                            src="/assets/img/eth.svg"
                                                            alt="eth"
                                                            className="eth"
                                                        />
                                                        0.01
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="collection__item--button--inner end">
                                                <p className="collection__item--text right bold">
                                                    Last
                                                    <img
                                                        src="/assets/img/eth.svg"
                                                        alt="eth"
                                                        className="eth m"
                                                    />
                                                    0.01
                                                </p>
                                            </div>
                                        </div>

                                        <div className="collection__item">
                                            <Link
                                                to="/token/1"
                                                className="collection__item--img--inner"
                                            ></Link>

                                            <div className="collection__item--data--inner">
                                                <div className="collection__item--data--card">
                                                    <p className="collection__item--title">
                                                        Unique card #001
                                                    </p>

                                                    <p className="collection__item--text">
                                                        Versace NFT Certificates
                                                    </p>
                                                </div>

                                                <div className="collection__item--data--price">
                                                    <p className="collection__item--text right">
                                                        Price
                                                    </p>

                                                    <p className="collection__item--text right bold">
                                                        <img
                                                            src="/assets/img/eth.svg"
                                                            alt="eth"
                                                            className="eth"
                                                        />
                                                        0.01
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="collection__item--button--inner">
                                                <button className="button collection__item--button green">
                                                    Book
                                                </button>

                                                <p className="collection__item--button--text">
                                                    Investor&rsquo;s royalty 4.5%
                                                </p>
                                            </div>
                                        </div>

                                        <div className="collection__item">
                                            <Link
                                                to="/token/1"
                                                className="collection__item--img--inner"
                                            ></Link>

                                            <div className="collection__item--data--inner">
                                                <div className="collection__item--data--card">
                                                    <p className="collection__item--title">
                                                        Unique card #003
                                                    </p>

                                                    <p className="collection__item--text">
                                                        Versace NFT Certificates
                                                    </p>
                                                </div>

                                                <div className="collection__item--data--price">
                                                    <p className="collection__item--text right">
                                                        Price
                                                    </p>

                                                    <p className="collection__item--text right bold">
                                                        <img
                                                            src="/assets/img/eth.svg"
                                                            alt="eth"
                                                            className="eth"
                                                        />
                                                        0.01
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="collection__item--button--inner">
                                                <button className="button collection__item--button white">
                                                    Booked
                                                </button>

                                                <p className="collection__item--button--text">
                                                    Investor&rsquo;s royalty 4.5%
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="token__card--collection--view">
                                        <button className="button token__card--collection--button">
                                            View collection
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenCard;
