import React, {FC, useCallback, useEffect} from 'react';
import './home.scss';
import Intro from "./intro/intro";
import NewProducts from "./new-products/new-products";
import NewMemberPopup from '../../common/new-member-popup/new-member-popup';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {activateUser} from "../../redux/auth-reducer";
import Banner from './banner/banner';
import TopProducts from "./top-products/top-products";
import {useViewSize} from "../../hooks/hooks";
import SwiperCore, {Navigation} from "swiper";


const Home:FC<PropsType> = ({isNewMember, match}) => {
    console.log('render home');
    let key = match.params.key;

    SwiperCore.use([Navigation]);
    let {width} = useViewSize();

    let getCountOfSlide = useCallback( (width: number) => {
        if(width > 991) {
            return 4
        }else if(width > 814){
            return 3
        }else if(width > 504){
            return 2
        }else{
            return 1
        }
    }, [width]);

    const dispatch = useDispatch();
    useEffect(()=> {
        isNewMember && dispatch(activateUser(key));
    });

    return <>
        {isNewMember && <NewMemberPopup />}
        <Intro/>
        <TopProducts getCountOfSlide={() => getCountOfSlide(width)}/>
        <Banner/>
        <NewProducts getCountOfSlide={() => getCountOfSlide(width)}/>
    </>

};

export default withRouter(Home);

type PathParamsType = {
    key: string
}
// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
    isNewMember: boolean
    onClose: () => void
}