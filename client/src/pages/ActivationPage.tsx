import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import AuthService from '../services/AuthService';

const ActivationPage = () => {
    const {uuid} = useParams<string>();
    const [active, setActive] = useState<any>(false);

    useEffect(() => {
        AuthService.activate(String(uuid)).then((res) => {
            setActive(res)
        })
    }, [])
    

    return (
        <div>
            {
                active ? 'Активировано' : 'Неверная ссылка'
            }
        </div>
    )
}

export default ActivationPage;