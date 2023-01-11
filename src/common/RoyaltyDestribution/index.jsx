import _ from 'lodash';
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { ONLY_NUMBERS_REGEX_ONLY_G } from '../../const/regExp';

const ONE_HUNDRED = 100;

const ROYALTY_DESTRIBIUTION = {
    percentage: '',
    wallet: '',
};

const RoyaltyDestribution = ({
    royaltyDestribution,
    deleteDestributionItem,
    saveRoyaltyWalletHandler,
}) => {
    const [royaltyInput, setRoyaltyInput] = useState(null);

    const onRoyaltyInputPercentageChange = useCallback(
        e => {
            if (royaltyInput) {
                const value = e.currentTarget.value.match(ONLY_NUMBERS_REGEX_ONLY_G);

                const valueStr = value && value.join('');

                if (Number(valueStr) <= ONE_HUNDRED) {
                    setRoyaltyInput(p => ({
                        ...p,
                        percentage: valueStr,
                    }));
                }
            }
        },
        [royaltyInput],
    );

    const onRoyaltyInputWalletChange = useCallback(
        e => {
            if (royaltyInput) {
                setRoyaltyInput(p => ({
                    ...p,
                    wallet: e.target.value,
                }));
            }
        },
        [royaltyInput],
    );

    const onSaveRoyaltyWalletHandler = useCallback(() => {
        const sumRoyaltyPerc = royaltyDestribution.reduce((a, c) => a + Number(c.percentage), 0);
        if (
            royaltyInput &&
            royaltyInput.percentage &&
            royaltyInput.wallet &&
            sumRoyaltyPerc + Number(royaltyInput.percentage) <= ONE_HUNDRED
        ) {
            saveRoyaltyWalletHandler({ id: _.uniqueId('incomeRoyalty_'), ...royaltyInput });

            setRoyaltyInput(null);
        }
    }, [royaltyInput, royaltyDestribution]);

    const addRoyaltyWallet = useCallback(() => {
        setRoyaltyInput(ROYALTY_DESTRIBIUTION);
    }, []);

    return (
        <>
            {Boolean(royaltyDestribution && royaltyDestribution.length) &&
                royaltyDestribution.map(wallet => (
                    <div className="control__item" key={wallet.id}>
                        <input
                            type="text"
                            className="input control__input control__input--mini"
                            disabled
                            value={wallet.percentage}
                        />

                        <input
                            type="text"
                            className="input control__input"
                            value={wallet.wallet}
                            disabled
                        />

                        <button className="button control__item--settings default__hover">
                            <img
                                src="/assets/img/settings-white.svg"
                                alt="settings"
                                className="control__item--settings--icon"
                            />
                        </button>

                        <button
                            className="button control__item--confirm default__hover delete"
                            onClick={() => deleteDestributionItem(wallet.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            {royaltyInput && (
                <div className="control__item">
                    <input
                        type="text"
                        className="input control__input control__input--mini"
                        value={royaltyInput.percentage}
                        onChange={onRoyaltyInputPercentageChange}
                    />

                    <input
                        type="text"
                        className="input control__input"
                        placeholder="0xeA09D6D8Cff17b11E45763d1025831de3E2DdaAF"
                        value={royaltyInput.wallet}
                        onChange={onRoyaltyInputWalletChange}
                    />

                    <button className="button control__item--settings default__hover">
                        <img
                            src="/assets/img/settings-white.svg"
                            alt="settings"
                            className="control__item--settings--icon"
                        />
                    </button>

                    <button
                        className="button control__item--confirm default__hover save"
                        onClick={onSaveRoyaltyWalletHandler}
                    >
                        Save
                    </button>
                </div>
            )}

            <button className="button control__add default__hover" onClick={addRoyaltyWallet}>
                + Add Wallet address
            </button>
        </>
    );
};

export default React.memo(RoyaltyDestribution);
