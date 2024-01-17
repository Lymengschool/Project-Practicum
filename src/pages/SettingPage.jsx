import React from 'react';
import Nav from '../components/nav.jsx';
import SettingComponent from '../components/setting.jsx';
import style from './../../public/css/SettingPage.module.css';
import { FaEyeSlash, FaStop } from 'react-icons/fa';
import { GoSun } from "react-icons/go";
import { MdKey } from "react-icons/md";
import Footer from '../components/footer.jsx';
import Toggle from '../components/toggle.jsx';

function Setting() {
    return (
        <div>
            <Nav />
            <h1 className={style.tittle}>ការកំណត់</h1>
            <SettingComponent icon={<FaEyeSlash />} name={'ការកំណត់ពេល '} detail={'សម្រាប់បង្ហាញពេលវេលារាប់ចុះ'} fun={<Toggle/>}/> 
            <SettingComponent icon={<GoSun />} name={'ផ្ទៃស '} detail={'សម្រាប់បង្ហាញ light mode'} fun={<Toggle/>}/>
            <SettingComponent icon={<FaStop />} name={'ឈប់ពេលខុស  '} detail={'សម្រាប់អ្នកដែលចង់បានភាពត្រឹមត្រូវ 100%។ ពេលដែលអ្នកវាយខុស នឹងឈប់ជាបន្ទាន់។'} fun={<Toggle/>}/>
            <SettingComponent icon={<MdKey />} name={'ប្តូរពាក្យសម្ងាត់  '} detail={'ប្តូរពាក្យសម្ថាត់របស់អ្នក'} />
            <Footer />
        </div>
    );
}

export default Setting;
