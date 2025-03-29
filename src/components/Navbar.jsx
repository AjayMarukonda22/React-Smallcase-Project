import React from 'react'
import SortBy from './SortBy'

const Navbar = ({ selectedSort, setSelectedSort }) => {
  return (
    <div className='flex justify-around py-4 border border-gray-200'>
        <img src = "./src/images/smallCaseLogo.svg" alt='smallcase logo' />
        <SortBy selectedSort = {selectedSort} setSelectedSort = {setSelectedSort}/>
    </div>
  )
}

export default Navbar