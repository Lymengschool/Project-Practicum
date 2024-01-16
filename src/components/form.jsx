import React from "react";
import style from './../../public/css/form.module.css';

function Form({ name, confirmpassword, action}) {
  return (
    <body className={style.body}>
       <form className={style.contianer}>
        {name && (
          <input
            className={style.input}
            type="text"
            id="name"
            placeholder="ឈ្មោះ"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        )}
          <input
           className={style.input}
            type="email"
            id="email"
            placeholder="អ៊ីមែល"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input
           className={style.input}
            type="password"
            id="password"
            placeholder="ពាក្យសម្ងាត់"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        
         {confirmpassword && (
          <input
          className={style.input}
            type="confirmpassword"
            id="confirmpassword"
            placeholder="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <input
        className={style.button}
        type="button"
        // onClick={handleButtonClick}
        value={action === "login" ? "ចូល" : "ចុះឈ្មោះ"}
      />
      </form>
    </body>
     
  );
}

export default Form;