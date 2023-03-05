import React, {Dispatch, FC, useState} from 'react';
import InactiveBackground from "./InactiveBackground";
import AuthService from "../services/AuthService";
import {useDispatch} from "react-redux";
import {AuthAction} from "../models/store/AuthStore";

interface LoginFormProps {
    close: () => void,
}
const LoginForm:FC<LoginFormProps>  = (props) => {
    const dispatch:Dispatch<AuthAction> = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <InactiveBackground>
            <form className="bg-light rounded border col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-8 offset-2 p-2">
                <button type="button" className="btn-close float-end" aria-label="Close" onClick={props.close}></button>
                <div className="mb-3">
                    <label htmlFor="InputEmail1" className="form-label">Электронная почта</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">Мы никогда не будем делиться вашей электронной почтой с кем-либо еще.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">Пароль</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="InputPassword1"/>
                </div>
                <button type="button" className="btn btn-dark" onClick={() => {
                    AuthService.login(email, password, dispatch).then(props.close)
                }}>Submit</button>
            </form>
        </InactiveBackground>
    );
}
export default LoginForm;