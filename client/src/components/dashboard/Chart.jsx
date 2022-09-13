import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from './Title';

function formatData(data, index, target) {
  const time = data.date.substring(11, 19).replace('T', '/');
  if (target === 'temperature') {
    return { time, amount: data.temperature };
  }
  if (target === 'humidity') {
    return { time, amount: data.humidity };
  }
  return { time, amount: data.light };
}
const Chart = ({ data, target }) => {
  // handlers per i dati
  const [data2, setData2] = React.useState([]);
  const theme = useTheme();
  React.useEffect(() => {
    setData2(data.map((d, index) => formatData(d, index, target)));
  }, [data]);

  return (
    <>
      <Title>{ target }</Title>
      <ResponsiveContainer>
        <LineChart
          data={data2}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Value
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
Chart.propTypes = {
  data: PropTypes.isRequired,
  target: PropTypes.isRequired,
};
export default Chart;
