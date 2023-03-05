import React, {useState, Dispatch, FC} from 'react';
import person_circle from '../icons/person-circle.svg';
import LoginForm from "./LoginForm";
import SuggestView from "./SuggestView";
import RegistrationForm from "./RegistrationForm";
import {useDispatch} from "react-redux";
import AuthService from "../services/AuthService";
import {useTypesSelector} from "../hooks/useTypesSelector";
import {AuthAction} from "../models/store/AuthStore";

interface HeaderProps {
    search?: boolean,
    profile?: boolean
}

const Header: FC<HeaderProps> = ({search = false, profile = false}) => {
    const dispatch: Dispatch<AuthAction> = useDispatch();
    const isAuth = useTypesSelector(state => state.auth.isAuth);
    const [enter, setEnter] = useState<any>(null);

    function ShowLogin() {
        setEnter(<LoginForm close={() => setEnter(null)}/>);
    }

    return (
        <header className="border-bottom">
            <nav className="navbar navbar-expand mx-5">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><h1 className="main-logo">REA</h1></a>
                    {
                        search ? <SuggestView/> : null
                    }
                    {
                        profile ?
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link p-0 dropdown-toggle" href="#" role="button"
                                       data-bs-toggle="dropdown"
                                       aria-expanded="false">
                                        <img className={"person-circle"} src={person_circle} alt={"Профиль"}/>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        {
                                            isAuth ?
                                                <>
                                                    <li><a className="dropdown-item" href="/profile">Профиль</a></li>
                                                    <li><a className="dropdown-item" href="#"
                                                           onClick={() => AuthService.logout(dispatch)}>Выйти</a></li>
                                                </>
                                                :
                                                <>
                                                    <li><a className="dropdown-item" href="#"
                                                           onClick={ShowLogin}>Войти</a></li>
                                                    <li><a className="dropdown-item"
                                                           href="/registration">Зарегестрироваться</a>
                                                    </li>
                                                </>
                                        }
                                        <li>
                                            <hr className="dropdown-divider"/>
                                        </li>
                                        {
                                            isAuth ?
                                                <li><a className="dropdown-item" href="/rent-out">Сдать жильё</a></li>
                                                :
                                                <li><a className="dropdown-item" href="#" onClick={ShowLogin}>Сдать
                                                    жильё</a>
                                                </li>
                                        }
                                        <li><a className="dropdown-item" href="/help">Помощь</a></li>
                                    </ul>
                                </li>
                            </ul>
                            : null
                    }
                </div>
            </nav>
            {enter}
        </header>
    );
};

export default Header;