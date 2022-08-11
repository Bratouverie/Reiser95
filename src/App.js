import React from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.css';

import Wrapper from './components/Wrapper';
import Persons from './pages/Persons';
import Brands from './pages/Brands';
import Stats from './pages/Stats';
import Collection from './pages/Collection';

const App = () => {
    return(
        <>
            <Routes>
                <Route path='/' element={<Wrapper/>}>
                    <Route index element={<Persons/>}/>
                    <Route path='brands' element={<Brands/>}/>
                    <Route path='stats' element={<Stats />}/>
                    <Route path='collection' element={<Collection />}/>
                </Route>
            </Routes>
        </>
    )
}

export default App;
