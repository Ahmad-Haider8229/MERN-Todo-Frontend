import React from 'react'
import Home from './home'
import Dashboard from './Dashboard'
import Add from './Add'
import Edit from "./Edit"
import { Route, Routes, Link } from 'react-router-dom'
import Header from '../../components/Header'
import Login from '../auth/login'
import Signup from '../auth/signup'
import ProtectedRoute from '../../components/ProtectedRoutes'
import { useAuth } from '@/context/auth'




const Frontend = () => {
    const { loading } = useAuth();



       if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <main>



      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/add' element={<Add />} />

          <Route path='/dashboard/edit/:todoId' element={<Edit />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

    </main>
  )
}

export default Frontend
