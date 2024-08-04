import React from 'react'
import Navbar from '../Components/Navbar'
import Slide from './Slide'
import Categories from '../Components/Categories'
import Listing from './Listing'
const Home = () => {
  return (
    <>
     <Navbar/>
     <Slide/>
     <Categories/>
     <Listing/>
    </>
       
   
  )
}

export default Home