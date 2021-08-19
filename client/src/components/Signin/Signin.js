import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signinAxios } from '../../store/signinSlice';
import { useHistory } from 'react-router';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
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
  link: {
    textDecoration: 'none',    
  }
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link className={classes.link} color="inherit" href="https://material-ui.com/">
        Elbrus Bootcamp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.signin.auth)
  const message = useSelector(state => state.signin.message)
  const user = useSelector(state => state.signin.user)



  useEffect(()=> {
    if(auth) {
      localStorage.setItem('id', user.id)
      localStorage.setItem('firstName', user.firstName)
      localStorage.setItem('lastName', user.lastName)
      localStorage.setItem('email', user.email)
      localStorage.setItem('auth', auth)
      window.location.replace('http://localhost:3000/')
    } 
  },[auth])

  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form className={classes.form} onSubmit={ e => {
          e.preventDefault()
          let form = new FormData(e.target)
          let formData = {
            email: form.get('email'),
            password: form.get('password'),
          } 
          dispatch(signinAxios(formData))
        }}>
          <TextField
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
          {/* <FormControlLabel
            control='123'
            label="Remember me"
          /> */}
          {message && <div>
            <Alert severity="error">{message}</Alert>
            
            </div>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" className={classes.link} variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" className={classes.link} variant="body2">
                {"Нет аккаунта? Зарегестрируйся!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
