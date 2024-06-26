import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import chartData from '../data/chartData.json';
import { format, subMonths, subWeeks, subDays } from 'date-fns';

const Chart: React.FC = () => {
  const [data, setData] = useState(chartData);
  const [timeframe, setTimeframe] = useState('daily');

  useEffect(() => {
    const now = new Date();
    let filteredData;
    
    if (timeframe === 'daily') {
      filteredData = chartData.filter(d => new Date(d.timestamp) > subDays(now, 1));
    } else if (timeframe === 'weekly') {
      filteredData = chartData.filter(d => new Date(d.timestamp) > subWeeks(now, 1));
    } else if (timeframe === 'monthly') {
      filteredData = chartData.filter(d => new Date(d.timestamp) > subMonths(now, 1));
    } else {
      filteredData = chartData;
    }

    setData(filteredData);
  }, [timeframe]);

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };

  const handleDataPointClick = (dataPoint: any) => {
    alert(`Timestamp: ${dataPoint.timestamp}\nValue: ${dataPoint.value}`);
  };

  return (
    <div>
      <div className="timeframe-buttons">
        <button onClick={() => handleTimeframeChange('daily')}>Daily</button>
        <button onClick={() => handleTimeframeChange('weekly')}>Weekly</button>
        <button onClick={() => handleTimeframeChange('monthly')}>Monthly</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={timeStr => format(new Date(timeStr), 'MM/dd/yyyy')} />
          <YAxis />
          <Tooltip labelFormatter={timeStr => format(new Date(timeStr), 'MM/dd/yyyy')} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ onClick: handleDataPointClick }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
