import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyCard from './MyCard';
import AddRouteModal from './AddRouteModal';
import { useDispatch, useSelector } from 'react-redux';
import { axiosMyCards } from '../../../store/myCardsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '1000px',
    minHeight: '500px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    overflow: 'hidden',
    flexGrow: 1,
    padding: 10,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    height: 200,
    marginBottom: 20
  },
  rmodal: {
    height: 200,
    marginBottom: 20
  }
}));

export default function RoutesContainer() {

  const dispatch = useDispatch()
  const myCards = useSelector(state => state.myCards.myCards);
  
  const cards = useSelector(state => state.cards.cards);
  console.log("----->", myCards);
  React.useEffect(() => {
    dispatch(axiosMyCards());
  }, [myCards.length]);


  const classes = useStyles();
  return (
    <div  className={classes.root}>
        <AddRouteModal className={classes.rmodal}/>
      {myCards.map((card) => <MyCard className={classes.card} url={card.url} lat={card.lat} lng={card.lng} id={card.id} key={card.id} title={card.title} difficulty={card.difficulty} rating={card.rating} address={card.address} length={card.length} description={card.description}/>)}
    </div>
  );
}






