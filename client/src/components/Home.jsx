import React from 'react';
import styled from 'styled-components/macro';
// import Card from './bit/Card';

import StateCard from './bit/StateCard';
import Chart from './Chart';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
`;

const Home = () => (
  <Container>
    <StateCard />
    <Chart />
  </Container>
);

export default Home;
