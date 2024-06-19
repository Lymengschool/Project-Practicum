import React, { useState, useEffect } from 'react';
import { auth, database, ref, get } from './firebase';

// Utility function to format time from seconds to "h m s"
const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    
    if (h > 0) {
        return `${h}h ${m}m ${s}s`;
    } 
    if (m > 0) {
        return `${m}m ${s}s`;
    }
    return `${s}s`;
};

const useServeData = () => {
    const [user, setUser] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [typingHistoryCount, setTypingHistoryCount] = useState(0);
    const [totalTimeTaken, setTotalTimeTaken] = useState("0h 0m 0s");
    const [totalCurrentCPM, setTotalCurrentCPM] = useState(0);
    const [totalAccuracy, setTotalAccuracy] = useState(0);
    const [todayTimeTaken, setTodayTimeTaken] = useState("0h 0m 0s");
    const [todayCurrentCPM, setTodayCurrentCPM] = useState(0);
    const [todayAccuracy, setTodayAccuracy] = useState(0);
    const [todayWPM, setTodayWPM] = useState(0);
    const [totalWPM, setTotalWPM] = useState(0);
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [joinDate, setJoinDate] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User signed in:", user);
                setUser(user);
                fetchUserStats(user.uid); // Fetch user stats when user is signed in
                fetchTypingStats(user.uid); // Fetch typing stats when user is signed in
            } else {
                console.log("User signed out");
                setUser(null);
                resetStats();
            }
        });

        console.log("islogin at login page:", localStorage.getItem('isLogin'));

        return () => unsubscribe();
    }, []);

    const resetStats = () => {
        setUserStats(null);
        setTypingHistoryCount(0);
        setTotalTimeTaken("0h 0m 0s");
        setTotalCurrentCPM(0);
        setTotalAccuracy(0);
        setTodayTimeTaken("0h 0m 0s");
        setTodayCurrentCPM(0);
        setTodayAccuracy(0);
    };

    const fetchUserStats = async (uid) => {
        try {
            const userStatsRef = ref(database, `users/${uid}`);
            const snapshot = await get(userStatsRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setUserStats(data);
                setUsername(data.user_name);
                setProfilePic(data.profileURL);
                console.log(profilePic)
                setJoinDate(data.last_login);
                console.log("User stats fetched:", data);
            } else {
                console.log("No data available for user stats");
            }
        } catch (error) {
            console.error("Error fetching user stats:", error);
        }
    };

    const fetchTypingStats = async (uid) => {
        try {
            const typingStatsRef = ref(database, `users/${uid}/typingStats`);
            const snapshot = await get(typingStatsRef);
            if (snapshot.exists()) {
                const typingStats = snapshot.val();
                console.log("Typing stats fetched:", typingStats);
                const today = new Date().toISOString().slice(0, 10); // Get today's date in yyyy-mm-dd format
    
                let totalTime = 0;
                let totalCPM = 0;
                let totalAcc = 0;
                let todayTime = 0;
                let todayCPM = 0;
                let todayAcc = 0;
                let todayCount = 0;
                let todayWPM = 0;
                let totalWPM = 0;
                const count = Object.keys(typingStats).length;
    
                for (const key in typingStats) {
                    if (typingStats.hasOwnProperty(key)) {
                        const entry = typingStats[key];
                        const entryDate = new Date(entry.timestamp).toISOString().slice(0, 10); // Convert timestamp to yyyy-mm-dd format
                        console.log(`Processing entry for date: ${entryDate}`); // Debug log for entry date
                        if (entryDate === today) {
                            console.log("Entry matches today's date:", entry); // Debug log for matching entry
                            todayTime += entry.timeTaken;
                            todayCPM += entry.cpm;
                            todayWPM += entry.wpm;
                            todayAcc += entry.accuracy;
                            todayCount++;
                        }
                        totalTime += entry.timeTaken;
                        totalCPM += entry.cpm;
                        totalAcc += entry.accuracy;
                        totalWPM += entry.wpm;
                    }
                }
    
                const avgTodayCPM = todayCount > 0 ? (todayCPM / todayCount) : 0;
                const avgTodayAcc = todayCount > 0 ? (todayAcc / todayCount) : 0;
                const avgTodayWPM = todayCount > 0? (todayWPM / todayCount) : 0;
                const avgTotalWPM = count > 0? (totalWPM / count) : 0;
                const avgTotalCPM = count > 0 ? (totalCPM / count) : 0;
                const avgTotalAcc = count > 0 ? (totalAcc / count) : 0;
        
                setTypingHistoryCount(count);
                setTotalTimeTaken(formatTime(totalTime));
                setTotalCurrentCPM(parseInt(avgTotalCPM));
                setTotalAccuracy(parseInt(avgTotalAcc));
                setTodayTimeTaken(formatTime(todayTime));
                setTodayCurrentCPM(parseInt(avgTodayCPM));
                setTodayAccuracy(parseInt(avgTodayAcc));
                setTodayWPM(parseInt(avgTodayWPM));
                setTotalWPM(parseInt(avgTotalWPM));
    
                console.log("Total time taken:", formatTime(totalTime));
                console.log("Total current CPM:", avgTotalCPM);
                console.log("Total accuracy:", avgTotalAcc);
                console.log("Today's time taken:", formatTime(todayTime));
                console.log("Today's current CPM:", avgTodayCPM);
                console.log("Today's accuracy:", avgTodayAcc);
            } else {
                console.log("No data available for typing stats");
                resetStats();
            }
        } catch (error) {
            console.error("Error fetching typing stats:", error);
            resetStats();
        }
    };
    
    return { user, userStats, username, profilePic, joinDate, typingHistoryCount, totalTimeTaken, totalWPM, todayWPM,
        totalCurrentCPM, totalAccuracy, todayTimeTaken, todayCurrentCPM, todayAccuracy };
};

export { useServeData };
