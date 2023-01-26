import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import "../styles/search.css"
import Footer from '../components/Footer'
import useFetch from '../components/useFetch'
import { useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import ProductList from '../components/SearchProductList'
import Sidebar from '../components/SearchSidebar'
import SearchTopBar from '../components/SearchTopBar'
import { SearchContext } from '../Contexts/SearchContext'


//Search Results Page
export default function Search() {

  const location = useLocation();
  const [properties, setProperties] = useState({brand: "", style: "", sort: "", leather: "", color: "", sale: "", category: location.state.category,
                                                type: "" , bodyFit: "", productName: location.state.searchVal , priceMin: "", priceMax: "", size: ""})
  const { fetchedData, loading } = useFetch("http://localhost:8800/api/products", properties) //Performs api calls

  
  return (
    <SearchContext.Provider value={{properties, setProperties, fetchedData, loading}}>
      <Navbar />
      <SearchTopBar />
      <div className='search-container'>
        <Sidebar />
        { loading ? <Loading /> : <ProductList /> }
      </div>
      <Footer />
    </SearchContext.Provider>

  )
}
