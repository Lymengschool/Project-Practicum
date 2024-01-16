import React from 'react';
import Form from '../components/form';
import style from './../../public/css/login.module.css'
import Nav from '../components/nav';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";


function login() {
    return (
        <div> 
            <Nav />
             <div className={style.body}>
                <div className={style.container}>
                    <h1 className={style.tittle}>ចូលគណនេយ្យ</h1>
                    <Form action={"login"}/>
                    <div className={style.textContainer}>
                        <p className={style.text}>អត់មានគណនេយ្យ ?
                            <Link to="/register" className={style.create}>&nbsp;បង្កើត</Link></p>
                            <p className={style.text}>ចុះឈ្មោះជាមួយ
                            <Link to="#" className={style.icon}>
                            &nbsp; <FontAwesomeIcon icon={faGoogle} />
                            </Link> ឬ <Link to="#" className={style.icon}>
                            &nbsp; <FontAwesomeIcon icon={faFacebook} />
                            </Link> </p>
                    </div>
                    

               
                </div>
                
            </div>
        </div>
       
    );
}

export default login;