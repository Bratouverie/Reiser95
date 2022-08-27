import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Wrapper from "./components/Wrapper";
import WrapperAdmin from "./components/WrapperAdmin";

import Persons from "./pages/Persons";
import Brands from "./pages/Brands";
import Stats from "./pages/Stats";
import Collection from "./pages/Collection";
import Watches from "./pages/Watches";
import About from "./pages/About";
import Cars from "./pages/Cars";
import Alco from "./pages/Alco";
import Profile from "./pages/Profile";

import ControlPanel from "./pages/ControlPanel";
import CreatePage from "./pages/CreatePage";
import CreateAccount from './pages/CreateAccount';
import CreateCollection from './pages/CreateCollection';

const App = () => {
    return (
        <>
            <img src="/assets/img/main-bg.png" alt="bg" className="main__bg" />

            <Routes>
                <Route path="/" element={<Wrapper />}>
                    <Route index element={<Persons />} />
                    <Route path="brands" element={<Brands />} />
                    <Route path="alco" element={<Alco />} />
                    <Route path="watches" element={<Watches />} />
                    <Route path="cars" element={<Cars />} />
                    <Route path="stats" element={<Stats />} />
                    <Route path="about" element={<About />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="collection/:id" element={<Collection />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>

                <Route path="/admin" element={<WrapperAdmin />}>
                    <Route index element={<ControlPanel />} />
                    <Route path="createpage" element={<CreatePage />} />
                    <Route path="createaccount" element={<CreateAccount />} />
                    <Route path="createcollection" element={<CreateCollection />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
