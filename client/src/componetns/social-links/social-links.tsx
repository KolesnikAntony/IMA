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
                <a href="https://www.instagram.com/ima_professionalzone" className="intro__social-link social-link social-link--inst" target="_blank"/>
            </li>
            <li className={itemClass}>
                <a href="https://api.whatsapp.com/send?phone=48792424240" className="intro__social-link social-link social-link--wu" target="_blank"/>
            </li>
            <li className={itemClass}>
                <a href="mailto:ima.professionalzone@gmail.com" className="intro__social-link social-link social-link--mail" />
            </li>
        </ul>
    )
}

export default SocialLinks;