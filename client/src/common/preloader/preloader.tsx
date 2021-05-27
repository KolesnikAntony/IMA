import React, {FC} from "react";
import './preloader.scss';

interface PropsType {
    type: string
}

const Preloader: FC<PropsType> = ({type}) => {

    return <div className="gooey">
        <span className="dot"/>
        <div className="dots">
            <span/>
            <span/>
            <span/>
        </div>
    </div>
};

export default Preloader;