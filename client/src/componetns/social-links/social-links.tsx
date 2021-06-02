import React, {FC, useMemo} from "react";
import './social-links.scss'

interface PropsType {
    outclass: string
}

const SocialLinks: FC<PropsType> = ({outclass}) => {

    const listClass = useMemo(() => outclass ? outclass + '__social social': 'social', [outclass]);
    const itemClass = useMemo(() => outclass ? outclass + '__social-item social-item': 'social-item', [outclass]);

    return (
        <ul className={listClass}>
            <li className={itemClass}>
                <a href="" className="intro__social-link social-link social-link--inst"></a>
            </li>
            <li className={itemClass}>
                <a href="" className="intro__social-link social-link social-link--wu"></a>
            </li>
            <li className={itemClass}>
                <a href="" className="intro__social-link social-link social-link--mail"></a>
            </li>
        </ul>
    )
}

export default SocialLinks;