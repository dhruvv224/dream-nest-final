import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Footer from './Components/Footer';
import Createlistings from './Pages/Createlistings';
import ListingsCard from './Components/ListingsCard';
import WishList from './Pages/WishList';
import { ChakraProvider } from '@chakra-ui/react';
import TestToast from './Components/Testtoast';
import Listingcard2 from './Components/Listingcard2';
function App() {

  return (
    <div className="App">
      <ChakraProvider>

 
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/create-listings' element={<Createlistings/>}/>
          <Route path='/listings/:id' element={<ListingsCard/>}/>
          <Route path='/wishlist' element={<WishList/>}/>
          <Route path='/testtoast' element={<TestToast/>}/>
          <Route path='/listings2/:id' element={<Listingcard2/>}/>





      </Routes>
      </ChakraProvider>
     <Footer/>
    </div>
  );
}

export default App;
