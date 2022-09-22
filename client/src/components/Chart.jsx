import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components/macro';
import axios from 'axios';
import Select from 'react-select';
import PropTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Container = styled.div`
  margin-top: 60px;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
`;

const Space = styled.div`
  margin-top: 2px;
  margin-bottom: 20px;
`;

const Chart = ({ selectedThing }) => {
  // const [selector, setSelector] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/temperature', {
      params: {
        thingName: selectedThing,
      },
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  const dataLine = {
    labels: data.map(({ date }) => date.substring(11, 19).replace('T', '/')),
    datasets: [
      {
        label: 'Temperature',
        data: data.map(({ temperature }) => temperature),
        borderColor: '#ffe7c2',
        backgroundColor: '#fcb344',
      },
      {
        label: 'Light',
        data: data.map(({ light }) => light),
        borderColor: '#ffe7c2',
        backgroundColor: '#fcb344',
      },
      {
        label: 'Humidity',
        data: data.map(({ humidity }) => humidity),
        borderColor: '#f4fdfd',
        backgroundColor: '#9de5f7',
      },
    ],
  };

  const options = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '100000000', label: 'Tutti' },
  ];
  const [selectedOption, setSelectedOption] = useState({ value: '10', label: '10' });

  useEffect(() => {
    axios.get('/temperature', {
      params: {
        product: selectedOption.value,
        thingName: selectedThing,
      },
    })
      .then((res) => {
        setData(res.data);
      });
    //  console.log(data);
  }, [selectedOption, selectedThing]);

  return (
    <Container>
      <Select
        defaultValue={selectedOption.value}
        onChange={setSelectedOption}
        options={options}
      />
      <Space />
      <Line data={dataLine} />
      <Space />
    </Container>
  );
};

Chart.propTypes = {
  selectedThing: PropTypes.string.isRequired,
};
export default Chart;
