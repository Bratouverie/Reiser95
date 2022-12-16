import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './index.css';

import AccountsList from './Account';
import CollectionsList from './Collection';
import PacksList from './Pack';
import TokensList from './Token';

const Statistics = () => {
    return (
        <section className="default__padding statistics">
            <div className="container">
                <Routes>
                    <Route path="/">
                        <Route index element={<AccountsList />}>
                            <Route path=":accountId" element={<CollectionsList />}>
                                <Route path=":collectionId" element={<PacksList />}>
                                    <Route path=":packId" element={<TokensList />} />
                                </Route>
                            </Route>
                        </Route>

                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </div>
        </section>
    );
};

export default Statistics;
