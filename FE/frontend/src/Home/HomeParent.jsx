import { Home } from '@mui/icons-material'
import React from 'react'
import HomeProducts from './HomeProducts'


function HomeParent() {
  return (
    <div>
      <h1 className="text-2xl ml-13 mt-4 font-semibold font-serif">Best Sellers-Shopping Time</h1>
    <HomeProducts />
    </div>
  )
}

export default HomeParent