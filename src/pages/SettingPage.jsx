import React, { useState } from 'react';
import Nav from '../components/nav.jsx';
import SettingComponent from '../components/setting.jsx';
import style from './../../public/css/settingPage.module.css';
import { FaEyeSlash, FaStop } from 'react-icons/fa';
import { GoSun } from "react-icons/go";
import { MdKey } from "react-icons/md";
import Footer from '../components/footer.jsx';
import Toggle from '../components/toggle.jsx'; 
import Typing from "../components/typing.jsx";

function Setting() {
    const [isNoTimer, setIsNoTimer] = useState(false); 
    const [isAccu100, setAccu100] = useState(false);
    const [islightMode, setlightMode] = useState(false);
    console.log(isNoTimer);
    console.log(isAccu100);
    console.log(islightMode);
    
    return (
        <div>
            <Nav />
            <h1 className={style.tittle}>ការកំណត់</h1>
            <SettingComponent icon={<FaEyeSlash />} name={'ការកំណត់ពេល '} detail={'សម្រាប់បង្ហាញពេលវេលារាប់ចុះ'} fun={<Toggle functName={'NoTimer'} setIsNoTimer={setIsNoTimer}/>}/> 
            <SettingComponent icon={<GoSun />} name={'ផ្ទៃស '} detail={'សម្រាប់បង្ហាញ light mode'} fun={<Toggle functName={'lightMode'} setlightMode={setlightMode}/>}/>
            <SettingComponent icon={<FaStop />} name={'ឈប់ពេលខុស  '} detail={'សម្រាប់អ្នកដែលចង់បានភាពត្រឹមត្រូវ 100%។ ពេលដែលអ្នកវាយខុស នឹងឈប់ជាបន្ទាន់។'} fun={<Toggle functName={'Accu100'} setAccu100={setAccu100}/>}/>
            <SettingComponent icon={<MdKey />} name={'ប្តូរពាក្យសម្ងាត់  '} detail={'ប្តូរពាក្យសម្ថាត់របស់អ្នក'} />
            <Typing isNoTimer={isNoTimer} isAccu100={isAccu100} islightMode={islightMode} />
            <Footer />
        </div>
    );
}

export default Setting;

