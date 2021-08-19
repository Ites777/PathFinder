import  React, {useCallback} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { addMyCard, axiosMyCards } from "../../../store/myCardsSlice";
import {useParams} from 'react-router-dom'
import { useDropzone } from "react-dropzone";

import axios from "axios";
import { Accordion, Card } from "react-bootstrap";

const formData = new FormData

function MyDropzone() {
  const { id } = useParams();
  const userId = localStorage.id
  const onDrop = useCallback((acceptedFiles) => {
    formData.append("333", acceptedFiles[0]);
    formData.append("user_id", userId);
    formData.append("routes_id", id);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Card >
        <Card.Body>Кладите сюда</Card.Body>
      </Card>
      ) : (
        <Card>
          <Card.Body >Перетащите сюда или кликните для добавления фото</Card.Body>
        </Card>
      )}
    </div>
  );
}

export default function AddRouteForm(props) {
  const { lat, lng, handleClose } = props;

  const dispatch = useDispatch();
  const myCards = useSelector((state) => state.myCards.myCards);


  React.useEffect(() => {
    // console.log(myCards);
    dispatch(axiosMyCards());
  }, [myCards.length]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    formData.append('title', data.get("title"))
    formData.append('length', data.get("length"))
    formData.append('difficulty', data.get("difficulty"))
    formData.append('address', data.get("address"))
    formData.append('description', data.get("description"))
    formData.append('lat', lat)
    formData.append('lng', lng)
    formData.append('userId',localStorage.id)
    axios
      .post("/routes", formData)
      .then((res) => {
        console.log(res.data);
        dispatch(
          addMyCard({
            title: data.get("title"),
            length: data.get("length"),
            difficulty: data.get("difficulty"),
            address: data.get("address"),
            description: data.get("description"),
            lat: lat,
            lng: lng,
            url: res.url
          })
        );
      });
    handleClose();
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "success.main" }}>
          <EmojiFlagsIcon />
        </Avatar>
        {/* <br /> */}
        <Typography component="h1" variant="h5">
          Новый маршрут*
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="text"
            label="Название маршрута"
            name="title"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Описание маршрута"
            type="text"
            id="description"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="length"
            label="Расстояние до цели(км)"
            type="text"
            id="length"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="difficulty"
            label="Сложность маршрута"
            type="text"
            id="difficulty"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Локация"
            type="text"
            id="address"
          />
          <MyDropzone />
          {/* <Accordion
            // onMouseMove={(e) => handler()}
            style={{ marginBottom: "20px" }}
          > 
            <Accordion.Item eventKey="0">
              <Accordion.Header>Добавить свое фото</Accordion.Header>
              <Accordion.Body>
                
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
       
          {/* Установите маркер */}
          <TextField
            value={lng}
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
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Добавить маршрут
          </Button>
          <Button
            type="click"
            onClick={handleClose}
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Отмена
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
