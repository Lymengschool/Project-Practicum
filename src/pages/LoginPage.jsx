import React from 'react';
import Form from '../components/form';
import style from './../../public/css/login.module.css'
import Nav from '../components/nav';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {app, auth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from './../../src/components/firebase'

function login() {
    const provider = new GoogleAuthProvider();
    const providers = new FacebookAuthProvider();

        const loginWithGoogle = () => {
            signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

        });       
        }

        const loginWithFacebook = () => {
            signInWithPopup(auth, providers)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

  });
        }
    

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
                            <button className={style.icon}>
                            &nbsp; <FontAwesomeIcon icon={faGoogle} onClick={loginWithGoogle}/>
                            </button> &nbsp; ឬ <button className={style.icon}>
                            &nbsp; <FontAwesomeIcon icon={faFacebook} onClick={loginWithFacebook}/>
                            </button> </p>
                    </div>
                    

               
                </div>
                
            </div>
        </div>
       
    );
}

export default login;