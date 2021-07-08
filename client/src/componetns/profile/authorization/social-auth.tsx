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
    dispatch(googleAuth(response.dt.Nt, response.tokenId));
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
                <AppleSignin
                    /** Auth options passed to AppleID.auth.init() */
                    authOptions={{
                        /** Client ID - eg: 'com.example.com' */
                        clientId: 'com.example.web',
                        /** Requested scopes, seperated by spaces - eg: 'email name' */
                        scope: 'email name',
                        /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
                        redirectURI: 'http://localhost:3000/',
                        /** State string that is returned with the apple response */
                        state: 'state',
                        /** Nonce */
                        nonce: 'nonce',
                        /** Uses popup auth instead of redirection */
                        usePopup: true,
                    }} // REQUIRED

                    /** Called upon signin success in case authOptions.usePopup = true -- which means auth is handled client side */
                    onSuccess={(response: any) => console.log(response)} // default = undefined
                    /** Called upon signin error */
                    onError={(error: any) => console.error(error)} // default = undefined
                    /** render function - called with all props - can be used to fully customize the UI by rendering your own component  */
                    render={(props: any) => <button {...props} className="auth__social-link">Apple</button>}
                />
            </div>
        </div>
    )
}

export default SocialAuth;