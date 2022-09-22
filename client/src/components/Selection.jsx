/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components/macro';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import StateCard from './bit/StateCard';
import Chart from './Chart';
import Header from './Header';

import refresh from '../res/refresh.svg';

const ContainerSettings = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
  z-index: 10;
`;

const RefreshContainer = styled.a`
  margin: auto;
  margin-left: 15px;
`;

const RefreshLogo = styled.img`
  width: 1.5rem;
  
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
`;

const ContainerResponsive = styled.div`
  @media only screen and (min-width: 900px) {
    display: flex;
    flex-direction: row;
    margin: 60px auto;
  };
`;

const customStyles = {
  control: (styles) => ({
    ...styles,
    width: '270px',
  }),
  option: (styles) => ({
    ...styles,
    width: '270px',
  }),
  menu: (styles) => ({
    ...styles,
    width: '270px',
  }),

};

const Selection = () => {
  const [thingNames, setThingNames] = useState([]);
  function toCorrectFormat(x) {
    return { value: x, label: x };
  }
  const [selectedOption, setSelectedOption] = useState({ value: '', label: 'Nessuna Thing selezionata' });
  const onRequestNameThings = () => {
    // send thing name to server
    axios.get('/get_lista_things')
      .then((res) => {
        // mapping to scrolling list
        setThingNames(res.data.map((x) => toCorrectFormat(x)));
      });
  };
  useEffect(() => {
    if (thingNames.length === 0) {
      onRequestNameThings();
    }
  }, [thingNames]);

  return (
    <Container>
      <Header />
      <ContainerSettings>
        <Select
          styles={customStyles}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={thingNames}
          menuPortalTarget={document.querySelector('body')}
        />
        <RefreshContainer>
          <RefreshLogo src={refresh} onClick={onRequestNameThings} />
        </RefreshContainer>
      </ContainerSettings>
      <ContainerResponsive>
        {selectedOption.value === '' ? null
          : (
            <>
              <StateCard selectedThing={selectedOption.value} />
              <Chart selectedThing={selectedOption.value} />
            </>
          )}
      </ContainerResponsive>
    </Container>
  );
};

export default Selection;
