import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import StartPage from "./pages/StartPage";
import {YMaps} from '@pbe/react-yandex-maps';
import Header from "./components/Header";
import './styles/App.scss';
import './styles/Yandex.scss';
import AuthService from "./services/AuthService";
import {useDispatch} from "react-redux";
import FlatPage from "./pages/FlatPage";
import RentOutPage from "./pages/RentOutPage";
import {useTypesSelector} from "./hooks/useTypesSelector";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import ActivationPage from './pages/ActivationPage';

const App = () => {
    const dispatcher = useDispatch()
    const isAuth = useTypesSelector(state => state.auth.isAuth);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            AuthService.checkAuth().then((action) => {
                if (action) {
                    dispatcher(action);
                }
            })
        }
    }, [])

    return (
        <div className="app">
            <YMaps query={{apikey: 'dc155095-e42f-47bd-b54a-18f9911ae027', load: "package.full"}}>
                <Router>
                    <Routes>
                        <Route path={"/"} element={<><Header profile search/><StartPage/></>}/>
                        {
                            isAuth ?
                                <Route path={"/rent-out"} element={<><Header profile/><RentOutPage/></>}/>
                                :
                                <Route path={"/rent-out"} element={<><Header profile/>Авторизируйтесь</>}/>
                        }
                        {
                            isAuth ?
                                <Route path={"/profile"} element={<><Header profile/><ProfilePage/></>}/>
                                :
                                <Route path={"/profile"} element={<><Header profile/>Авторизируйтесь</>}/>
                        }
                        <Route path={"/flat/:id"} element={<><Header profile/><FlatPage/></>}/>
                        <Route path={"/registration"} element={<><Header/><RegistrationPage/></>}/>
                        <Route path={"/activate/:uuid"} element={<ActivationPage/>}/>

                    </Routes>
                </Router>
            </YMaps>
        </div>
    );
};

export default App;