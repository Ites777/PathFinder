import React, { useState, memo, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import "./style.module.css";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';//
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-scroll';
import Grid from '@material-ui/core/Grid';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { InfoBox } from '@react-google-maps/api';
import MarkerCard from "./MarkerCard";

const useStyles = makeStyles((theme) => ({//
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));


const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const defaultZoom = 9;
const defaultCenter = {
  lat: 43.44514365102102,
  lng: 41.73673191647548,
};

const defaultMarkerPosition = {
  lat: 43.44514365102102,
  lng: 41.73673191647548,
};

const infoBoxOptions = { closeBoxURL: "", enableEventPropagation: true };
const options = { streetViewControl: false };

function MapContainer() {

  const classes = useStyles();//
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyApzvj3AYiAkv1Vr9x48zJ1NpK4DuqE-1M",
  });

  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  const [markersList, setMarkersList] = useState([]);
  const [open, setOpen] = useState(false);
  const [cords, setCords] = useState({});
  const [cardProps, setCardProps] = useState({});

  const cards = useSelector(state => state.cards.cards);

  const handler = async (e1, e2, e3) => {
  await setCords(e1);
  await setCardProps(e2)
  await setOpen(e3);
  }


  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);


  useEffect(() => {
    setMarkersList(cards);
  }, [cards]);
  const allMarks = () => {
    if (cards) {

  const onLoad = infoBox => {
    console.log('infoBox: ', infoBox)
  };

      return cards.map((el) => (

    <div>
      <Marker
          key={el.id}
          clickable={true}
          position={{
            lat: el.lat / 1,
            lng: el.lng / 1,
          }}
          title={el.title}
          onClick={() => 
            {
              handler({
                lat: el.lat / 1,
                lng: el.lng / 1,
              }, el, true)
            }}
        >

          {/* <MarkerCard /> */}
        </Marker>
        {open && (
        <InfoBox
        onLoad={onLoad}
        options={infoBoxOptions}
        position={cords}
        
        >
        <MarkerCard cardProps={cardProps}/>
    </InfoBox>
      )} 
    </div>
    
      ));
    }
    return null
  };

  return isLoaded ? (
    <div>
    <div>
      <GoogleMap className={"mapcontainer"} 
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        mapTypeId={"hybrid"}
        id="mapContainer"
      >
        {/* { popoverOpen ? <MarkerCard popOver={popOver}/> : ""} */}
      
        {allMarks()}
      </GoogleMap>
      <Grid style={{
        position: 'absolute',
        top: '175%',
        left: '93%'
      }}>
        <Tooltip title="down" aria-label="add">
          <Fab color="primary" className={classes.fab}>
            <Link to="cardlist" smooth={true} duration={100}><ArrowDownwardIcon></ArrowDownwardIcon></Link>
          </Fab>
        </Tooltip>
      </Grid>
      <Grid style={{
        position: 'absolute',
        top: '125%',
        left: '93%'
      }}>
        <Tooltip title="up" aria-label="add">
          <Fab color="primary" className={classes.fab}>
            <Link to="header" smooth={true} duration={100}><ArrowUpwardIcon></ArrowUpwardIcon></Link>
          </Fab>
        </Tooltip>
      </Grid>
    </div>
    </div>
  ) : (
    <p>No map</p>
  );
}

export default memo(MapContainer);
