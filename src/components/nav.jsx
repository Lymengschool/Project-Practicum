import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faGear, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import {Howl} from 'howler';
import nav from "../../public/css/nav.module.css";

const sound = new Howl({
        src: ['../../public/audio/snail.mp3']
});

function Nav() {
    
    const playSound = () => {
        sound.stop();
        sound.play();
    }
    
    return (
        <nav>
            <div className={nav.left}>
                <Link to='/'>
                    <img src='../../img/logo.svg' alt='logo' />
                </Link>
                <div>
                    <p>Ultimate typing Simulator</p>
                    <p>Jai Type</p>
                </div>
                <Link to='/' className={nav.icon}>
                    <FontAwesomeIcon icon={faKeyboard} />
                </Link>
            </div>

            <div className={nav.right}>
                <Link to='#' className={nav.icon}>
                    <FontAwesomeIcon icon={faGear} />
                </Link>
                <Link to='/login' className={nav.icon}>
                    <FontAwesomeIcon icon={faCircleUser} onClick={playSound}/>
                </Link>
            </div>
        </nav>
    );
}

export default Nav;
