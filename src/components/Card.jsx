import React from 'react'

const Card = ({smallCaseInfo, selectedSort}) => {
 
  function calculateCAGR(returnDecimal, years) {
    return Math.pow(1 + returnDecimal, 1 / years) - 1;
  }
  
  // Function to format a number as a percentage with two decimal places
  function formatAsPercentage(decimal) {
    return (decimal * 100).toFixed(2) + '%';
  }
// Mapping of return types to their respective periods and durations
const returnPeriods = {
  '1M': { period: 'monthly', years: 1 / 12 },
  '6M': { period: 'halfyearly', years: 6 / 12 },
  '1Y': { period: 'yearly', years: 1 },
  '3Y': { period: 'threeYear', years: 3 },
  '5Y': { period: 'fiveYear', years: 5 },
};
  
let cagrDuration = smallCaseInfo.stats.ratios.cagrDuration + ' CAGR';
let cagrPercentage = formatAsPercentage(smallCaseInfo.stats.ratios.cagr);

if (selectedSort.orderBy.status) {
  const returnsType = selectedSort.sortBy;
  const returnPeriod = returnPeriods[returnsType];

  if (returnPeriod) {
    cagrDuration = `${returnsType} ${returnsType.includes('M') ? 'Returns' : 'CAGR'}`;
    const returnDecimal = smallCaseInfo.stats.returns[returnPeriod.period];
    if(returnsType.includes('M')) {
      cagrPercentage = formatAsPercentage(returnDecimal)
    } 
    else {
    const cagr = calculateCAGR(returnDecimal, returnPeriod.years);
    cagrPercentage = formatAsPercentage(cagr);
    }
  } 
  else {
    console.error('Invalid returnsType');
  }
}


 const imageLink = `https://assets.smallcase.com/images/smallcases/160/${smallCaseInfo.scid}.png`;
  const title = smallCaseInfo.info.name.substring(0,25) + '...';
  const subscriptionType = smallCaseInfo.flags.private;
  const shortDescription = smallCaseInfo.info.shortDescription.substring(0, 60) + '...';
  const publisherName = smallCaseInfo.info.publisherName;
  const minInvestAmount = smallCaseInfo.stats.minInvestAmount;
  let riskLabel = smallCaseInfo.stats.ratios.riskLabel;
  let volatilityImages =   {'Low Volatility' : './src/images/low.webp',
    'Medium Volatility' : './src/images/med.png',
    'High Volatility' : './src/images/high.webp'
   };

const volImage = volatilityImages[riskLabel];   

    riskLabel = riskLabel === 'Medium Volatility' ? 'Med. Volatility' : riskLabel;                      

  return (
    <div className='border-b cursor-pointer border-gray-300 hover:border-gray-300 hover:shadow-md flex flex-row  items-center gap-x-8 p-4 w-[100%] group'>

      <div className="flex gap-x-8 justify-start w-[50%]">
      <img src = {imageLink} className='logo w-16 h-16 rounded-xs'/>
      <div>
    <div className='flex gap-x-2 justify-start items-center'>
    <h2 className="card-title group-hover:text-blue-500">{title}</h2>
    <p className='bg-gray-100 px-1 py-0.5 text-xs font-bold rounded-xs text-blue-500 ml-2'>{!subscriptionType ? 'Free Access' : ''}</p>
    </div>
    <p className='py-1 text-gray-700 text-[0.98rem]'>{shortDescription}</p>
     <p className='opacity-50 text-[0.98rem]'>by {publisherName}</p>
  </div>
  </div>

  <div className='flex gap-x-8 justify-center items-center '>
  <div className='min-amount'>
   <p className='opacity-50'>Min. Amount</p>
   <p className='font-bold'>₹ {minInvestAmount}</p>
  </div>

  <div className='years'>
   <p className='opacity-50'>{cagrDuration}</p>
   <p className='font-bold text-green-500'>{cagrPercentage}</p>
  </div>

  <p className='border rounded-xs pr-4 text-[0.9rem] text-gray-600 border-gray-300 flex items-center justify-center'> <img src = {volImage}/>{riskLabel}</p>

</div>

</div>

  )
}

export default Card