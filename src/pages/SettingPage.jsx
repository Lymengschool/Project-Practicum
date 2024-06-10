import React, { useState, useEffect } from 'react';
import Nav from '../components/nav.jsx';
import SettingComponent from '../components/setting.jsx';
import style from './../../public/css/settingPage.module.css';
import { FaEyeSlash, FaStop } from 'react-icons/fa';
import { GoSun } from "react-icons/go";
import { MdKey } from "react-icons/md";
import Footer from '../components/footer.jsx';
import Toggle from '../components/toggle.jsx'; 
import Typing from "../components/typing.jsx";
import { RxCross2 } from "react-icons/rx";
import { Howl, Howler } from 'howler';
import PopReset from '../components/popUpResetPass.jsx';



function Setting() {
    const [isNoTimer, setIsNoTimer] = useState(JSON.parse(localStorage.getItem('isNoTimer')) || false); 
    const [isAccu100, setAccu100] = useState(JSON.parse(localStorage.getItem('isAccu100')) || false);
    const [islightMode, setlightMode] = useState(JSON.parse(localStorage.getItem('islightMode')) || false);
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
      };

      const closePopup = () => {
        setIsOpen(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setError(null);
      };

      


    useEffect(() => {
        localStorage.setItem('isNoTimer', JSON.stringify(isNoTimer));
        localStorage.setItem('isAccu100', JSON.stringify(isAccu100));
        localStorage.setItem('islightMode', JSON.stringify(islightMode));
    }, [isNoTimer, isAccu100, islightMode]);
    
    return (
        <div>
            <Nav />
            <h1 className={style.tittle}>ការកំណត់</h1>
            <SettingComponent icon={<FaEyeSlash />} name={'ការកំណត់ពេល '} detail={'សម្រាប់បង្ហាញពេលវេលារាប់ចុះ'} fun={<Toggle functName={'NoTimer'} setIsNoTimer={setIsNoTimer}/>}/> 
            <SettingComponent icon={<GoSun />} name={'ផ្ទៃស '} detail={'សម្រាប់បង្ហាញ light mode'} fun={<Toggle functName={'lightMode'} setlightMode={setlightMode}/>}/>
            <SettingComponent icon={<FaStop />} name={'ឈប់ពេលខុស  '} detail={'សម្រាប់អ្នកដែលចង់បានភាពត្រឹមត្រូវ 100%។ ពេលដែលអ្នកវាយខុស នឹងឈប់ជាបន្ទាន់។'} fun={<Toggle functName={'Accu100'} setAccu100={setAccu100}/>}/>
            <div className={style.changePass}>
                <div className={style.detail}>
                     <SettingComponent icon={<MdKey />} name={'ប្តូរពាក្យសម្ងាត់  '} detail={'ប្តូរពាក្យសម្ថាត់របស់អ្នក'} />
                </div>
                <button className={style.button} onClick={openPopup}>ប្តូរ</button>
            </div>


            {isOpen && (
  <div className={style.popupBackground}>
    <div className={style.popup}>
      <div className={style.popupInner}>
        <button className={style.closeBtn} onClick={closePopup}><RxCross2 /></button>
        <form className={style.form}>
          {/* Commented out input fields */}
          <div className={style.formGroup}>
            <label htmlFor="currentPassword" ></label>
            <input className={style.customLabel}
              type="text"
            //   id="currentPassword"
            //   value={currentPassword}
            placeholder="ពាក្យសម្ងាត់ចាស់"
            //   onChange={(e) => setCurrentPassword(e.target.value)}
            //   required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="newPassword" className={style.customLabel}></label>
            <input className={style.customLabel}
              type="text"
            //   id="newPassword"
            //   value={newPassword}
            placeholder="ពាក្យសម្ងាតថ្មី់"
            //   onChange={(e) => setNewPassword(e.target.value)}
            //   required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="confirmNewPassword" className={style.customLabel}></label>
            <input className={style.customLabel}
              type="text"
            //   id="confirmNewPassword"
            //   value={confirmNewPassword}
            placeholder="ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់"
            //   onChange={(e) => setConfirmNewPassword(e.target.value)}
            //   required
            />
          </div>
          {/* {error && <div className={style.error}>{error}</div>} */}
          <button type="submit" className={style.buttonPop}>ផ្លាស់ប្តូ</button>
        </form>
        
      </div>
    </div>
  </div>
)}

<PopReset />


            <Typing isNoTimer={isNoTimer} isAccu100={isAccu100} islightMode={islightMode} />
            <Footer />
        </div>
    );
}

export default Setting;

