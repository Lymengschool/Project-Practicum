import React from 'react';
import Nav from "../components/nav.jsx";
import style from "./../../public/css/profile.module.css";
import { RiImageAddFill } from "react-icons/ri";

function Profile() {

    return (
        <div>
            <Nav/>
            <div className={style.FirstContainer}>
                <div className={style.FirstBlock}>
                    <div className={style.picture}><RiImageAddFill /></div>
                    <div className={style.nameContainer}>
                        <p className={style.name}>Ly Kongming</p>
                        <p className={style.join}>Joined Since: 01-Jan-2023</p>
                    </div>
                </div>
                <div className={style.secondBlock}>
                    <div className={style.secondBlockContainer}>
                        <div className={style.tests}>
                        <div className={style.test}>តេស្តសរុប</div>
                        <div className={style.Num}>99</div>
                    </div>
                    <div className={style.tests}>
                        <div className={style.test}>ម៉ោងតេស្តសរុប</div>
                        <div className={style.Num}>1:30:15</div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Profile;
