import React, { useEffect, useCallback, useState } from 'react';
import { cnb } from 'cnbuilder';
import { ethers } from 'ethers';
import { OverflowTooltip } from '../../OverflowTooltip';

import css from '../Table.module.css';

const WalletCell = (props) => {
    const { wallet, classes } = props;

    const [balance, setBalance] = useState('-');

    const getBalance = useCallback(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(wallet);
        const balanceInEth = ethers.utils.formatEther(balance);

        setBalance(balanceInEth || '-');
    }, []);

    useEffect(() => {
        getBalance();
    }, [wallet]);

    return (
        <div className={cnb(classes.cellRoot, css.walletCell)}>
            <OverflowTooltip
                placement="bottom"
                classes={{
                    tooltip: css.tooltip,
                }}
                title={wallet}
                maxLines={1}
            >
                <span className={css.overflowWrapper}>{wallet}</span>
            </OverflowTooltip>
            <OverflowTooltip
                placement="bottom"
                classes={{
                    tooltip: css.tooltip,
                }}
                title={balance}
                maxLines={1}
            >
                <span className={css.overflowWrapper}>{`${balance} Eth` || '-'}</span>
            </OverflowTooltip>
        </div>
    );
};

export default React.memo(WalletCell);
