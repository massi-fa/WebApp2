/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components/macro';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import StateCard from './bit/StateCard';
import Chart from './Chart';
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
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
  } = useForm({ shouldUseNativeValidation: true });
  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
  } = useForm({ shouldUseNativeValidation: true });
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
  const onSubmitNameThingCreation = async (data) => {
    // send thing name to server
    console.log('Thing Selezionata creazione');
    console.log(data);
    axios.get('/richiesta_info_thing', {
      params: {
        thingName: data.thingNameSearch,
      },
    }).then(() => {
      onRequestNameThings();
    });
  };
  const onSubmitNameThingDelete = async (data) => {
    // send thing name to server
    console.log('Thing Selezionata distruzione');
    console.log(data);
    axios.get('/richiesta_info_thing_delete', {
      params: {
        thingName: data.thingNameDelete,
      },
    }).then(() => {
      onRequestNameThings();
    });
  };

  const [selectedOption, setSelectedOption] = useState({ value: '', label: 'Nessuna Thing selezionata' });
  useEffect(() => {
    if (thingNames.length === 0) {
      onRequestNameThings();
    }
  }, [thingNames]);
  return (
    <Container>
      <p>Creazione thing dato un nome</p>
      <form onSubmit={handleSubmitSearch(onSubmitNameThingCreation)}>
        <input
          type="text"
          name="thingNameSearch"
          placeholder="Inserire nome della nuova thing"
          {...registerSearch('thingNameSearch', { required: 'Please enter your first name.' })} // custom message
        />
        <input type="submit" />
      </form>
      <Space />
      <p>Eliminazione thing dato un nome</p>
      <form onSubmit={handleSubmitDelete(onSubmitNameThingDelete)}>
        <input
          type="text"
          name="thingNameDelete"
          placeholder="Inserire nome della thing da rimuovere"
          {...registerDelete('thingNameDelete', { required: 'Please enter your first name.' })} // custom message
        />
        <input type="submit" />
      </form>
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
