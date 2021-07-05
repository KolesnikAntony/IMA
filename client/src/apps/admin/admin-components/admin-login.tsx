import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {actionsAuth, loginThunk} from "../../../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Snackbar} from "@material-ui/core";
import {RootState} from "../../../redux/store";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://ima-professional.pl/">
                ima-professional
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isError = useSelector((state:RootState) => state.auth.isError);


    const [formData, setFormData] = useState({
        login: '',
        password: '',
        rememberMe: false,
    });

    const handleSubmit = (e: React.SyntheticEvent, data: any) => {
        e.preventDefault();
        let {login, password} = data;
        dispatch(loginThunk(login, password));
    };

    const handleCloseAlert = () => {
        dispatch(actionsAuth.setError(false));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e: React.SyntheticEvent) => handleSubmit(e, formData)}>
                    <TextField
                        value={formData.login}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(
                            prevState => ({...prevState, login: e.target.value})
                        )}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        value={formData.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(
                            prevState => ({...prevState, password: e.target.value})
                        )}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"
                                           onChange={() => setFormData(
                                               prevState => ({...prevState, rememberMe: !prevState.rememberMe})
                                           )}
                                           checked={formData.rememberMe}/>
                        }
                        label="Remember me"/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
            <Snackbar open={isError} autoHideDuration={6000} onClose={handleCloseAlert}>
                <p>Error</p>
            </Snackbar>
        </Container>
    );
}