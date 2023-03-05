import React, {useState} from 'react';
import background from '../images/city.jpg';
import RegistrationForm from "../components/RegistrationForm";

const RegistrationPage = () => {
    const [enter, setEnter] = useState<any>(null);

    function ShowRegistration(role: string) {
        setEnter(<RegistrationForm role={role} close={() => setEnter(null)}/>);
    }

    return (
        <div className='registration-page h-100 d-flex'>
            <div className="col h-100 d-flex select-role">
                <div className="m-auto" onClick={() => ShowRegistration('OWNER')}>
                    Сдавать жильё
                </div>
            </div>
            <div className="col h-100 d-flex select-role">
                <div className="m-auto" onClick={() => ShowRegistration('USER')}>
                    Искать жильё
                </div>
            </div>
            {enter}
        </div>
    );
};

export default RegistrationPage;