import React from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';
import axios from 'axios';
import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from './components/Home';
import Selection from './components/Selection';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    transition: all 0.25s;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    height: 100%;
    background-color: #D8F7FC;
  } 
`;

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const App = () => (
  <Container>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <Home />
          }
        />
        <Route
          path="/selection"
          element={
            <Selection />
          }
        />
        <Route
          path="/richiesta_info_thing"
          element={
            <Selection />
          }
        />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  </Container>
);

export default App;
