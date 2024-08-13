import React, { useEffect, useState } from 'react'
import './App.css'
import TableRow from './components/TableRow';

function App() {
  const [data,setData]=useState();

   useEffect(()=>{
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false').then((res)=>res.json()).then((datavalue)=>{
  console.log(datavalue);
  setData(datavalue);
}).catch((e)=>console.log(e));
  },[]);

  return (
    <div id='main'>
      <h1>Coin Data</h1>
      <TableRow data={data}/>
    </div>
  )
}

export default App