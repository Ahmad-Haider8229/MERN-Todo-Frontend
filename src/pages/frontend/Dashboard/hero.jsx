import { useAuth } from '@/context/auth';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { showSuccess, showError, showInfo, showWarning } from '@/components/toast/toast';

const Hero = () => {

  const [todo, settodo] = useState([])
  const [loading, setLoading] = useState(false)
  const [Isdel, setIsdel] = useState(false)
  const { user } = useAuth()

  const fetch = async () => {


    setLoading(true)

    const token = localStorage.getItem("jwt")
    axios.get("https://mern-todo-server-silk.vercel.app/todo/fetch", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {

          const { todo } = data
          settodo(todo)


          console.log(data.message)

        }

      }).catch((error) => {
        console.error(error)
        showError("Something went wrong")


      })
    setLoading(false)







  }


  useEffect(() => {
    try {

      fetch()

    } catch (error) {
      console.log(error)

    }

  }, []);


  const handleStatus = async (id, status) => {



    const todoData = {

      id: id,
      status: status

    };


    try {

      const todoToUpdate = todo.find(item => item.id === id);
      const updatedTodo = {
        ...todoToUpdate,
        status: true
      }

      const token = localStorage.getItem("jwt")
      updatedTodo.status = true
      axios.patch("https://mern-todo-server-silk.vercel.app/todo/updateStatus", updatedTodo, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const { status, data } = res
          if (status === 200) {

            settodo(prevTodos =>
              prevTodos.map(item =>
                item.id === id ? { ...item, status: true } : item
              )
            );
            showSuccess("Task done")
          };





        }).catch((error) => {
          console.log(error)
          showError("Something went wrong")

        })



    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false)
    }













  }



  const handleDelete = async (id) => {




    setLoading(true)

    try {
      const token = localStorage.getItem("jwt")

      axios.delete(`https://mern-todo-server-silk.vercel.app/todo/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const { status, data } = res
          if (status === 200) {
            showInfo("Todo deleted")
            const del = todo.filter(item => item.id !== id)
            settodo(del)

            console.log("deleted")



          }

        }).catch((error) => {
          console.log(error)
          alert("Something went wrong")

        })



    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false)
    }


  }


  




  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading Todos...</p>
        </div>
      </div>
    );
  }


  if (Isdel) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Deleting...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Dashboard</h1>
        <Link to="/dashboard/add" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Todo
        </Link>
      </div>

      {todo.length === 0 ? (
        <div className="alert alert-info text-center">
          <p>No todos yet. <Link to="/dashboard/add">Add your first todo</Link></p>
        </div>
      ) : (
        <div className="container mt-5" >


          <div className="table-responsive">
            <table className="table  table-hover" >
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>



                </tr>
              </thead>
              <tbody >
                {todo.map(item => (






                  <tr key={item.id} style={{ height: '70px' }} >
                    <td style={{ paddingTop: '15px', paddingBottom: '15px' }}>{item.id}</td>
                    <td style={{ paddingTop: '15px', paddingBottom: '15px' }}>{item.updatedAt}</td>
                    <td style={{ paddingTop: '15px', paddingBottom: '15px' }}>{item.title}</td>
                    <td style={{ paddingTop: '15px', paddingBottom: '15px' }}>{item.description}</td>
                    <td style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                      {item.status && (

                        <span className="badge bg-success">
                          Complete
                        </span>

                      )}


                      {!item.status && (
                        <span className="badge bg-warning">
                          Pending
                        </span>
                      )}
                    </td>
                    <td style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                      <div className="dropdown">
                        <style>
                          {`
                         .no-arrow::after {
                             display: none !important;
                                }
                             `}
                        </style>
                        <button
                          className="btn btn-sm dropdown-toggle no-arrow"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ background: 'transparent', border: 'none' }}
                        >
                          <i className="bi bi-three-dots-vertical" style={{ fontSize: '20px' }}></i>
                        </button>
                        <ul className=" dropdown-menu dropdown-menu-end" >
                          {!item.status && (
                            <>
                              <li>
                                <Link to={`/dashboard/edit/${item.id}`} className="dropdown-item">
                                  <i className="bi bi-pencil me-2"></i> Edit
                                </Link>
                              </li>
                              <li>
                                <button className="dropdown-item" onClick={() => handleStatus(item.id, item.status)}>
                                  <i className="bi bi-check-circle me-2"></i> Done
                                </button>
                              </li>
                              <li><hr className="dropdown-divider" /></li>
                            </>
                          )}
                          <li>
                            <button className="dropdown-item text-danger" onClick={() => handleDelete(item.id)}>
                              <i className="bi bi-trash3 me-2"></i> Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>




                ))
                }
              </tbody >
            </table >
          </div >

        </div>
      )}
    </div >
  );
};

export default Hero;