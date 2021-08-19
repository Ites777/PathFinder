import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import seal from './seal.png'
import "./profile.module.css"
import UpdateProfileModal from './UpdateProfileModal';
import { FormHelperText } from '@material-ui/core';

  const useStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: 450,
      height: '90vh',
      border: '2px solid rgba(69, 115, 254, 0.4)',
      borderRadius: '10px'
    },
    wrapper: {
      height: '95%',
      width: '95%',
    },
    media: {
      height: 340,
      width: '100%',
      borderRadius: '10px'
    },
    info: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      border: '1px solid rgba(69, 115, 254, 0.2)',
      borderRadius: 10,
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: '18px',
      marginTop: 10,
      height: '30%'
    },
    seal:{
      height: 112,
      width: 126,
    },
    btns: {
      width: '100%',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }

  });

  
  export default function Profile() {
  const [profile, setProfile] = useState(localStorage);
  const classes = useStyles();
  const {
    email,
    firstName,
    lastName,
  } = profile;

  useEffect(()=>{
  },[profile])

  return (
    <Card className={classes.root}>
        <CardActionArea className={classes.wrapper}>
          <CardMedia
            className={classes.media}
            image="https://picsum.photos/500/800"
            title="header"
          />
          <CardContent className={classes.info}>
            <h3 >
              email: {email}
            </h3>
            <br/>
            <h5 >
              Имя: {firstName}
              </h5>
              Фамилия: {lastName}
              <br/>
            <h5 >
              </h5>
              <br/>
          </CardContent>
          {/* <CardMedia
            className={classes.seal}
            image={seal}
            title="header"
          /> */}
        <CardActions className={classes.btns}>
          <UpdateProfileModal className={classes.btn} setProfile={setProfile}/>
        </CardActions>
        </CardActionArea>
  </Card>
  );
}


  


