import React, {FC, useMemo} from 'react'
import './back-aside.scss';

interface PropsType {
    open: boolean,
    onClose: () => void;
}

const BackAside: FC<PropsType> = ({open,onClose}) => {
    const classes = useMemo(() => `${open ? 'back show' : 'back'}`, [open]);

    return <div className={classes} onClick={()=> onClose()}></div>
};

export default BackAside;