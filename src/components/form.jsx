import React from "react";
import style from './../../public/css/form.module.css';
import {app, auth, database, createUserWithEmailAndPassword, signInWithEmailAndPassword,set, ref} from './firebase'
import { useState } from "react";

function Form({ name, confirmpassword, action }) {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Confirmpassword, setConfirmPassword] = useState('');

  const handleButtonClick = () => {

    // logic for login and register
    if (action === "login") {
      // validate input fields
      if (!validateEmail(email) || !validatePassword(password)) {
        alert('Email or Password is Outta Line!!');
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          alert('Logged in success!!');
        })
        .catch(error => {
          const error_message = error.message;
          alert(error_message);
        });
    } else if (action === "register") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const database_ref = ref(database);

          const user_data = {
            user_name: Name,
            email: email,
          };

          set(ref(database, 'users/' + user.uid), user_data);
          alert('User Created!!');
        })
        .catch(error => {
          const error_code = error.code;
          const error_message = error.message;
          alert(error_message);
        });
    }
  };

  const validateEmail = (email) => {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };
 
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