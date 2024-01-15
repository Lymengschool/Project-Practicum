import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard, faGear, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import nav from "../../public/css/nav.module.css";

function Nav() {
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
                <Link to='#' className={nav.icon}>
                    <FontAwesomeIcon icon={faCircleUser} />
                </Link>
            </div>
        </nav>
    );
}

export default Nav;
