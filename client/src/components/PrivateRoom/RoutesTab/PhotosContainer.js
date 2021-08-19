import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import MyPhoto from './MyPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { axiosGallery } from '../../../store/gallerySlice';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  myContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function PhotosContainer() {

  const dispatch = useDispatch()
  const myPhotos = useSelector(state => state.gallery.photo);

  React.useEffect(() => {
    dispatch(axiosGallery());
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Photo:</ListSubheader>
        </ImageListItem>
        {myPhotos.map((item) => (
          <ImageListItem key={item.id}>
            <img src={item.original} />
            <ImageListItemBar
              title='title'
              subtitle={<span>by: {item.user_id}</span>}
              actionIcon={
                <IconButton aria-label={`info about`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  )
}
