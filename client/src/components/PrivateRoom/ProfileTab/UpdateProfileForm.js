import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios';

export default function UpdateProfileForm(props) {

  const {
    email,
    firstName,
    lastName,
    id
  } = localStorage;

  const [emailState, setEmail] = React.useState(email);
  const [firstNameState, setFirstName] = React.useState(firstName);
  const [lastNameState, setLastName] = React.useState(lastName);


  const {
    setProfile,
    handleClose
  } = props


  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    // eslint-disable-next-line no-console
    axios.patch("/user", {  
      email: data.get('email'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      id: id
    }).then((res) => {
      localStorage.setItem('firstName', res.data.firstName)
      localStorage.setItem('lastName', res.data.lastName)
      localStorage.setItem('email', res.data.email)
      setProfile({firstName:res.data.firstName, lastName:res.data.lastName, email:res.data.email,})
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
            value={emailState}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            value={firstNameState}
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="Имя"
            type="text"
            id="firstName"
            onChange={(e)=>setFirstName(e.target.value)}
          />
          <TextField
            value={lastNameState}
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Фамилия"
            type="text"
            id="lastName"
            onChange={(e)=>setLastName(e.target.value)}
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
