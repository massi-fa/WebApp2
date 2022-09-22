import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
// import PropTypes from 'prop-types';
import axios from 'axios';
import PropTypes from 'prop-types';

import sun from '../../res/sun.svg';
import midsun from '../../res/midsun.svg';
import night from  '../../res/night.svg';
import humLogo from '../../res/humidityLogo.svg';
import tempLogo from '../../res/temperatureLogo.svg';
import lightLogo from '../../res/lightLogo.svg';

import Card from './Card';

const StateIcon = [
  {
    id: 1,
    weatherStatus: 'night',
    icon: night,
    minValue: 2000,
    maxValue: 3000,
  },
  {
    id: 2,
    weatherStatus: 'day',
    icon: sun,
    minValue: 3000,
    maxValue: 5000,
  },
  {
    id: 3,
    weatherStatus: 'mid-day',
    icon: midsun,
    minValue: 4000,
    maxValue: 4000,
  },
];

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    // border: 3px solid;
    // border-color: #fcdc7b;
    border-radius: 10px;
    padding: 15px;
    // background-image: linear-gradient(to right, #fdf4d8, #fdeec1, #fde8aa, #fce293, #fcdc7b);
    // box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
`;

const ContainerIcon = styled.div`
  margin: auto;
`;

const ContainerStatus = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    // box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
`;

const Icon = styled.img`
    width: 9rem;
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
        {StateIcon.filter((icona) => icona.minValue <= light && icona.maxValue >= light ).map((icona) => (
          <Icon src={icona.icon} key={icona.id} />
        ))}
      </ContainerIcon>
      <ContainerStatus>
        <Card icon={tempLogo} state={temp} title="Temperature" unity=" C*" />
        <Card icon={humLogo} state={hum} title="Humidity" unity=" %" />
        <Card icon={lightLogo} state={light} title="Light" unity=" %" />
      </ContainerStatus>
    </Container>
  );
};
StateCard.propTypes = {
  selectedThing: PropTypes.string.isRequired,
};
export default StateCard;
