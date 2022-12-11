import React from 'react';
import { Link } from 'react-router-dom';
import { roundInt } from '../../utils/roundInt';

// {
//     "id": "0cb0798e-bded-484f-964d-3eef8dd7f55c",
//     "wallet_owner": "1",
//     "hide": false,
//     "mint": false,
//     "upload_blockchain": false,
//     "freeze": false,
//     "profit": "0.00000000",
//     "creator_royalty_distribution": [
//         {
//             "id": "37f5ff6d-4cec-4a9f-a824-f5574728f2c4",
//             "percent": "1.00000000",
//             "wallet": "111"
//         },
//         {
//             "id": "5af98e3b-6588-4315-a6e2-a64253d427c2",
//             "percent": "1.00000000",
//             "wallet": "111"
//         }
//     ],
//     "income_distribution": [
//         {
//             "id": "b960c150-efe3-448a-b797-4b1d68ebb7b4",
//             "percent": "90.00000000",
//             "wallet": "111"
//         }
//     ],
//     "properties": [],
//     "levels_stats": [],
//     "collection": {
//         "id": "d5e9902a-c76f-4c27-badb-d07efa262d5b",
//         "name": "ddwew1"
//     },
//     "pack": {
//         "id": "b1547a01-7bc1-455f-9504-6caed8d1cf4f",
//         "name": "stdssdddswdsdsd2122"
//     },
//     "price_in_usd": "0",
//     "type": "standard",
//     "name": "222",
//     "price": "1.00000000",
//     "status_price": "auction",
//     "investor_royalty": "0.50000000",
//     "creator_royalty": "0.50000000",
//     "description": "string",
//     "close": false,
//     "close_image": "https://gateway.storjshare.io/demo-bucket/1212312_MQPw6yK.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221208%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221208T163040Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=883c77b961dda3540ce64862e1af89a5dccaffc829ef2e9ce5e4ee65377773ce",
//     "unlockable": false,
//     "unlockable_content": "string",
//     "status": "stop",
//     "address": null,
//     "file_1": "https://gateway.storjshare.io/demo-bucket/1212312_CEA5yN2_zPDiFkM_dp5yteE.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221208%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221208T163040Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f400788d8e5863a48496183d1dfe6206570390f0c2de905246de3bf8d6212cc8",
//     "file_2": "https://gateway.storjshare.io/demo-bucket/1212312_9mV2zOB_hcuHdve_eRxTB1k.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jvem5dwcethiin2za2fnv7j7ofaq%2F20221208%2Feu1%2Fs3%2Faws4_request&X-Amz-Date=20221208T163040Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c6ac422af36bfc1791481cded59617e31332107b439666868cf2b260f79525e8",
//     "file_1_name_ext": null,
//     "file_2_name_ext": null,
//     "url_opensea": null,
//     "currency_token": "f56d23c1-5e64-4bf6-9a24-43bbf4c2b6ea"
// }

const TokenItem = props => {
    const { token } = props;

    return (
        <div className="collection__item">
            <Link
                to={`/token/${token.id}`}
                style={{
                    backgroundImage: `url('${token.file_2}')`,
                    backgroundSize: 'cover',
                    objectFit: 'cover',
                    backgroundPosition: 'center',
                }}
                className="collection__item--img--inner"
            ></Link>

            <div className="collection__item--data--inner">
                <div className="collection__item--data--card">
                    <p className="collection__item--title">{token.name}</p>

                    <p className="collection__item--text">{token.collection.name}</p>
                </div>

                <div className="collection__item--data--price">
                    <p className="collection__item--text right">Price</p>

                    <p className="collection__item--text right bold">
                        <img src="/assets/img/eth.svg" alt="eth" className="eth" />
                        {token.price}
                    </p>
                </div>
            </div>

            <div className="collection__item--button--inner">
                <button className="button collection__item--button blue__button">Mint</button>

                <p className="collection__item--button--text">
                    Investor&rsquo;s royalty {roundInt({ num: Number(token.investor_royalty) })}%
                </p>
            </div>
        </div>
    );
};

export default React.memo(TokenItem);
