import React from "react";
import menu from "./../../public/css/menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faQuoteLeft, faBrain, faWrench } from "@fortawesome/free-solid-svg-icons";

function Menu() {
    return (
        <div className={menu.container}>
            <div className={menu.menublock}>
                <div className={menu.innerleft}>
                    <button>
                        <FontAwesomeIcon icon={faClock} />
                        ពេល
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faQuoteLeft} />
                        ពាក្យស្លោក
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faBrain} />
                        សេរីឆ្នៃប្រឌិត
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faWrench} />
                        ផ្ទាល់ខ្លួន
                    </button>
                </div>
                <div className={menu.time}>
                    <button>30 វិ.</button>
                    <button>60 វិ.</button>
                    <button>90 វិ.</button>
                    <button>120 វិ.</button>
                    <form action="">
                        <input type="num" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Menu;
