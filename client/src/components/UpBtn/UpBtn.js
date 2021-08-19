import React from 'react';
import EjectIcon from '@material-ui/icons/Eject';
import { Link } from 'react-scroll';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

export default function UpBtn() {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Tooltip title="upstairs" aria-label="add">
        <Fab color="primary" className={classes.fab}>
          <Link to="header" smooth={true} duration={100}><EjectIcon></EjectIcon></Link>
        </Fab>
      </Tooltip>
    </Grid>
  )
}
