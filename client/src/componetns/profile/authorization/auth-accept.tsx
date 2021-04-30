import React, {FC} from 'react';
import './authorization.scss'
import logo from './../../../assets/img/logo-for-IMA.png'

interface PropsType {
    email: string | null
}

const AuthAccept: FC<PropsType> = ({email}) => {
    return <div className="auth__accept">
        <img src={logo} alt="IMA" className="auth__accept-logo"/>
        <p className="auth__accept-text">
            An email was sent to <a href={`mailto:"${email}"`} className='auth__accept-email'>{email}</a> with a link to confirm registration...
        </p>
    </div>
};

export  default AuthAccept;