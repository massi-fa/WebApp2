import * as React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const InsertThing = () => {
  const onSubmitNameThingCreation = async (data) => {
    // send thing name to server
    console.log('Thing Selezionata creazione');
    console.log(data);
    axios.get('/richiesta_info_thing', {
      params: {
        thingName: data,
      },
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      thing: data.get('thing'),
      proprietarioThing: data.get('proprietarioThing'),
    });
    onSubmitNameThingCreation(data.get('thing'));
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inserisci dati Thing da creare
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="thing"
              label="Inserire nome della thing"
              name="thing"
              autoComplete="thing"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="proprietarioThing"
              label="Inserire proprietario della thing"
              type="proprietarioThing"
              id="proprietarioThing"
              autoComplete="current-proprietarioThing"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                alert('Richiesta effettuata');
              }}
            >
              Conferma
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default InsertThing;
