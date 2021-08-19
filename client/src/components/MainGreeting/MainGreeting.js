import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-scroll';
import Timelapse from '../video/timelapse.mp4';
import FindPath from '../OneCard/FindPath/FindPath';
import axios from 'axios';

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

export default function SimpleTooltips() {
  const classes = useStyles();

  const [bg, setBg] = useState(null);
  useEffect(() => {
    axios.post('/background')
      .then(res => {
        setBg(res.data);
      console.log(res.data); })
      
  }, [])

  return (
    <div className="mainContainer">
      <div className="intro">
        <div className="intro__media">
          <video className="intro_media_video" controled autoPlay loop muted>
            <source src={Timelapse} type="video/mp4" />
          </video>
        </div>
        <div className="intro__content" >
        <Link to="mapContainer" style={{cursor: 'pointer'}} smooth={true} duration={100}><FindPath/></Link>
        </div>
      </div>
    </div>
  )
}

