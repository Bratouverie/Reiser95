import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import './App.css';

import Wrapper from './common/Wrapper';
import WrapperAdmin from './common/WrapperAdmin';

import Main from './pages/Main';
import Stats from './pages/Stats';
import Collection from './pages/Collection';
import About from './pages/About';
import Profile from './pages/Profile';
import TokenCard from './pages/TokenCard';
import TemplatePage from './pages/TemplatePage';

import WhiteList from './pages/WhiteList';
import Activity from './pages/Activity';
import Statistics from './pages/Statistics';
import ControlPanel from './pages/ControlPanel';
import CreatePage from './pages/CreatePage';
import CreateAccount from './pages/CreateAccount';
import CreateCollection from './pages/CreateCollection';
import CreatePack from './pages/CreatePack';
import CreateItem from './pages/CreateItem';
import InitialDataWrapper from './containers/InitialDataContainer';
import { NotificationsContainer } from './containers/NotificationsContainer';
import { NotificationProvider } from './context/NotificationContext';
import { useGetProfileQuery } from './redux/api/authService';

const App = () => {
    return (
        <>
            <img src="/assets/img/main-bg.png" alt="bg" className="main__bg" />
            <StyledEngineProvider>
                <NotificationProvider>
                    <NotificationsContainer>
                        <InitialDataWrapper>
                            <Routes>
                                <Route path="/" element={<Wrapper />}>
                                    <Route index element={<Main />} />
                                    <Route path="stats" element={<Stats />} />
                                    <Route path="about" element={<About />} />
                                    <Route path="profile" element={<Profile />} />
                                    <Route path="collection/:id" element={<Collection />} />
                                    <Route path="token/:id" element={<TokenCard />} />
                                    <Route path=":url" element={<TemplatePage />} />
                                </Route>

                                <Route path="/admin/" element={<WrapperAdmin />}>
                                    <Route index element={<ControlPanel />} />
                                    <Route path="whitelist" element={<WhiteList />} />
                                    <Route path="activity" element={<Activity />} />
                                    <Route path="statistics/*" element={<Statistics />} />
                                    <Route path="createpage" element={<CreatePage />} />
                                    <Route path="changepage" element={<CreatePage />} />
                                    <Route path="createaccount" element={<CreateAccount />} />
                                    <Route path="createcollection" element={<CreateCollection />} />
                                    <Route path="createpack" element={<CreatePack />} />
                                    <Route path="createitem" element={<CreateItem />} />
                                    <Route path="edit/">
                                        <Route path="page/:url" element={<CreatePage isEdit />} />
                                        <Route
                                            path="account/:id"
                                            element={<CreateAccount isEdit />}
                                        />
                                        <Route
                                            path="collection/:id"
                                            element={<CreateCollection isEdit />}
                                        />
                                        <Route path="pack/:id" element={<CreatePack isEdit />} />
                                        <Route path="token/:id" element={<CreateItem isEdit />} />
                                    </Route>
                                    <Route path="*" element={<Navigate to="/" />} />
                                </Route>
                            </Routes>
                        </InitialDataWrapper>
                    </NotificationsContainer>
                </NotificationProvider>
            </StyledEngineProvider>
        </>
    );
};

export default App;
