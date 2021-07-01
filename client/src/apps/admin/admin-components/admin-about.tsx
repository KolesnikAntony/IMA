import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {PropsTypeAdminProducts} from "./product-container";
import {Button, makeStyles, TextField} from "@material-ui/core";
import AdminAboutCarts from "./admin-about-carts";
import {editAboutText, getAboutText} from "../../../redux/admin-reduser";
import {RootState} from "../../../redux/store";


const useStyles = makeStyles((theme) => ({
    textMulti: {
        width: '100%',
    },
    submit: {
        marginTop: 20
    }
}));

const AdminAbout: FC<PropsTypeAdminProducts> = ({setTitle}) => {

    const [text, setText] = useState('');
    const [changeText, setChangeText] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const aboutText = useSelector((state:RootState)=> state.admin.aboutText);
    const isEdited = useSelector((state: RootState) => state.admin.isEdited);


    useEffect(() => {
        setTitle('About us');
        dispatch(getAboutText());
    }, []);


    useEffect(() => {
       let isText =  Object.keys(aboutText).length;
       if(isText) {
           setText(aboutText.content)
       }
       if(isEdited) {
           setChangeText(false);
       }

    }, [aboutText]);



    const handleSubmitText = (e: React.SyntheticEvent, newText: string, id: string) => {
        e.preventDefault();
        dispatch(editAboutText(newText, id));
    };

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        let text = e.target.value;
        setText(text);
    };

    const handleClickToTextChange = () => {
        setChangeText(true);
    };

    return <>
        <form onSubmit={(e:React.SyntheticEvent) => handleSubmitText(e, text, aboutText.id)} className="admin-about__text">
            {!changeText ? <p className='admin-about__text-aria'><span dangerouslySetInnerHTML={{__html: text}} /></p>:
                <TextField value={text} multiline={true} onChange={handleChangeText} className={classes.textMulti} autoFocus={true} onFocus={function(e) {
                    let val = e.target.value;
                    e.target.value = '';
                    e.target.value = val;
                }}
                required={true}/>
            }
            {changeText && <Button variant="contained" className={classes.submit} color="primary" type='submit'>Submit</Button>}
        </form>
        <div className="admin-about__buttons">
            {!changeText && <Button variant="contained" color="primary" onClick={handleClickToTextChange}>Change text</Button>}
        </div>
        <AdminAboutCarts/>
    </>

};

export default AdminAbout;