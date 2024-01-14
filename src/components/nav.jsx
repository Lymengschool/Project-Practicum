import React from 'react'
import { Link } from 'react-router-dom'
import nav from '../../public/css/nav.module.css'

function Nav(){
    return(
        <nav>
            <div className={nav.left}>
                <Link><img src="../../img/logo.svg" alt="logo" /></Link>
                <div>
                    <p>Jai Type</p>
                    <p>Ultimate typing Simulator</p>
                </div>
                <Link className={nav.keyboard}><img src="../../img/keyboard.svg" alt="keyboard" /></Link>
            </div>

            <div>
                <Link><img src="../../img/setting.svg" alt="setting" /></Link>
                <Link><img src="../../img/profile.svg" alt="profile" /></Link>
            </div>
        </nav>
    )
}

export default Nav