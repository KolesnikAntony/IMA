import {FC, ReactElement, ReactNode, useEffect} from "react";
import {useLocation} from "react-router-dom";


const ScrollToTop:FC<any> = ({ children }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
};

export default ScrollToTop;