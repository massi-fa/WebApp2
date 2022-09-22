/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components/macro';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import React from 'react';
import Header from './Header';
import Event from './bit/Events';

import tools from '../res/tools.svg';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20rem;
`;

const InputText = styled.input`
  background-color: white;
  height: 2rem;
  width: 80%;
  border: 2px solid;
  border-radius: 10px;
  text-align: center;
  padding: 5px;
`;

const InputButton = styled.button`
  background-color: white;
  outline: none;
  border: none;
  background-color: transparent;
`;

const ButtonImg = styled.img`
  height: 2rem;
`;

const ContainerResponsive = styled.div`
  /*@media only screen and (min-width: 900px) {
    display: flex;
    flex-direction: row;
    margin: 60px auto;
  };*/
`;
const Text = styled.h1`
  
`;
const ContainerUp = styled.div`

`;

const ThingManager = () => {
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
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
  return (
    <Container>
      <Header />
      <ContainerResponsive>
        <ContainerUp>
          <Text>Crea una nuova Thing</Text>
          <Form onSubmit={handleSubmitSearch(onSubmitNameThingCreation)} id="myfrom">
            <InputText
              type="text"
              name="thingNameSearch"
              placeholder="Inserire nome della nuova thing"
              {...registerSearch('thingNameSearch', { required: 'Please enter your first name.' })} // custom message
            />
            <InputButton type="submit">
              <ButtonImg src={tools} />
            </InputButton>
          </Form>
        </ContainerUp>
        <Event />
      </ContainerResponsive>
    </Container>
  );
};

export default ThingManager;
