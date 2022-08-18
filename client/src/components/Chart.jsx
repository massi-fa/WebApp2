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
  margin-top: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
`;

const Space = styled.div`
  margin-top: 2px;
  margin-bottom: 20px;
`;

const Chart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('/temperature')
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const dataLineT = {
    labels: data.map(({ date }) => date.substring(11, 19).replace('T', '/')),
    datasets: [
      {
        label: 'Temperature',
        data: data.map(({ temperature }) => temperature),
        borderColor: '#ffe7c2',
        backgroundColor: '#fcb344',
      },
    ],
  };

  const dataLineH = {
    labels: data.map(({ date }) => date.substring(11, 19).replace('T', '/')),
    datasets: [
      {
        label: 'Humidity',
        data: data.map(({ humidity }) => humidity),
        borderColor: '#f4fdfd',
        backgroundColor: '#9de5f7',
      },
    ],
  };

  return (
    <Container>
      <Line data={dataLineT} />
      <Space />
      <Line data={dataLineH} />
    </Container>
  );
};

export default Chart;
