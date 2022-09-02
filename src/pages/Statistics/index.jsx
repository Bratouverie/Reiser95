import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./index.css";

import Account from './Account';
import Collection from './Collection';
import Pack from './Pack';
import Token from './Token';

const Statistics = () => {
    return (
        <section className="default__padding statistics">
            <div className="container">
                <Routes>
                    <Route path="/">
                        <Route index element={<Account />} />
                        <Route path="collection" element={<Collection />} />
                        <Route path="pack" element={<Pack />} />
                        <Route path="token" element={<Token />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </div>
        </section>
    );
};

export default Statistics;
