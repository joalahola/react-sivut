
import React, { useState, useEffect } from 'react'
import CoinGecko from 'coingecko-api'
import Filter from './components/Filter'
import InputField from './components/InputField'



const App = () => {

  const [data, setData]= useState([]) 
  const [startDate, setStartDate]= useState("2020-01-01") // vakiopaivamaara
  const [EndDate, setEndDate]= useState("2020-12-31")     // vakiopaivamaara
  


/* Tapahtumankasittelija ensimmaiselle inputfieldille */
const handleFilterChange = (Event) => {
  setStartDate(Event.target.value)
}

/* Tapahtumankasittelija toiselle inputfieldille */
const handleEndChange = (Event) => {
  setEndDate(Event.target.value)
}

   
useEffect(() => {
  const CoinGeckoClient = new CoinGecko();
 
  let loppu = new Date().getTime()  
  
  CoinGeckoClient
  .coins.fetchMarketChartRange('bitcoin', {
    vs_currency: 'eur',
    from: 0 ,
    to: loppu + 3600
  })
  .then(response => {
   
    setData(response.data)
  })
}, [])

  

return (
  <div> 
    <h1>
      A small work
    </h1>
   <h2>Here you can see some information about the price of bitcoin</h2>
    <div>Please input start and end date</div>
  <InputField value = {startDate} onChange ={handleFilterChange} description = {'start date'}/>
  <InputField value = {EndDate} onChange ={handleEndChange} description = {'end date'}/>
  <Filter startDate = {startDate} endDate= {EndDate} array = {data} />
  </div>
)

}
export default App