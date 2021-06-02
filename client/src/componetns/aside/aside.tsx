import React, {FC, useCallback, useMemo} from "react";
import './aside.scss'
import {VIEW_TYPES} from "../../constants/constants";
import Cart from "../cart/cart";
import WishList from "../wish/wish-list";
import Profile from "../profile/profile";
import Burger from "../burger-menu/burger-menu";
import {useDisableBodyScroll} from "../../hooks/hooks";
import BackAside from "../../common/back-aside/back-aside";
import Contacts from "../contacts/contacts";

interface PropsType {
    open: boolean,
    view: string | null
    onClose: () => void;
}

const Aside:FC<PropsType> = ({open, view, onClose}) => {

    useDisableBodyScroll(open);

    const currentView = () => {
        if(view === VIEW_TYPES.CART) return <Cart onClose={onClose}/>;
        if(view === VIEW_TYPES.WISH) return <WishList/>;
        if(view === VIEW_TYPES.PROFILE) return <Profile/>;
        if(view === VIEW_TYPES.BURGER) return <Burger onClose={onClose}/>;
        if(view === VIEW_TYPES.CONTACTS) return <Contacts/>;
    };
    const classes = useMemo(() => `aside ${open ? 'show': null}`, [open]);

    return (<>
        <div className={classes}>
            {currentView()}
            <button className='aside__close' onClick={onClose}/>
        </div>
            <BackAside open={open} onClose={onClose}/>
        </>
    )
}
export default Aside;