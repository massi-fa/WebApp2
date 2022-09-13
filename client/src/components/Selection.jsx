/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components/macro';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import StateCard from './bit/StateCard';
import Chart from './Chart';
import Header from './Header';
// const fs = require('fs');

const Space = styled.div`
  margin-top: 2px;
  margin-bottom: 20px;
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

  function toCorrectFormat(x) {
    return { value: x, label: x };
  }

  const onRequestNameThings = () => {
    // send thing name to server
    console.log('Thing trovate');
    axios.get('/get_lista_things')
      .then((res) => {
        // mapping to scrolling list
        setThingNames(res.data.map((x) => toCorrectFormat(x)));
      });
    console.log(thingNames);
  };

  const [selectedOption, setSelectedOption] = useState({ value: '', label: 'Nessuna Thing selezionata' });
  useEffect(() => {
    if (thingNames.length === 0) {
      onRequestNameThings();
    }
  }, [thingNames]);

  useEffect(() => {
    console.log('blabla');
    console.log(selectedOption);
  }, [selectedOption]);
  return (
    <Container>
      <Header />
      <Space />
      <p>Refresh lista things salvate</p>
      <button type="button" onClick={onRequestNameThings}>Refresh things</button>
      <p>Selezione thing da visualizzare</p>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={thingNames}
      />
      <Space />
      <Space />
      <Space />
      <Space />
      <StateCard selectedThing={selectedOption.value} />
      <Chart selectedThing={selectedOption.value} />
      <Space />
      <Space />
      <Space />
      <Space />
    </Container>
  );
};

export default Selection;
