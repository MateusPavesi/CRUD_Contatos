import React from 'react';
import './Home.css';
import ContactList from './components/ContactList';
import Navbar from './components/Navbar';

const Home = () => {
  return (
    <div className='container'>
      <Navbar/>
      <ContactList/>
    </div>
  );
}

export default Home;