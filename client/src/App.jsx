import React from 'react';
import styled, { createGlobalStyle } from 'styled-components/macro';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Selection from './components/Selection';
import ThingManager from './components/ThingManager';
import History from './components/History';

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
    width: 100%;
    // background-color: #D8F7FC;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const App = () => (
  <Container>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route
          path="/Dashboard"
          element={
            <Selection />
          }
        />
        <Route
          path="/Manager"
          element={
            <ThingManager />
          }
        />
        <Route
          path="/History"
          element={
            <History />
          }
        />
        <Route path="/" element={<Navigate to="/Dashboard" />} />
      </Routes>
    </Router>
  </Container>
);

export default App;
