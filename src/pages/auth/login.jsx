import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { useAuth } from '@/context/auth';
import { showSuccess, showError, showInfo, showWarning } from '@/components/toast/toast';
const signup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  const { readProfile, isAuth, user } = useAuth();






  const login = async () => {

    axios.post("http://localhost:8000/auth/login", { email, password })
      .then((res) => {

        const { status, data } = res

        if (status === 200) {
          console.log(data.message)
          readProfile(data.token)
          localStorage.setItem("jwt", data.token)
          setemail("")
          setpassword("")
          navigate("/")
          showSuccess(`Welcome back ${data.user.fullname}`)
          
        }

      }).catch(error => {

        showError("Invalid credantials")
        console.error(error)
      })


   



  }


  const handleSubmit = (e) => {

    e.preventDefault()

  }
  const handleEmail = (e) => {

    const value = e.target.value
    setemail(value)

  }
  const handlePassword = (e) => {

    const value = e.target.value
    setpassword(value)

  }






  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4">


          <div className="card border-0 shadow-lg rounded-4 p-4 p-sm-5">


            <div className="text-center mb-4">
              <h1 className="display-5 fw-bold text-dark">
                <span className="text-primary">Todo</span>App
              </h1>
              <p className="text-muted">Login to your account</p>
            </div>




            <form onSubmit={handleSubmit} >

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-3"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmail}


                />
                <label htmlFor="email">
                  <i className="bi bi-envelope me-2"></i>Email Address
                </label>
              </div>


              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-3"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}

                />
                <label htmlFor="password">
                  <i className="bi bi-lock me-2"></i>Password
                </label>
              </div>


              <button
                type=""
                className="btn btn-primary w-100 py-3 fw-bold rounded-3"
                onClick={login}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </button>
            </form>


            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" />
              <span className="mx-3 text-muted small">OR</span>
              <hr className="flex-grow-1" />
            </div>


            <p className="text-center mb-0">
              <span className="text-muted">Don't have an account</span>
              <Link to="/signup" className="text-primary fw-bold text-decoration-none ms-1">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signup
