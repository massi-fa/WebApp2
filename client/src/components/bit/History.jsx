/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components/macro';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Header from '../Header';

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

const History = () => {
  const [data, setData] = useState([]);
  const onRequestHistory = () => {
    // send thing name to server
    // console.log('Thing trovate');
    axios.get('/get_history', {
    }).then((res) => {
      setData(res.data.map((x) => x.text));
      console.log(res.data.map((x) => x.text));
    });
  };

  useEffect(() => {
    if (data.length === 0) {
      onRequestHistory();
    }
  }, [data]);
  return (
    <Container>
      <Header />
      <Space />
      <ScrollableDiv>
        <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders" />
          {
            (
              data.map((t) => (
                <ListItem
                  disablePadding
                  key={t}
                >
                  <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                    <ListItemText primary={t} />
                  </Box>
                </ListItem>
              ))
            )
          }
        </Box>
      </ScrollableDiv>
    </Container>
  );
};

export default History;
