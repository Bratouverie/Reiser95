import React from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.css';

import Wrapper from './components/Wrapper';
import Persons from './pages/Persons';
import Brands from './pages/Brands';
import Stats from './pages/Stats';
import Collection from './pages/Collection';
import Watches from './pages/Watches';
import About from './pages/About';

const App = () => {
    return(
        <>
            <img src="/assets/img/main-bg.png" alt="bg" className="main__bg" />

            <Routes>
                <Route path='/' element={<Wrapper/>}>
                    <Route index element={<Persons/>}/>
                    <Route path='brands' element={<Brands/>}/>
                    <Route path='stats' element={<Stats />}/>
                    <Route path='collection' element={<Collection />}/>
                    <Route path='watches' element={<Watches />}/>
                    <Route path='about' element={<About />}/>
                </Route>
            </Routes>
        </>
    )
}

export default App;
