import { useAuth } from '@/context/auth';
import React  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccess, showError, showInfo, showWarning } from '../toast/toast';

const Navbar = () => {
  const { isAuth, user, logout } = useAuth();
  const navigate = useNavigate();

  



  const handleLogout = () => {

     localStorage.removeItem("jwt")
     localStorage.removeItem("user") 
     window.location.reload() 
     navigate('/');
     
    
  };

  return (
    <main>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                {user ? `Hello ${user.fullname}` : "Please sign up"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body d-flex flex-column">

              <ul className="navbar-nav justify-content-end pe-3">
                <li className="nav-item">
                  <Link to='/' className="nav-link active">Home</Link>
                </li>



                <li className="nav-item">
                  <Link to='/dashboard' className="nav-link active">Dashboard</Link>
                </li>





              </ul>



              {!isAuth && (
                <div className='mt-auto d-flex flex-column gap-2'>
                  <Link to='/login' className="btn btn-outline-primary w-100">Login</Link>
                  <Link to='/signup' className="btn btn-primary w-100">Signup</Link>
                </div>
              )}


              {isAuth && (
                <div className='mt-auto d-flex flex-column gap-2'>
                  <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button>
                </div>
              )}

            </div>
          </div>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;