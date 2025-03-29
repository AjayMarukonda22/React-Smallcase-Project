import React, { useState } from 'react';

const Filters = ({ filters, updateFilters, investmentStrategies, activeFiltersCount, clearAllFilters}) => {
  
  let volatilityFilters = [{level : 'Low', image : './src/images/low.webp'}, 
                           {level : 'Medium', image : './src/images/med.png'},
                           {level : 'High', image : './src/images/high.webp'}]

  const { subscriptionType, investmentAmount, volatility, launchDate, investmentStrategiesSet } = filters;

 function handleSubscriptionTypeChange(filterValue) {
        updateFilters('subscriptionType', filterValue);
 }
  
 function handleInvestmentAmountChange(e) {
    const {value} = e.target;
  updateFilters('investmentAmount', value);
 }

 function handleVolatilityChange(filtervalue) {
        updateFilters('volatility' , filtervalue);
 }
 function handleLaunchDate() {
    let toggleDate = !launchDate;
  updateFilters('launchDate', toggleDate);
 }

 function handleInvestmentStrategies (strategy) {
         updateFilters('investmentStrategiesSet', strategy);
 }

  return (
    <div className='filters  w-60 flex flex-col gap-y-6 text-gray-500'>
      <header className='flex justify-between font-bold border-b border-gray-300 py-4'>
        <p className=''>Filters <span className='bg-gray-300 px-2 py-1 rounded-xs'>{activeFiltersCount}</span></p>
        <p className={`${activeFiltersCount > 0 ? 'text-blue-500 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`} onClick={() => clearAllFilters()}>Clear All</p>
      </header>
      {/* Subscription Type Section */}
      <div className='subscriptionType flex flex-col gap-y-4'>
    <p className='font-bold'>Subscription Type</p>
    <div className='types border flex font-medium'>
      {['Show all', 'Free access', 'Fee based'].map((option) => (
        <p
          key={option}
          className={`cursor-pointer hover:bg-gray-100 p-2 flex items-center justify-center ${
            subscriptionType === option ? 'bg-blue-100 border border-blue-500 text-blue-500' : ''
          }`}
          onClick={() => handleSubscriptionTypeChange(option)}
        >
          {option}
        </p>
      ))}
    </div>
  </div>

      {/* Investment Amount Section */}
      <div className='investmentAmount'>
        <p className='font-bold mb-2'>Investment Amount</p>
        <ul className=' flex flex-col gap-y-2 text-[1rem]'>
          {['Any', 'Under ₹ 5,000', 'Under ₹ 25,000', 'Under ₹ 50,000'].map((amount) => (
            <li key={amount} className='cursor-pointer'>
              <label className='flex gap-x-2 hover:bg-gray-100 items-center'>
                <input
                  type="radio"
                  name="investmentAmount"
                  value={amount}
                  checked={investmentAmount === amount}
                  onChange={handleInvestmentAmountChange}
                  className="appearance-none w-4 h-4 border-1 border-gray-300 rounded-full checked:border-blue-600 checked:border-5"
                />
                <p>{amount}</p>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Volatility Section */}
      <div className='Volatility flex flex-col gap-y-2'>
    <p className='font-bold'>Volatility</p>
    <div className='types flex gap-x-2 py-2 font-semibold'>
      {volatilityFilters.map((volatilityType) => {
        const volatilityLabel = `${volatilityType.level} Volatility`;
        const isSelected = volatility.has(volatilityLabel);
        return (
          <p
            key={volatilityLabel}
            className={`cursor-pointer hover:bg-gray-100 border px-4 rounded-box ${
              isSelected ? 'border-2 border-blue-500 text-blue-500' : 'border-gray-300'
            }`}
            onClick={() => handleVolatilityChange(volatilityLabel)}
          > <img src = {volatilityType.image}/>
            {volatilityType.level === 'Medium' ? 'Med' : volatilityType.level}
          </p>
        );
      })}
    </div>
  </div>

      {/* Launch date Section */}
      <div className='launch-date'>
        <p className='font-bold'> Launch Date</p>
        <label className='flex gap-x-2 mt-1 items-center cursor-pointer hover:bg-gray-100'>
          <input  type = 'checkbox' className=' border-1 h-4 w-4 border-gray-100' name = 'launchDate' checked = {launchDate} onChange={handleLaunchDate}  />
          <p>Include new smallcases</p>
        </label>
      </div>

      {/* Investment strategy Section */}
      <div className='investmentStrategy'>
         <p className='font-bold'>Investment Strategy</p>
         <ul className='flex flex-col gap-y-2'>
           {[...investmentStrategies].map((strategy) => {
              return <li key = {strategy} >
                 <label className='flex gap-x-2 mt-1 items-center cursor-pointer hover:bg-gray-100'>
                <input  type = 'checkbox'  className=' border-1 h-4 w-4 border-gray-100' value = {strategy} checked = {investmentStrategiesSet.has(strategy)} onChange={ () => handleInvestmentStrategies(strategy)}/>
               <p>{strategy}</p>
                 </label>
              </li>
           })}
         </ul>
      </div>
    </div>
  );
};

export default Filters;
