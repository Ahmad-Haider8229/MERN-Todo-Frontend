import React, { createContext, useState, useEffect, useContext } from 'react';

import axios from 'axios';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  


const readProfile =  (token) => {
try{
if (!token) {
      console.log("No token found, user is not authenticated");
      setLoading(false);
      setIsAuth(false);
      return;
    }

 
 axios.get("https://mern-todo-server-silk.vercel.app/auth/user", {headers: {Authorization:`Bearer ${token}`}})
.then((res) => {

const {status, data} = res
if(status === 200){
   setIsAuth(true); 
   setUser(data.user); 
   localStorage.setItem('user', JSON.stringify(data.user));
   setLoading(false);
}
})
.catch((error) => { 
  console.error(error);
  setLoading(false);
})

}
catch(error){
  console.error(error)
}
} 


 useEffect(() => {
 
    const token = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");
   
    
    if (token) {
      setIsAuth(true); 
      
        setUser(JSON.parse(storedUser));
       
      
      readProfile(token)
    } else {
      setLoading(false); 
      setIsAuth(false);
     
    }

    
}, []);

  const value = {
    isAuth,
    loading,
    user,
    readProfile


  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};