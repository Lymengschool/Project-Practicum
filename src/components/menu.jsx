import React, { useState } from "react";
import menu from "./../../public/css/menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faQuoteLeft, faBrain, faWrench, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FaGear } from "react-icons/fa6";

function Menu() {
    const [activeButton, setActiveButton] = useState(1);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    return (
        <div className={menu.container}>
            <div className={menu.menublock}>
                <div className={menu.innerleft}>
                    <button onClick={() => setActiveButton(1)}>
                        <span>
                            <FontAwesomeIcon className={menu.icon} icon={faClock} />
                            ពេល
                        </span>
                    </button>
                    <button onClick={() => setActiveButton(2)}>
                        <span>
                            <FontAwesomeIcon className={menu.icon} icon={faQuoteLeft} />
                            ពាក្យស្លោក
                        </span>
                    </button>
                    <button onClick={() => setActiveButton(3)}>
                        <span>
                            <FontAwesomeIcon className={menu.icon} icon={faBrain} />
                            សេរីឆ្នៃប្រឌិត
                        </span>
                    </button>
                    <button onClick={() => setActiveButton(4)}>
                        <span>
                            <FontAwesomeIcon className={menu.icon} icon={faWrench} />
                            ផ្ទាល់ខ្លួន
                        </span>
                    </button>
                </div>

                <div className={`${menu.innerright} ${activeButton === 1 ? menu.active : menu.none}`}>
                    <button>
                        <span>30 វិ.</span>
                    </button>
                    <button>
                        <span>60 វិ.</span>
                    </button>
                    <button>
                        <span>90 វិ.</span>
                    </button>
                    <button>
                        <span>120 វិ.</span>
                    </button>
                    <button>
                        <span>
                            <FontAwesomeIcon className={menu.icon} icon={faScrewdriverWrench} />
                        </span>
                    </button>
                </div>

                <div className={`${menu.innerright} ${activeButton === 2 ? menu.active : menu.none}`}>
                    <button>
                        <span>ខ្លី</span>
                    </button>
                    <button>
                        <span>មធ្យម</span>
                    </button>
                    <button>
                        <span>វែង</span>
                    </button>
                </div>

                <div className={`${menu.innerright} ${activeButton === 4 ? menu.active : menu.none}`}>
                    <button>
                        <span>ផ្លាស់ប្តូ</span>
                    </button>
                </div>
            </div>

            <div className={menu.smallmenu} onClick={() => setIsPopupVisible(false)}>
                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        setIsPopupVisible(true);
                    }}
                >
                    <span>
                        <FaGear className={menu.icon} />
                        ការកំណត់
                    </span>
                </button>

                {isPopupVisible && (
                    <div className={menu.popup}>
                        <div
                            className={menu.inner}
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className={menu.innertop}>
                                <button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setActiveButton(1);
                                    }}
                                >
                                    <span>
                                        <FontAwesomeIcon className={menu.icon} icon={faClock} />
                                        ពេល
                                    </span>
                                </button>
                                <button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setActiveButton(2);
                                    }}
                                >
                                    <span>
                                        <FontAwesomeIcon className={menu.icon} icon={faQuoteLeft} />
                                        ពាក្យស្លោក
                                    </span>
                                </button>
                                <button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setActiveButton(3);
                                    }}
                                >
                                    <span>
                                        <FontAwesomeIcon className={menu.icon} icon={faBrain} />
                                        សេរីឆ្នៃប្រឌិត
                                    </span>
                                </button>
                                <button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        setActiveButton(4);
                                    }}
                                >
                                    <span>
                                        <FontAwesomeIcon className={menu.icon} icon={faWrench} />
                                        ផ្ទាល់ខ្លួន
                                    </span>
                                </button>
                            </div>

                            <div className={`${menu.innerbottom} ${activeButton === 1 ? menu.active : menu.none}`}>
                                <button>
                                    <span>30 វិ.</span>
                                </button>
                                <button>
                                    <span>60 វិ.</span>
                                </button>
                                <button>
                                    <span>90 វិ.</span>
                                </button>
                                <button>
                                    <span>120 វិ.</span>
                                </button>
                                <button>
                                    <span>កំណត់ពេល</span>
                                </button>
                            </div>

                            <div className={`${menu.innerbottom} ${activeButton === 2 ? menu.active : menu.none}`}>
                                <button>
                                    <span>ខ្លី</span>
                                </button>
                                <button>
                                    <span>មធ្យម</span>
                                </button>
                                <button>
                                    <span>វែង</span>
                                </button>
                            </div>

                            <div className={`${menu.innerbottom} ${activeButton === 4 ? menu.active : menu.none}`}>
                                <button>
                                    <span>ផ្លាស់ប្តូ</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Menu;
