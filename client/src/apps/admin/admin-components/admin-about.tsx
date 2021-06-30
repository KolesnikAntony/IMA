import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {PropsTypeAdminProducts} from "./product-container";
import {Button, makeStyles, TextField} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    textMulti: {
        width: '100%',
    }
}));

const AdminAbout: FC<PropsTypeAdminProducts> = ({setTitle}) => {
    const string = 'Sklep stworzony przez profesjonalistów dla profesjonalistów. Sprowadzamy tylko najlepsze z całego świata.Sprawdź nasz insta ima_professionalzone i zainspiruj się. Na naszej stronie możesz kupować hurtowo zarówno detalicznie.  Poznaj inspiracje od naszych Ambasadorów'

    const [text, setText] = useState(string);
    const [changeText, setChangeText] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        setTitle('About us')
    }, []);

    const handleSubmitText = (newText: string) => {
        console.log(newText)
        setChangeText(false);

    };

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        let text = e.target.value;
        setText(text);
    };

    const handleClickToTextChange = () => {
        setChangeText(true);
    };

    return <>
        <div className="admin-about__text">
            {!changeText ? <p className='admin-about__text-aria'>{text}</p>:
                <TextField value={text} multiline={true} onChange={handleChangeText} className={classes.textMulti} autoFocus={true} onFocus={function(e) {
                    let val = e.target.value;
                    e.target.value = '';
                    e.target.value = val;
                }}/>
            }
        </div>
        <div className="admin-about__buttons">
            {!changeText ? <Button variant="contained" color="primary" onClick={handleClickToTextChange}>Change text</Button>:
                <Button variant="contained" color="primary" onClick={() => handleSubmitText(text)}>Submit</Button>
            }
        </div>


    </>

};

export default AdminAbout;