import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { FaGithub } from "react-icons/fa";
import style from "./../../public/css/footer.module.css";

function Footer() {
    return (
        <footer className={style.container}>
                    <Link to="#" className={style.icon}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </Link>
                    <Link to="#" className={style.icon}>
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                    <Link to="#" className={style.icon}>
                        <FontAwesomeIcon icon={faTelegram} />
                    </Link>
                    <Link to="#" className={style.icon}>
                        <FaGithub />
                    </Link>
        </footer>
    );
}

export default Footer;
