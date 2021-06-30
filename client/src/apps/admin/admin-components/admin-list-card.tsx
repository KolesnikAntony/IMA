import React, {FC, SyntheticEvent, useCallback, useEffect, useRef, useState} from 'react';
import {AboutImage, AboutList, ProductType} from "../../../types/types";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Button, CardActions, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createAboutCard, deleteCardAbout, editAboutCard} from "../../../redux/admin-reduser";
import {useOutsideAlerter} from "../../../hooks/hooks";
import {RootState} from "../../../redux/store";


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
    },
    opacity: {
        opacity: 0.2,
    }

});


const AboutCard: FC<AboutImage> = ({id, caption, image, createMode}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isFetching = useSelector((state: RootState) => state.admin.isFetching);
    const isCreated = useSelector((state: RootState) => state.admin.isCreated);
    const isEdited = useSelector((state: RootState) => state.admin.isEdited);
    const [editMode, setEditMode] = useState(false);
   // const [caption, setCaption] = useState(caption);
    const [cardData, setCardData] = useState({
        id,
        caption,
        image,
        img: null as File | null
    });

    useEffect(() => {
        if (isCreated) {
            setEditMode(false);
            setCardData(prevState => ({...prevState, image: image, caption: caption}));
        }
        if(isEdited) {
            setEditMode(false);
        }
    }, [isCreated, isEdited]);


    const handleEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardData(prevState => ({...prevState, caption: e.target.value}));
    };

    const handlePhotoChange = (e: any) => {
        setCardData(prevState => ({
            ...prevState,
            image: URL.createObjectURL(e.target.files[0]),
            img: e.target.files[0]
        }));
    };

    const handleSubmit = (formData: AboutImage) => {
        dispatch(editAboutCard(formData));
    };

    const handleDeleteCard = (id: string) => {
        dispatch(deleteCardAbout(id));
    };

    const handleCreate = (formData: AboutImage) => {
        if (cardData.img === null) {
            outsideCallBack();
        } else {
            dispatch(createAboutCard(formData));
        }
    };
    const outsideCallBack = useCallback(() => {
        setEditMode(false);
        setCardData(prevState => ({...prevState, caption}));
    }, [editMode]);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, outsideCallBack);

    return <>
        <Card ref={editMode ? wrapperRef : null}>
            <div className={classes.box}>
                {editMode && <label htmlFor="cardPhoto" className={classes.upload}>
                    <span>Edit photo</span>
                    <input id='cardPhoto' type="file" className={classes.file} onChange={handlePhotoChange}/>
                </label>}
                <img src={cardData.image} alt="photo"
                     className={createMode ? `${classes.opacity} ${classes.photo} ` : classes.photo}/>
            </div>
            <CardContent className={classes.media}>
                {editMode ?
                    <TextField value={cardData.caption}  multiline={true} onChange={handleEditText} autoFocus={true}
                               onFocus={function (e) {
                                   let val = e.target.value;
                                   e.target.value = '';
                                   e.target.value = val;
                               }}/> :
                    <Typography variant="body2" color="textPrimary" component="p" className={classes.text}>
                        {cardData.caption}
                    </Typography>}
            </CardContent>

            {createMode ?
                <CardActions>
                    {!editMode ? <Button size="small" fullWidth variant='outlined' color="primary"
                                         onClick={() => setEditMode(true)}>
                            New item
                        </Button> :
                        <Button size="small" fullWidth variant='outlined' color="primary"
                                onClick={() => handleCreate(cardData)} disabled={isFetching}>
                            Create
                        </Button>
                    }
                </CardActions> :
                <CardActions>
                    {editMode ? <> <Button size="small" fullWidth variant='outlined' color="primary"
                                           onClick={() => handleSubmit(cardData)}>
                            Submit
                        </Button>
                            <Button size="small" fullWidth variant='outlined' color="secondary"
                                    onClick={() => outsideCallBack()}>
                                Cancel
                            </Button>

                        </> :
                        <>
                            <Button size="small" fullWidth variant='outlined' color="primary"
                                    onClick={() => setEditMode(true)}>
                                Edit
                            </Button>
                            <Button size="small" fullWidth variant='outlined' color="secondary"
                                    onClick={() => handleDeleteCard(cardData.id)}>
                                Delete
                            </Button>
                        </>
                    }
                </CardActions>
            }
        </Card>
    </>
};

export default AboutCard;