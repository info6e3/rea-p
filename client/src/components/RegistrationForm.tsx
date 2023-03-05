import React, {FC, useState} from 'react';
import InactiveBackground from "./InactiveBackground";
import AuthService from "../services/AuthService";
import {IUserOrder} from "../models/IUserOrder";

interface RegistrationFormProps {
    close: () => void,
    role: string
}

const RegistrationForm: FC<RegistrationFormProps> = ({close, role}) => {
    const [validate, setValidate] = useState<boolean>(false);

    const [user, setUser] = useState<IUserOrder>({
        email: '',
        password: '',
        role,
        name: '',
        surname: '',
        description: '',
        birth_date: ''
    });

    const [retPassword, setRetPassword] = useState("");

    return (
        <InactiveBackground>
            <form className="bg-light rounded border col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-8 offset-2 p-2">
                <button type="button" className="btn-close float-end" aria-label="Close"
                        onClick={close}></button>
                <div id="registration-auth"  className={validate ? 'd-none' : ''}>
                    <div className="mb-3">
                        <label htmlFor="InputEmail" className="form-label">Электронная почта</label>
                        <input onChange={e => setUser({...user, email: e.target.value})} type="email"
                               className="form-control" id="InputEmail" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">Мы никогда не будем делиться вашей электронной
                            почтой с кем-либо еще.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPassword" className="form-label">Пароль</label>
                        <input onChange={e => setUser({...user, password: e.target.value})} type="password"
                               className="form-control" id="InputPassword"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputRetPassword" className="form-label">Пароль повторно</label>
                        <input onChange={e => setRetPassword(e.target.value)} type="password"
                               className="form-control" id="InputRetPassword"/>
                    </div>
                    <button type="button" className="btn btn-dark" onClick={async () => {
                        if (!user.password) return alert('Введите пароль');
                        if (!user.email) return alert('Введите email');
                        if (user.password === retPassword) {
                            AuthService.validateEmail(user.email).then((status) => {
                                if (status) setValidate(true);
                            })
                        } else {
                            alert('Пароли не совпадают.')
                        }
                    }}>Далее
                    </button>
                </div>
                <div id="registration-info" className={validate ? '' : 'd-none'}>
                    <div className="mb-3">
                        <label htmlFor="InputName" className="form-label">Имя</label>
                        <input onChange={e => setUser({...user, name: e.target.value})} type="text"
                               className="form-control" id="InputName"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputSurname" className="form-label">Фамилия</label>
                        <input onChange={e => setUser({...user, surname: e.target.value})} type="text"
                               className="form-control" id="InputSurname"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputBirthDate" className="form-label">Дата рождения</label>
                        <input onChange={e => setUser({...user, birth_date: e.target.value})} type="date"
                               className="form-control" id="InputBirthDate"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputDescription" className="form-label">Описание</label>
                        <textarea onChange={e => setUser({...user, description: e.target.value})}
                                  className="form-control" id="InputDescription"/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-dark" onClick={() => {
                            setValidate(false)
                        }}>Назад
                        </button>
                        <button type="button" className="btn btn-dark" onClick={async () => {
                            AuthService.registration(user).then((status) => {
                                if (status) alert('Письмо для активации отправлено на почту.');
                            })
                        }}>Регистрация
                        </button>
                    </div>
                </div>
            </form>
        </InactiveBackground>
    );
}
export default RegistrationForm;