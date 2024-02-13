import React, { useState } from "react";
import style from './../../public/css/form.module.css';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, set, ref, onAuthStateChanged } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        toast.warn('Email និង password មិនត្រឹមត្រូវ', {
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
          toast.success('Login ជោគជ័យ', {
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
          navigate("/profile"); // Navigate to profile after successful login
        })
        .catch(error => {
          const error_message = error.message;
          toast.error('Login មិនជោគជ័យ!', {
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
      // Register logic
    }
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
    <body className={style.body}>
      <form className={style.contianer}>
        {name && (
          <input
            className={style.input}
            type="text"
            id="Name"
            placeholder="ឈ្មោះ"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className={style.input}
          type="email"
          id="email"
          placeholder="អ៊ីមែល"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={style.input}
          type="password"
          id="password"
          placeholder="ពាក្យសម្ងាត់"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {confirmpassword && (
          <input
            className={style.input}
            type="password"
            id="Confirmpassword"
            placeholder="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់"
            value={Confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input
          className={style.button}
          type="button"
          onClick={handleButtonClick}
          value={action === "login" ? "ចូល" : "ចុះឈ្មោះ"}
        />
      </form>
    </body>
  );
}

export default Form;
