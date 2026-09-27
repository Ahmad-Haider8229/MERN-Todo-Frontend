import { useAuth } from '@/context/auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,  useParams } from 'react-router-dom';
import { showSuccess, showError, showInfo, showWarning } from '@/components/toast/toast';

const hero = () => {





  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todo, settodo] = useState()
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate();
  const { todoId } = useParams();

  const fetch = async () => {





    setLoading(true)

    const token = localStorage.getItem("jwt")
    axios.get(`https://mern-todo-server-silk.vercel.app/todo/single/${todoId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {

          const { todos } = data
          settodo(todos)


          console.log(data.message)
          console.log(data.todos)

        }

      }).catch((error) => {
        console.error(error)
        showError("Something went wrong")


      })
    setLoading(false)

    console.log(todoId)






   

  }




  useEffect(() => {
    try {
      fetch()
      console.log(todo)



    } catch (error) {
      console.log(error)

    }

  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {

      title: title,
      description: description,
      id: todoId,
     
    };


    try {
      const token = localStorage.getItem("jwt")
      axios.patch("https://mern-todo-server-silk.vercel.app/todo/update", todo, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const { status, data } = res
          if (status === 200) {

            
            setTitle('');
            setDescription('');
            navigate("/dashboard")
            showSuccess("Todo updated")
            

          }

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








  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Updating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 py-5">
      <div className="row justify-content-center w-100">
        <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">


          <div className="card border-0 shadow-lg rounded-4">


            <div className="card-header bg-primary text-white rounded-top-4 p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-0 fw-bold">
                    <i className="bi  me-2"></i>
                    Edit your Todo
                  </h3>

                </div>

              </div>
            </div>


            <div className="card-body p-4">




              <form onSubmit={handleSubmit}>


                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-pencil me-2 text-primary"></i>
                    Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-3"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                    required
                  />

                </div>


                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="bi bi-text-paragraph me-2 text-primary"></i>
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control rounded-3"
                    rows="3"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ resize: 'vertical' }}
                  />

                </div>







                <div className="d-flex gap-2 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary flex-grow-1 py-2 fw-bold rounded-3"

                  >
                    Edit
                  </button>

                </div>

              </form>
            </div>




          </div>
        </div>
      </div>
    </div>
  )
}

export default hero
