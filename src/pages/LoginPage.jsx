import React from 'react';
import Form from '../components/form';
import style from './../../public/css/login.module.css'
import Nav from '../components/nav';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {app, auth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from './../../src/components/firebase'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Footer from './../components/footer';


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
            if (user) {
                 alert("user create")
            }
           
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
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Facebook sign-in error:", errorCode, errorMessage);
        
                    // Check if the user closed the popup
                    if (errorCode === 'auth/popup-closed-by-user') {
                        alert("The Facebook sign-in popup was closed. Please try again.");
                        return;
                    }
        
                    // Additional logging for debugging purposes
                    if (error.customData && error.customData.email) {
                        const email = error.customData.email;
                        console.error("Email:", email);
                    }
        
                    const credential = FacebookAuthProvider.credentialFromError(error);
                    if (credential) {
                        console.error("Facebook credential:", credential);
                    }
                });
        };
        
    

    return (
        <div> 
            <Nav />
             <div className={style.body}>
                <div className={style.container}>
                    <h1 className={style.tittle}>ចូលគណនេយ្យ</h1>
                    <Form action={"login"}/>
                    <ToastContainer />
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
                    <Footer />

                </div>
                
            </div>
        </div>
       
    );
}

export default login;