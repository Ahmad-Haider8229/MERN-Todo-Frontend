import { useAuth } from '@/context/auth';
import axios from 'axios';
import React, {  useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { showSuccess, showError, showInfo, showWarning } from '@/components/toast/toast';


const Hero = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setloading] = useState(false)



  const navigate = useNavigate();





  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    const todo = {

      title: title,
      description: description,

    };


    try {
      const token = localStorage.getItem("jwt")
      axios.post("http://localhost:8000/todo/create", todo, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const { status, data } = res
          if (status === 201) {

            showSuccess("Task added ")
            setTitle('');
            setDescription('');
            navigate("/dashboard")

          }

        }).catch((error) => {
          console.log(error)
          showError("Something went wrong")

        })



    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setloading(false)
    }

    




  };


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Adding Todo...</p>
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
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Todo
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
                    placeholder="Enter todo title..."
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
                    placeholder="Enter detailed description "
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
                    Add
                  </button>

                </div>

              </form>
            </div>




          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;