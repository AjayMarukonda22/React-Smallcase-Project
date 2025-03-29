import React, { useEffect, useState } from 'react'
import Card from './Card'
import Filters from './Filters'
import Navbar from './Navbar'
import Notfound from './Notfound'

const initialFiltersState = {subscriptionType : 'Show all',
                        investmentAmount : 'Any',
                        volatility : new Set(),
                        launchDate : false,
                        investmentStrategiesSet : new Set()
                      }
const initialSortState = {sortBy : 'Popularity',
                     orderBy : {status : false, order : 'High-Low'}
                    }  
                                   

const SmallcaseListings = () => {
    const [smallcases, setSmallCases] = useState([]);
    const [filters, setFilters] = useState(initialFiltersState);
    const [selectedSort, setSelectedSort] = useState(initialSortState);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/smallcases.json');
                const smallCases = await res.json();

                setSmallCases(smallCases.data);

            }
            catch(err) {
                console.log(err);
            }
        }
    fetchData();

    }, []);

    let investmentStrategies = smallcases.reduce((acc, curr) => {
                let investmentStrategyArray = curr.info.investmentStrategy;

                  if(!investmentStrategyArray)
                    return acc;

                for(let strategy of investmentStrategyArray) {
                     acc.add(strategy.displayName);
                }
                return acc;
    }, new Set());


   const updateFilters = (filterName, filterValue) => {
        setFilters((prevFilters) => {
            if(prevFilters[filterName] instanceof Set) {
                let updatedSet = new Set(prevFilters[filterName]);

                if(updatedSet.has(filterValue)) {
                    updatedSet.delete(filterValue)
                }
                else {
                    updatedSet.add(filterValue);
                }
                return {
                    ...prevFilters,
                    [filterName]: updatedSet,
                  };
            }
            else {
                return {
                    ...prevFilters,
                    [filterName]: filterValue,
                  };
            }
        })
   }

   const clearAllFilters = () => {
       setFilters(initialFiltersState);
   }

   const calculateActiveFiltersCount = () => {
    let count = 0;
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        const value = filters[key];
        if (value instanceof Set) {
          count += value.size;
        } else if (typeof value === 'boolean') {
          if (value) count++;
        } else {
          if (value !== initialFiltersState[key]) count++;
        }
      }
    }
    return count;
  };

  const activeFiltersCount = calculateActiveFiltersCount();

   const  filterBySubscriptionType = (smallcase, subscriptionType) => {
       let isPrivate = smallcase.flags.private;

        if(subscriptionType === 'Show all') return true;
        if(subscriptionType === 'Free access') return !isPrivate;
        if(subscriptionType === 'Fee based') return isPrivate;
        
   }

   const filterByInvestmentAmount = (smallcase, investmentAmount) => {
    let minInvestAmount = smallcase.stats.minInvestAmount;

        if(investmentAmount === 'Any') return true;
        if(investmentAmount === 'Under ₹ 5,000') return minInvestAmount < 5000;
        if(investmentAmount === 'Under ₹ 25,000') return minInvestAmount < 25000;
        if(investmentAmount === 'Under ₹ 50,000') return minInvestAmount < 50000;
   }

   const filterByVolatility = (smallcase, volatilitySet) => {
       if(volatilitySet.size === 0)
         return true;
       let currVolatility = smallcase.stats.ratios.riskLabel;
       if(volatilitySet.has(currVolatility))
        return true;
   }

   const filterByLaunchDate = (smallcase, launchDate) => {
    if(!launchDate)
        return true;
     
    let launched = smallcase.info.created;
    const uploadedDate = new Date(launched);
    const currentDate = new Date();
    const oneYearAgo = new Date();

  // Set 'oneYearAgo' to exactly one year before the current date i.e 2024
  oneYearAgo.setFullYear(currentDate.getFullYear() - 2);
  console.log(currentDate);
  console.log(oneYearAgo);
  console.log(uploadedDate);

  // Compare the uploaded date with the date one year ago
  return uploadedDate >= oneYearAgo && uploadedDate <= currentDate;
    
}

const filterByInvestmentStrategies = (smallcase, investmentStrategiesSet) => {

    if(investmentStrategiesSet.size === 0)
        return true;

    let investmentStrategyArray = smallcase.info.investmentStrategy;
       
   for(let strategy of investmentStrategyArray) {
       if(investmentStrategiesSet.has(strategy.displayName))
        return true;
      }
      return false;
}

const sortByPopularity = (smallcases) => {
     return smallcases.sort((a, b) => a.brokerMeta.flags.popular.rank - b.brokerMeta.flags.popular.rank);
}

const sortByMinInvestmentAmount = (smallcases) => {
    return smallcases.sort((a, b) => a.stats.minInvestAmount  - b.stats.minInvestAmount);
}
 
const sortByRecentlyRebalanced = (smallcases) => {
    return smallcases.sort((a, b) => new Date(b.info.lastRebalanced) - new Date(a.info.lastRebalanced));
}

const sortByReturns = (smallcases, period, order = 'desc') => {
    return smallcases.sort((a, b) => {
      const returnA = a.stats.returns[period];
      const returnB = b.stats.returns[period];
  
      if (returnA === returnB) return 0;
  
      if (order === 'desc') {
        return returnB - returnA;
      } else {
        return returnA - returnB;
      }
    });
  };
  

  const sortedData = (smallcases) => {
    switch (selectedSort.sortBy) {
      case 'Popularity':
        return sortByPopularity(smallcases);
      case 'Minimum Amount':
        return sortByMinInvestmentAmount(smallcases);
      case 'Recently Rebalanced':
        return sortByRecentlyRebalanced(smallcases);
      case '1M':
        return sortByReturns(smallcases, 'monthly', selectedSort.orderBy.order === 'High-Low' ? 'desc' : 'asc');
      case '6M':
        return sortByReturns(smallcases, 'halfyearly', selectedSort.orderBy.order === 'High-Low' ? 'desc' : 'asc');
      case '1Y':
        return sortByReturns(smallcases, 'yearly', selectedSort.orderBy.order === 'High-Low' ? 'desc' : 'asc');
      case '3Y' :
        return sortByReturns(smallcases, 'threeYear', selectedSort.orderBy.order === 'High-Low' ? 'desc' : 'asc');
      case '5Y' :
        return sortByReturns(smallcases, 'fiveYear', selectedSort.orderBy.order === 'High-Low' ? 'desc' : 'asc');
      default:
        return smallcases;
    }
  };
  

   const filteredSmallCases = smallcases
    .filter((smallcase) => filterBySubscriptionType(smallcase, filters.subscriptionType))
    .filter((smallcase) => filterByInvestmentAmount(smallcase, filters.investmentAmount))
    .filter((smallcase) => filterByVolatility(smallcase, filters.volatility))
    .filter((smallCase) => filterByLaunchDate(smallCase, filters.launchDate))
    .filter((smallcase) => filterByInvestmentStrategies(smallcase, filters.investmentStrategiesSet));
   
    const sortedSmallCases = sortedData(filteredSmallCases);

    const renderSmallCases = sortedSmallCases
                            .map((smallCase) => { 
                            return <Card key={smallCase._id} smallCaseInfo={smallCase} selectedSort = {selectedSort} />
                              });

    
    return (
        <div>
            <Navbar selectedSort = {selectedSort} setSelectedSort = {setSelectedSort}/>
            <main className='main flex gap-x-12 justify-center mt-2'>
                <Filters  filters = {filters} updateFilters = {updateFilters} investmentStrategies = {investmentStrategies} activeFiltersCount = {activeFiltersCount} clearAllFilters = {clearAllFilters}/>
            {renderSmallCases.length > 0 ? 
            <ul className=' w-[900px]'>
            {renderSmallCases}
            </ul> : <Notfound /> }
            </main>
        </div>
    );
}

export default SmallcaseListings;
