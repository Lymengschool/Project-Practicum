import React, { useState, useEffect } from 'react';
import Nav from "../components/nav.jsx";
import style from "./../../public/css/profile.module.css";
import Footer from '../components/footer.jsx';
import { RiImageAddFill } from "react-icons/ri";
import { auth, database, ref, get } from "./../components/firebase.jsx";

function Profile() {
    const [user, setUser] = useState(null);
    const [userStats, setUserStats] = useState(null); // State to store user statistics

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                fetchUserStats(user.uid); // Fetch user stats when user is signed in
            } else {
                setUser(null);
            }
        });

        console.log("islogin at login page:", localStorage.getItem('isLogin'));

        return () => unsubscribe();
    }, []);

    const fetchUserStats = async (uid) => {
        try {
            const userStatsRef = ref(database, `users/${uid}/typingStats`);
            const snapshot = await get(userStatsRef);
            if (snapshot.exists()) {
                setUserStats(snapshot.val());
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.error("Error fetching user stats:", error);
        }
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;;

    return (
        <div>
            <Nav/>
            <div className={style.FirstContainer}>
                <div className={style.FirstBlock}>
                    <div className={style.picture}><RiImageAddFill /></div>
                    <div className={style.nameContainer}>
                        <p className={style.name}>{displayName}</p>
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

            <div className={style.secondContainer}>
                <div className={style.firstBlock}>

                    <div className={style.firstBlockContainer}>
                        <div className={style.firstRow}>
                            <p className={style.tittle}>ស្ថិតិថ្ងៃនេះ</p>
                        </div>
                        <div className={style.secondRow}>
                            <div className={style.tests}>
                                <div className={style.test}>ពាក្យក្នុង​​.វ</div>
                                <div className={style.Num}>{userStats ? userStats.wpm : 'Loading...'}</div>
                            </div>
                            <div className={style.tests}>
                                <div className={style.test}>អក្សរក្នុង​​.វ</div>
                                <div className={style.Num}>{userStats ? userStats.cpm : 'Loading...'}</div>
                            </div>
                        </div>

                        <div className={style.thirdRow}> 
                        <div className={style.tests}>
                                            <div className={style.test}>ភាពត្រឹមត្រូវ</div>
                                            <div className={style.Num}>90%</div>
                                        </div>
                                        <div className={style.tests}>
                                            <div className={style.test}>រយ:ពេល</div>
                                            <div className={style.Num}>100s</div>
                            </div>
                        </div>
                        
                        
                    </div> 
            </div>

            <div className={style.firstBlock}>
                    <div className={style.firstBlockContainer}>
                        <div className={style.firstRow}>
                            <p className={style.tittle}>ស្ថិតិសរុប</p>
                        </div>
                        <div className={style.secondRow}>
                            <div className={style.tests}>
                                <div className={style.test}>ពាក្យក្នុង​​.វ</div>
                                <div className={style.Num}>30</div>
                            </div>
                            <div className={style.tests}>
                                <div className={style.test}>អក្សរក្នុង​​.វ</div>
                                <div className={style.Num}>210</div>
                            </div>
                        </div>

                        <div className={style.thirdRow}> 
                        <div className={style.tests}>
                                            <div className={style.test}>ភាពត្រឹមត្រូវ</div>
                                            <div className={style.Num}>90%</div>
                                        </div>
                                        <div className={style.tests}>
                                            <div className={style.test}>រយ:ពេល</div>
                                            <div className={style.Num}>100s</div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>

    
            </div>
            <Footer/>
        </div>
    
    );
}

export default Profile;
