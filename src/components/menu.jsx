import React from "react";
import menu from "./../../public/css/menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faQuoteLeft, faBrain, faWrench } from "@fortawesome/free-solid-svg-icons";

function Menu() {
    return (
        <div className={menu.menublock}>
            <div className={menu.inner}>
                <div>
                    <FontAwesomeIcon icon={faClock} />
                    ពេល
                </div>
                <div>
                    <FontAwesomeIcon icon={faQuoteLeft} />
                    ពាក្យស្លោក
                </div>
                <div>
                    <FontAwesomeIcon icon={faBrain} />
                    សេរីឆ្នៃប្រឌិត
                </div>
                <div>
                    <FontAwesomeIcon icon={faWrench} />
                    ផ្ទាល់ខ្លួន
                </div>
            </div>
        </div>
    );
}

export default Menu;
