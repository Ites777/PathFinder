import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { axiosMyCards, updateMyCard } from '../../../store/myCardsSlice';

export default function UpdateRouteForm(props) {

  const {
    id,
    title,
    difficulty,
    address,
    length,
    description,
    lat,
    lng,
    handleClose,
    open
  } = props

  const dispatch = useDispatch()
  const myCards = useSelector(state => state.myCards.myCards);

  
  const [titleState, setTitle] = React.useState(title);
  const [difficultyState, setDifficulty] = React.useState(difficulty);
  const [addressState, setAddress] = React.useState(address);
  const [lengthState, setLength] = React.useState(length);
  const [descriptionState, setDescription] = React.useState(description);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios.patch("/routes", {  
      id,
      title: titleState,
      length: lengthState,
      difficulty: difficultyState,
      address: addressState,
      description: descriptionState,
      lat: lat,
      lng: lng,
    }).then((res) => {
      dispatch(updateMyCard(myCards, {
        title: res.data.title,
        length: res.data.length,
        difficulty: res.data.difficulty,
        address: res.data.address,
        description: res.data.description,
        lat: res.data.lat,
        lng: res.data.lng,
        id: id,
      }))
      dispatch(axiosMyCards());
    });
    handleClose()
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: 'success.main' }}>
          <EmojiFlagsIcon />
        </Avatar>
        <br/>
        <Typography component="h1" variant="h5">
        Введите новые данные:
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            value={titleState}
            onChange={(e)=>setTitle(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="text"
            label="Название маршрута"
            name="title"
            autoFocus
          />
          <TextField
            value={descriptionState}
            onChange={(e)=>setDescription(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="description"
            label="Описание маршрута"
            type="text"
            id="description"
          />
          <TextField
            value={lengthState}
            onChange={(e)=>setLength(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="length"
            label="Расстояние до цели(км)"
            type="text"
            id="length"
          />
          <TextField
            value={difficultyState}
            onChange={(e)=>setDifficulty(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="difficulty"
            label="Сложность маршрута"
            type="text"
            id="difficulty"
          />
          <TextField
            value={addressState}
            onChange={(e)=>setAddress(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="address"
            label="Локация"
            type="text"
            id="address"
          />
          <br/>
          {/* Установите маркер */}
          <TextField
            value={lat}
            margin="normal"
            required
            fullWidth
            name="latitude"
            label="Широта"
            type="text"
            id="latitude"
          />
          <TextField
            value={lng}
            margin="normal"
            required
            fullWidth
            name="longitude"
            label="Долгота"
            type="text"
            id="longitude"
          />
          <Button type="submit" color="primary" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Подтвердить
          </Button>
          <Button type="click" onClick={handleClose} color="secondary" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Отмена
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
