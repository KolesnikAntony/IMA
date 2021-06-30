import React, {FC, SyntheticEvent, useState} from 'react';
import {AboutImage, AboutList, ProductType} from "../../../types/types";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Button, CardActions, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {editAboutCard} from "../../../redux/admin-reduser";

const useStyles = makeStyles({
    root: {
        maxWidth: 250,
        width: '33%'
    },
    media: {
        overflow: "hidden",
    },
    photo: {
        width: '100%'
    },
    box: {
        overflow: "hidden",
        width: '100%',
        height: 250,
        position: 'relative',
    },
    text: {
        overflow: "hidden",
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontSize: 16,
        lineHeight: '1.1876em',
        padding: "6px 0 7px",
    },
    file: {
        opacity: 0,
        width: '100%',
        height: '100%',
        position: 'absolute',
        cursor: 'pointer',
    },
    upload: {
        background: 'rgba(0,0,0, 0.6)',
        color: 'white',
        fontWeight: 400,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        fontSize: 18,
    }

});


const AboutCard: FC<AboutImage> = ({id, caption, image}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [cardData, setCardData] = useState({
        id,
        caption,
        image,
        img: null as File| null
    });

    const handleEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardData(prevState => ({...prevState, caption: e.target.value}));
    };

    const handlePhotoChange = (e: any) => {
        setCardData(prevState => ({
            ...prevState,
            image: URL.createObjectURL(e.target.files[0]),
            img: e.target.files[0]
        }))

        console.log(typeof e.target.files[0]);
    };

    const handleSubmit = (formData: AboutImage) => {
        dispatch(editAboutCard(formData));
    };

    return <>
        <Card className={classes.root}>
            <div className={classes.box}>
                {editMode && <label htmlFor="cardPhoto" className={classes.upload}>
                    <span>Edit photo</span>
                    <input id='cardPhoto' type="file" className={classes.file} onChange={handlePhotoChange}/>
                </label>}
                <img src={cardData.image} alt="photo" className={classes.photo}/>
            </div>
            <CardContent className={classes.media}>
                {editMode ?
                    <TextField value={cardData.caption} multiline={true} onChange={handleEditText} autoFocus={true}
                               onFocus={function (e) {
                                   let val = e.target.value;
                                   e.target.value = '';
                                   e.target.value = val;
                               }}/> :
                    <Typography variant="body2" color="textPrimary" component="p" className={classes.text}>
                        {cardData.caption}
                    </Typography>}
            </CardContent>
            <CardActions>
                {editMode ? <Button size="small" variant='outlined' color="primary" onClick={() => handleSubmit(cardData)}>
                        Submit
                    </Button> :
                    <>
                        <Button size="small" variant='outlined' color="primary" onClick={() => setEditMode(true)}>
                            Edit
                        </Button>
                        <Button size="small" variant='outlined' color="secondary">
                            Delete
                        </Button>
                    </>}
            </CardActions>
        </Card>
    </>
};

export default AboutCard;