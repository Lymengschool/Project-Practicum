import React, { useState } from "react";
import style from './../../public/css/form.module.css';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, set, ref, onAuthStateChanged, database } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Form({ name, confirmpassword, action }) {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmpassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Logic for login and register
    if (action === "login") {
      // Validate input fields
      if (!validateEmail(email) || !validatePassword(password)) {
        toast.warn('Email and password are incorrect', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "#4B5975",
          transition: Bounce,
        });
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success('Login successful', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "#4B5975",
            transition: Bounce,
          });
          const user = auth.currentUser;
          //set local storage to true for login variables
          localStorage.setItem('isLogin', true);
          localStorage.setItem('user', JSON.stringify(user));
          console.log("islogin at login page:",localStorage.getItem('isLogin'));
          navigate("/profile"); 
        })

        .catch(error => {
          const error_message = error.message;
          toast.error('Login failed!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "#4B5975",
            transition: Bounce,
          });
        });
    } else if (action === "register") {

      if (!validateEmail(email) || !validatePassword(password)) {
        alert('Email or Password is Outta Line!!');
        return;
      }
  
      if (password !== Confirmpassword) {
        alert("password not match!!");
        return;
      }
  
      // Move on with Auth
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
  
          // Create User data
          const user_data = {
            user_name: Name,
            email: email,
            last_login: Date.now()
          };
  
          // Push to Firebase Database
          set(ref(database, 'users/' + user.uid), user_data);
  
          // Done
          alert('User Created!!');
        })
        .catch(error => {
          // Firebase will use this to alert of its errors
          const error_code = error.code;
          const error_message = error.message;
  
          alert(error_message);
        });
    };
  };

  const validateEmail = (email) => {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 3;
  };

  // Listen for authentication state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      // Access user profile here if needed
      console.log(user);
    } else {
      // No user is signed in.
    }
  });

  return (
    <div className={style.body}>
      <form className={style.container}>

        {name && (
          <input
            className={style.input}
            type="text"
            id="Name"
            placeholder="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className={style.input}
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={style.input}
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {confirmpassword && (
          <input
            className={style.input}
            type="password"
            id="Confirmpassword"
            placeholder="Confirm Password"
            value={Confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input
          className={style.button}
          type="button"
          
          // onClick={handleButtonClick
          onClick={handleButtonClick}
          value={action === "login" ? "Login" : "Register"}
        />
      </form>
    </div>
  );
}

export default Form;
