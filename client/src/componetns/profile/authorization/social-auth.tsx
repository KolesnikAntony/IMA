import React, {FC} from "react";
import './authorization.scss';
import {Link} from "react-router-dom";
import GoogleLogin from "react-google-login";
import {useDispatch} from "react-redux";
import FacebookLogin from 'react-facebook-login'
//@ts-ignore
import AppleSignin from 'react-apple-signin-auth';
import {googleAuth} from "../../../redux/auth-reducer";



interface PropsType {
    title: string
}

const SocialAuth:FC<PropsType> = ({title}) => {
    const dispatch = useDispatch();
    const responseFacebook = (response: any) => {
        console.log(response);
    };

  const responseGoggle = (response:any) => {
      console.log(response)
    dispatch(googleAuth(response.dt, response.tokenId));
  };

    return (
        <div className="auth__social">
            <h3 className="auth__social-title">
                {title}
            </h3>
            <div className="auth__social-links">
                <GoogleLogin
                    clientId="855547555993-ffa4c7kt25ung20c428mgsrqe2t66n5n.apps.googleusercontent.com"
                    render={renderProps => (
                        <button  onClick={renderProps.onClick} disabled={renderProps.disabled} className="auth__social-link">Google</button>
                    )}
                    buttonText="Login"
                    // onSuccess={() => dispatch(googleAuth())}
                    onSuccess= {responseGoggle}
                    onFailure= {responseGoggle}
                    // onFailure={() => console.log('fail')}
                    cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                    appId="181057093916855"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="auth__social-link"
                    textButton='Facebook'
                />
            </div>
        </div>
    )
}

export default SocialAuth;