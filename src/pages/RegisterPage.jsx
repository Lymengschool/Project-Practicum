import React from 'react';
import Form from '../components/form';
import style from './../../public/css/login.module.css'
import Nav from '../components/nav';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Footer from './../components/footer';
import { Link } from 'react-router-dom';


function Register() {
    return (
        <div> 
            <Nav />
             <div className={style.body}>
                <div className={style.container}>
                    <h1 className={style.tittle}>ចូលគណនេយ្យ</h1>
                    <Form name={true} confirmpassword={true} action={"register"}/>
                    <ToastContainer />
                    <div className={style.textContainer}>
                        <p className={style.text}>មានគណនេយ្យ ?
                        <Link to="/login" className={style.create}>&nbsp;ចូល</Link></p>
                    </div>      
                </div>
                
            </div>
        </div>
       
    );
}

export default Register;