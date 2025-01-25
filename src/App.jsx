import React from 'react'
import Header from './Components/Header'
import ProductsList from './Components/Products'

const App = () => {
  return (
    <div>
      {/* <h1 className='font-bold text-4xl'>app</h1> */}
      <Header/>
      <ProductsList/>
    </div>
  )
}

export default App