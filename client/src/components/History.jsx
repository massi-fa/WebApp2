/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components/macro';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Header from './Header';

const textRed = {
  color: 'red',
};
const textGre = {
  color: 'green',
};
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
const Text = styled.h1`
  font-size: 1.3rem;
  margin: 15px;
  text-align: center;
`;

const History = () => {
  const [data, setData] = useState([]);
  const onRequestHistory = () => {
    // send thing name to server
    // console.log('Thing trovate');
    axios.get('/get_history', {
    }).then((res) => {
      setData(res.data.map((x) => x.text).reverse());
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
      <Text>History Things</Text>
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
                    {t.includes('Inserita') ? <ListItemText primary={t} primaryTypographyProps={{ style: textGre }} /> : <ListItemText primary={t} primaryTypographyProps={{ style: textRed }} />}
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
