import React, { useState } from 'react'
import '../App.css'

function TableRow({data}) {
  const heading=["Coin Symbol","Name",'Abbreviation','Current Price','Price Change % in 24H','MarketCap','% change in MarketCap','Supply Units'];
  const [search,setSearch]=useState('');
  const [active,setActive]=useState([false,false,false,false,false]);
 
  let newData;
  const handleSearch=(e)=>setSearch(e.target.value);

 if(data)newData=data.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase().trim()) || item.symbol.toLowerCase().includes(search.toLowerCase().trim()));
  
 if(data)newData.sort((a,b)=>{
if(active[0]){
  return a.market_cap-b.market_cap;
}else if(active[1]){
  return a.price_change_percentage_24h-b.price_change_percentage_24h;
}else if(active[2]){
return a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h;
}else if(active[3]){
return a.total_supply - b.total_supply;
}else if(active[4]){
  return a.current_price-b.current_price;
}else{
  return a.name.localeCompare(b.name);
}});

  const handleSort=(check)=>{
if (check==='mktcap') {
  setActive(active=>[!active[0],false,false,false,false]);
}else if(check==='percentage'){
  setActive(active=>[false,!active[1],false,false,false]);
}else if(check==='mktcap-percent'){
  setActive(active=>[false,false,!active[2],false,false]);
}else if(check==='supply'){
  setActive(active=>[false,false,false,!active[3],false]);
}else{
  setActive(active=>[false,false,false,false,!active[4]]);
}
  }

  return (
   <>
   <div className='filter-input'><input onChange={handleSearch} type='text' placeholder='Search by Name or Symbol' value={search} /></div>
      <div className='filter'>
        <button onClick={()=>handleSort('price')} className={active[4]?'active btn':'btn'}>Sort by Price</button>
        <button onClick={()=>handleSort('percentage')} className={active[1]?'active btn':'btn'}>Sort by change Price%</button>
        <button onClick={()=>handleSort('mktcap')} className={active[0]?'active btn':'btn'}>Sort by MarketCap</button>
        <button onClick={()=>handleSort('mktcap-percent')} className={active[2]?'active btn':'btn'}>Sort by change Marketcap%</button>
        <button onClick={()=>handleSort('supply')} className={active[3]?'active btn':'btn'}>Sort by Supply units</button>
      </div>

      <div id='table-wrapper'>
        <table>
  <thead>
    <tr>{heading.map((item,i)=><th key={'heading'+i}>{item}</th>)}</tr>
  </thead>
  {!data && <p>Loading...</p>}
  {data && <tbody>
  {newData.map((item,i)=><tr key={'coin'+i}>
    <td><img src={item.image} style={{width:'2rem',height:'2rem'}} alt='coin-img' /></td>
    <td>{item.name}</td>
    <td>{item.symbol}</td>
    <td>${item.current_price}</td>
    <td className={item.price_change_percentage_24h>0?'green':'red'}>{item.price_change_percentage_24h}%</td>
    <td>${item.market_cap}</td>
    <td className={item.market_cap_change_percentage_24h>0?'green':'red'}>{item.market_cap_change_percentage_24h}%</td>
    <td>{item.total_supply} units</td>
  </tr>)}
  </tbody>}
  </table>
  </div>
   </>
  )
}

export default TableRow