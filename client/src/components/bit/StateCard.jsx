import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
// import PropTypes from 'prop-types';
import axios from 'axios';
import PropTypes from 'prop-types';

import sun from '../../res/sun.svg';
import humLogo from '../../res/humidityLogo.svg';
import tempLogo from '../../res/temperatureLogo.svg';
import lightLogo from '../../res/lightLogo.svg';

import Card from './Card';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    height: 10rem;
    width: 22rem;
    border: 3px solid;
    border-color: #fcdc7b;
    border-radius: 10px;
    padding: 15px;
    background-image: linear-gradient(to right, #fdf4d8, #fdeec1, #fde8aa, #fce293, #fcdc7b);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
`;

const ContainerIcon = styled.div`
    display: flex;
    justify-content: space-between;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
`;

const ContainerStatus = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
`;

const Icon = styled.img`
    width: 6rem;
    margin: auto;
`;

const StateCard = ({ selectedThing }) => {
  const [temp, setTemp] = useState('');
  const [hum, setHum] = useState('');
  const [light, setLight] = useState('');
  useEffect(() => {
    axios.get('/dati', {
      params: {
        thingName: selectedThing,
      },
    }).then((res) => {
      setHum(parseFloat(res.data.humidity).toFixed(2));
      setTemp(parseFloat(res.data.temperature).toFixed(2));
      setLight(parseFloat(res.data.light).toFixed(2));
    });
  }, [selectedThing]);
  return (
    <Container>
      <ContainerIcon>
        <Icon src={sun} />
      </ContainerIcon>
      <ContainerStatus>
        <Card icon={tempLogo} state={temp} bgImg="linear-gradient(to left bottom, #ffe7c2, #ffdaa3, #fece84, #fdc165, #fcb344)" />
        <Card icon={humLogo} state={hum} bgImg="linear-gradient(to left bottom, #f4fdfd, #dff7f9, #caf2f7, #b4ebf6, #9de5f7)" />
        <Card icon={lightLogo} state={light} bgImg="linear-gradient(to left bottom, #ffe7c2, #ffdaa3, #fece84, #fdc165, #fcb344)" />
      </ContainerStatus>
    </Container>
  );
};
StateCard.propTypes = {
  selectedThing: PropTypes.string.isRequired,
};
export default StateCard;
