import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import AddRouteForm from './AddRouteForm';
import MiniMap from './MiniMap';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4),
    position: "relative",
    width: "1500px",
    height: "800px",
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "50%",
    transform: "translate(-50%, -50%)",
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "100px"
  },
  form: {
    position: "absolute",
    height: "700px"
  }
}));

export default function AddRouteModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [lat, setLat] = React.useState(0);
  const [lng, setLng] = React.useState(0);

  return (
    <div style={{
      overflow: "hidden",
    overflowY: "hidden",
    }}>
      <Button color="primary" variant="contained" onClick={handleOpen} style={{marginLeft: '95vh', marginBottom: '20px', }}>Добавить маршрут</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <div className={classes.paper}>
        <AddRouteForm className={classes.form} handleClose={handleClose} lat={lat} lng={lng}/>
        <MiniMap setLat={setLat} setLng={setLng}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
