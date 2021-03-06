import React, { useState,useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css'

const Chart = ({ data: { confirmed, recovered, deaths },country }) => {
  const [ dailyData,setDailyData ] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setDailyData(await fetchDailyData());
    }

    fetchApi();
  },[])

  const lineChart = (
    dailyData.length
    ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [{
          data: dailyData.map(({ confirmed }) => confirmed),
          label: 'Infected',
          borderColor: 'rgba(86,163,166,1)',
          fill: true,
        },{
          data: dailyData.map(({ deaths }) => deaths),
          label: 'Deaths',
          borderColor: 'red',
          backgroundColor: 'rgba(254,95,85,0.5)',
          fill: true,
        }]
      }}
    />) : null
  );

const barChart = (
  confirmed
  ?(
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: ['rgba(86,163,166,1)', 'rgba(149,191,116,0.5)', 'rgba(254,95,85,0.5)',],
          data: [ confirmed.value, recovered.value, deaths.value ]
        }]
      }}
      options={{
        legend: {display:false},
        title: {display:true, text: `Current State in ${country}`},
      }}
    />
  ) : null
);
  return (
    <div className={styles.container}>
      {country? barChart : lineChart}
    </div>
  )
}

export default Chart;
