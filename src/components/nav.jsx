import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faGear, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FiLogOut } from "react-icons/fi";
import { Howl } from "howler";
import nav from "../../public/css/nav.module.css";
import { auth, signOut as firebaseSignOut } from "./firebase"; // Adjust the path accordingly
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sound = new Howl({
    src: ["/audio/snail.mp3"], // Corrected path to audio file
});

function Nav() {

    function handleSignOut() {
        firebaseSignOut(auth).then(() => {
            console.log("Signing out...");
            toast.success("logout success ...")
        }).catch((error) => {
            console.log(error.message);
        });
    }

    const playSound = () => {
        // sound.stop();
        // sound.play();
    };

    return (
        <nav>
            <ToastContainer />
            <div className={nav.container}>
                <div className={nav.left}>
                    <Link to='/'>
                        <img className={nav.logo} src='/img/logo.svg' alt='logo' /> {/* Corrected path to logo */}
                    </Link>
                    <div className={nav.logoname}>
                        <p>Ultimate Typing Simulator</p>
                        <p>Jai Type</p>
                    </div>
                    <Link to='/' className={nav.icon}>
                        <FontAwesomeIcon icon={faKeyboard} />
                    </Link>
                </div>
                <div className={nav.right}>
                    <FiLogOut className={nav.icon} onClick={handleSignOut} />
                    <Link to='/setting' className={nav.icon}>
                        <FontAwesomeIcon icon={faGear} />
                    </Link>
                    <Link to='/login' className={nav.icon}>
                        <FontAwesomeIcon icon={faCircleUser} onClick={playSound} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
