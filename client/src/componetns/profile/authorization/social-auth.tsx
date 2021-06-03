import React, {FC} from "react";
import './authorization.scss';
import {Link} from "react-router-dom";

interface PropsType {
    title: string
}

const SocialAuth:FC<PropsType> = ({title}) => {
    return (
        <div className="auth__social">
            <h3 className="auth__social-title">
                {title} z...
            </h3>
            <div className="auth__social-links">
                <Link to='' className="auth__social-link">Google</Link>
                <Link to='' className="auth__social-link">FaceBook</Link>
                <Link to='' className="auth__social-link">Apple</Link>
            </div>
        </div>
    )
}

export default SocialAuth;