/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';
import { useForm } from 'react-hook-form';

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
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
  } = useForm({ shouldUseNativeValidation: true });

  const onSubmitNameThing = async (data) => {
    // send thing name to server
    console.log('Thing Selezionata');
    console.log(data);
    axios.get('/richiesta_info_thing', {
      params: {
        thingName: data.thingNameSearch,
      },
    });
  };
  return (
    <Container>
      <p> Pagina testing creazione things</p>
      <form onSubmit={handleSubmitSearch(onSubmitNameThing)}>
        <input
          type="text"
          name="thingNameSearch"
          placeholder="Inserire nome della nuuova thing"
          {...registerSearch('thingNameSearch', { required: 'Please enter your first name.' })} // custom message
        />
        <input type="submit" />
      </form>
      <Space />
      <Space />
      <Space />
      <Space />
      <Space />
      <Space />
      <Space />
      <Space />
    </Container>
  );
};

export default Selection;
