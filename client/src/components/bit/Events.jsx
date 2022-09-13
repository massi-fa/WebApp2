/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components/macro';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
// const fs = require('fs');

const Space = styled.div`
  margin-top: 2px;
  margin-bottom: 20px;
`;
const ScrollableDiv = styled.div`
  height: 350px;
  overflow: auto;
  margin: 20px;
  text-align: justify;
  padding: 20px;
`;
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
`;

const Selection = () => {
  const [thingNames, setThingNames] = useState([]);
  const [thingNamesFiltered, setThingNamesFiltered] = useState([]);
  function toCorrectFormat(x) {
    return { value: x, label: x };
  }

  const onRequestNameThings = () => {
    // send thing name to server
    // console.log('Thing trovate');
    axios.get('/get_lista_things')
      .then((res) => {
        // mapping to scrolling list
        setThingNames(res.data.map((x) => toCorrectFormat(x)));
        setThingNamesFiltered(thingNames.map((x) => x.value));
      });
    // console.log(thingNames);
  };

  useEffect(() => {
    if (thingNames.length === 0) {
      onRequestNameThings();
    }
  }, [thingNames]);

  useEffect(() => {
    if (thingNamesFiltered.length === 0) {
      setThingNamesFiltered(thingNames.map((x) => x.value));
    }
  }, [thingNamesFiltered, thingNames]);

  const handleListItemClick = (value, thing) => {
    axios.get('/richiesta_info_thing_delete', {
      params: {
        thingName: thing,
      },
    });
  };

  const handleChangeSearch = (event) => {
    console.log(event.target.value);
    setThingNamesFiltered(thingNames.map((x) => x.value).filter((x) => x.toString().includes(
      event.target.value.toString(),
    )));
  };
  return (
    <Container>
      <Space />
      <p>Refresh lista things salvate</p>
      <button type="button" onClick={onRequestNameThings}>Refresh things</button>
      <TextField
        id="input-with-icon-textfield"
        label="Ricerca Thing"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onChange={handleChangeSearch}
      />
      <ScrollableDiv>
        <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders" />
          {
            (
              thingNamesFiltered.map((t) => (
                <ListItem
                  disablePadding
                  key={t}
                >
                  <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                    <ListItemText primary={t} />
                  </Box>
                  <ListItemButton onClick={(event) => handleListItemClick(event, t)}>
                    <ListItemIcon>
                      <DeleteIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              ))
            )
          }
        </Box>
      </ScrollableDiv>
    </Container>
  );
};

export default Selection;
