import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {

      const {isAuthenticated,setIsAuthenticated,loading,setLoading} =   useContext(Context);


      const logoutHandler = async ()  => {
        setLoading(true);
         try {
                await axios.get( `${server}/users/logout`,{
                  withCredentials: true,
                });
          toast.success("Logged out successfully");
          setIsAuthenticated(false);
          setLoading(false);
         } catch (error) {
          toast.error(error.response.data.message);
           setIsAuthenticated(true);
           setLoading(false);
         }
    
     }   

    
  return  <nav className='header'>
        <div>
            <h2>ToDo App.</h2>
        </div>
        <article>
            <Link to={"/"} >Home</Link>
            <Link to={'/Profile'}>Profile</Link>
            {
              isAuthenticated? ( 
                      <button disabled={loading} onClick={logoutHandler} className='btn'>
                          Logoout
                          </button>) : (<Link to={'/login'}>login</Link>)
            }
        </article>
  </nav>
  
    
}

export default Header