import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import BooksPage from './BooksPage';

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
        
        <Route
            path="/"
            element={ <App /> }
        />

        <Route
            path="/login"
            element={ <Login /> }
        />

        <Route
            path="/register"
            element={ <Register /> }
        />

        <Route
            path="/profile"
            element={ <Profile /> }
        />
        
        
        <Route
            path="/booksPage"
            element={ <BooksPage /> }
        />


        </Routes>
    </BrowserRouter>
  )
}

export default Routing