import React from 'react';
import Form from '../components/form';
import style from './../../public/css/login.module.css'
import Nav from '../components/nav';



function Register() {
    return (
        <div> 
            <Nav />
             <div className={style.body}>
                <div className={style.container}>
                    <h1 className={style.tittle}>ចូលគណនេយ្យ</h1>
                    <Form name={true} confirmpassword={true} action={"register"}/>
                            
                </div>
                
            </div>
        </div>
       
    );
}

export default Register;