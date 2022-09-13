/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components/macro';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import React from 'react';
import Header from './Header';
import Event from './bit/Events';
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

const ThingManager = () => {
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
  } = useForm({ shouldUseNativeValidation: true });
  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
  } = useForm({ shouldUseNativeValidation: true });
  const onSubmitNameThingCreation = async (data) => {
    // send thing name to server
    console.log('Thing Selezionata creazione');
    console.log(data);
    axios.get('/richiesta_info_thing', {
      params: {
        thingName: data.thingNameSearch,
      },
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
    });
  };
  return (
    <Container>
      <Header />
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
      <Event />
    </Container>
  );
};

export default ThingManager;
