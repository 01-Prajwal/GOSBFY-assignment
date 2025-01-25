import React from 'react'
import Header from './Components/Header'
import ProductsList from './Components/Products'

const App = () => {
  return (
    <div>
    {/* Entry point of app where the header and productlist are rendered in ui  */}

      <Header/>
      <ProductsList/>
    </div>
  )
}

export default App