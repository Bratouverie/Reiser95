import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import AccountsList from './Account';
import CollectionsList from './Collection';
import PacksList from './Pack';
import TokensList from './Token';

const Statistics = () => {
    return (
        <section className="statistics">
            <div className="container">
                <Routes>
                    <Route index element={<AccountsList />} />
                    <Route path=":accountId" element={<CollectionsList />} />
                    <Route path=":accountId/:collectionId" element={<PacksList />} />
                    <Route path=":accountId/:collectionId/:packId" element={<TokensList />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </section>
    );
};

export default Statistics;
