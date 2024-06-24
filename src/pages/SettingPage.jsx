import React, { useState, useEffect } from "react";
import Nav from "../components/nav.jsx";
import SettingComponent from "../components/setting.jsx";
import style from "./../../public/css/settingPage.module.css";
import { FaEyeSlash, FaStop } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { MdKey } from "react-icons/md";
import Footer from "../components/footer.jsx";
import Toggle from "../components/toggle.jsx";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from '@mui/material/styles';
import { auth, updatePassword, reauthenticateWithCredential, database, update, ref as databaseRef, getAuth, EmailAuthProvider, updateProfile, storage } from "../components/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import { IoCloseOutline } from 'react-icons/io5';

function Setting() {
    const [isNoTimer, setIsNoTimer] = useState(() => {
        const storedValue = sessionStorage.getItem("isNoTimer");
        return storedValue ? JSON.parse(storedValue) : false; // Default to false if not stored
    });
    const [isLightMode, setIsLightMode] = useState(() => JSON.parse(localStorage.getItem("isLightMode")) || false);
    const [isAccu100, setIsAccu100] = useState(() => JSON.parse(localStorage.getItem("isAccu100")) || false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [profilePicFile, setProfilePicFile] = useState(null); // New state for the file input
    const [profileName, setProfileName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    useEffect(() => {
        localStorage.setItem("isNoTimer", JSON.stringify(isNoTimer));
        console.log(sessionStorage.getItem("isNoTimer"));
    }, [isNoTimer]);

    useEffect(() => {
        localStorage.setItem("isLightMode", JSON.stringify(isLightMode));
        if (isLightMode) {
            document.documentElement.style.setProperty("--head", "#1E107A");
            document.documentElement.style.setProperty("--focus", "#55C6F0");
            document.documentElement.style.setProperty("--word", "#1D1E1E");
            document.documentElement.style.setProperty("--subback", "#E5DDD4");
            document.documentElement.style.setProperty("--hover", "#1b2028");
            document.documentElement.style.setProperty("--background", "#FFF9F2");
            document.documentElement.style.setProperty("--correct", "#1e90ff");
        } else {
            document.documentElement.style.setProperty("--head", "#1e90ff");
            document.documentElement.style.setProperty("--focus", "#1e90ff");
            document.documentElement.style.setProperty("--word", "#4B5975");
            document.documentElement.style.setProperty("--subback", "#151a21");
            document.documentElement.style.setProperty("--hover", "#dfdfdf");
            document.documentElement.style.setProperty("--background", "#1b2028");
            document.documentElement.style.setProperty("--correct", "#f3f6f3");
        }
    }, [isLightMode]);

    useEffect(() => {
        localStorage.setItem("isAccu100", JSON.stringify(isAccu100));
    }, [isAccu100]);

    const handleNoTimerToggle = () => {
        setIsNoTimer(prevState => {
            const newState = !prevState;
            sessionStorage.setItem("isNoTimer", JSON.stringify(newState));
            console.log(newState ? "turn" : "off"); // Log "turn" if newState is true, otherwise log "off"
            return newState;
        });
    };

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    }

    const handleClickCloseEdit = () => {
        setOpenEdit(false);
    }

    const handleLightModeToggle = () => {
        setIsLightMode((prevState) => !prevState);
    };

    const handleAccu100Toggle = () => {
        setIsAccu100(prevState => {
            const newState = !prevState;
            sessionStorage.setItem("isAccu100", JSON.stringify(newState));
            console.log(newState ? "turn Accu100" : "off Accu100"); // Log based on new state
            return newState;
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    };

    useEffect(() => {
        localStorage.setItem("isNoTimer", JSON.stringify(isNoTimer));
        localStorage.setItem("isAccu100", JSON.stringify(isAccu100));
        localStorage.setItem("islightMode", JSON.stringify(isLightMode));
    }, [isNoTimer, isAccu100, isLightMode]);

    const CloseButton = ({ closeToast }) => (
        <i onClick={closeToast}>
        <IoCloseOutline />
        </i>
    );

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            toast.error("Passwords do not match!", {
                className: style.toastCustomBackground,
                closeButton: <CloseButton />
            });
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            toast.error("No user is signed in.", {
                className: style.toastCustomBackground,
                closeButton: <CloseButton />
            });
            return;
        }

        const credential = EmailAuthProvider.credential(user.email, currentPassword);

        try {
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            toast.success("Password updated successfully!", {
                className: style.toastCustomBackground,
                closeButton: <CloseButton />
            });
            handleClose();
        } catch (error) {
            toast.error("Error updating password: " + error.message, {
                className: style.toastCustomBackground,
                closeButton: <CloseButton />
            });
        }
    };

    const handleEditProfile = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            toast.error("No user is signed in.");
            return;
        }

        try {
            let updatedFields = {};
            if (profileName.trim() !== "") {
                updatedFields.displayName = profileName;
            }

            if (profilePicFile) { 
                const imageRef = storageRef(storage, `profilePics/${user.uid}/${profilePicFile.name}`);
                await uploadBytes(imageRef, profilePicFile);
                const imageUrl = await getDownloadURL(imageRef);
                updatedFields.photoURL = imageUrl;

                // Update user's profile in Firebase Realtime Database
                const userRef = databaseRef(database, 'users/' + user.uid);
                await update(userRef, {
                    user_name: profileName,
                    profileURL: imageUrl // Use the uploaded image URL
                });
            } else if (profilePic.trim() !== "") { // Handle case where a URL string is directly provided
                updatedFields.photoURL = profilePic;

                // Update user's profile in Firebase Realtime Database
                const userRef = databaseRef(database, 'users/' + user.uid);
                await update(userRef, {
                    user_name: profileName,
                    profileURL: profilePic
                });
            } else {
                // Only update the user name in Firebase Realtime Database if no new profile pic is provided
                const userRef = databaseRef(database, 'users/' + user.uid);
                await update(userRef, {
                    user_name: profileName
                });
            }

            // Update user's profile in Firebase Authentication
            await updateProfile(user, updatedFields);

            toast.success("Profile updated successfully!");
            handleClickCloseEdit(); // Close the dialog after successful update
        } catch (error) {
            toast.error("Error updating profile: " + error.message);
        }
    };

    return (
        <div>
            <Nav />
            <h1 className={style.tittle}>ការកំណត់</h1>

            <div className={style.changePass}>
                <SettingComponent
                    icon={<FaEyeSlash />}
                    name={"ការកំណត់ពេល "}
                    detail={"សម្រាប់បង្ហាញពេលវេលារាប់ចុះ"}
                />
                <Toggle isChecked={isNoTimer} handleToggle={handleNoTimerToggle} className={style.toggle} />
            </div>

            <div className={style.changePass}>
                <SettingComponent icon={<GoSun />} name={"ផ្ទៃស "} detail={"សម្រាប់បង្ហាញ light mode"} />
                <Toggle isChecked={isLightMode} handleToggle={handleLightModeToggle} className={style.toggle} />
            </div>

            <div className={style.changePass}>
                <SettingComponent
                    icon={<FaStop />}
                    name={"ឈប់ពេលខុស  "}
                    detail={"សម្រាប់អ្នកដែលចង់បានភាពត្រឹមត្រូវ 100%។ ពេលដែលអ្នកវាយខុស នឹងឈប់ជាបន្ទាន់។"}
                />
                <Toggle isChecked={isAccu100} handleToggle={handleAccu100Toggle} className={style.toggle} />
            </div>

            <div className={style.changePass}>
                <SettingComponent icon={<MdKey />} name={"ប្តូរពាក្យសម្ងាត់"} detail={"ប្តូរពាក្យសម្ថាត់របស់អ្នក"} />
                <button className={style.button} onClick={handleClickOpen}>
                    ប្តូរ
                </button>
            </div>

            <div className={style.changePass}>
                <SettingComponent icon={<MdKey />} name={"ផ្លាស់ប្ដូររូប​​​ និង ឈ្មោះ"} detail={"កែប្រែឈ្មោះនិងរូបភាព​ (profile picture)"} />
                <button className={style.button} onClick={handleClickOpenEdit}>
                    ប្តូរ
                </button>
            </div>

            <React.Fragment>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle style={{backgroundColor: '#4b5975', color: '#fff'}}>ប្តូរពាក្យសម្ងាត់</DialogTitle>
                    <DialogContent>
                        <DialogContentText id={style.input} style={{paddingTop: 10}}>សូមបញ្ចូលព័ត៌មានរបស់អ្នកដើម្បីប្តូរពាក្យសម្ងាត់។</DialogContentText>
                        <TextField
                            autoFocus
                            required
                            id={style.input}
                            margin='dense'
                            label='ពាក្យសម្ងាត់ចាស់'
                            type='password'
                            fullWidth
                            variant='standard'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            InputLabelProps={{
                                id: style.input
                            }}
                        />
                        <TextField
                            required
                            margin='dense'
                            id={style.input}
                            label='ពាក្យសម្ងាតថ្មី'
                            type='password'
                            fullWidth
                            variant='standard'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputLabelProps={{
                                id: style.input
                            }}
                        />
                        <TextField
                            required
                            margin='dense'
                            id={style.input}
                            label='ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់'
                            type='password'
                            fullWidth
                            variant='standard'
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            InputLabelProps={{
                                id: style.input
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleClose} className={style.button}>
                            បោះបង់
                        </button>
                        <button onClick={handlePasswordChange} className={style.button}>
                            ផ្លាស់ប្តូ
                        </button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <React.Fragment>
                <Dialog
                    open={openEdit}
                    onClose={handleClickCloseEdit}
                >
                    <DialogTitle style={{backgroundColor: '#4b5975', color: '#fff'}}>កែប្រែឈ្មោះនិងរូបភាព(profile picture)</DialogTitle>
                    <DialogContent>
                        <DialogContentText>សូមបញ្ចូលព័ត៌មានរបស់អ្នកដើម្បីប្តូរផ្លាស់ប្ដូររូបនិងឈ្មោះ។</DialogContentText>

                        <TextField
                            autoFocus
                            margin='dense'
                            label='រូប'
                            type='file'
                            fullWidth
                            variant='standard'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setProfilePicFile(e.target.files[0])} // Update the file input state
                        />

                        <TextField
                            autoFocus
                            margin='dense'
                            label='ឈ្មោះ'
                            type='text'
                            fullWidth
                            variant='standard'
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleClickCloseEdit} className={style.button}>
                            បោះបង់
                        </button>
                        <button onClick={handleEditProfile} className={style.button}>
                            ផ្លាស់ប្តូ
                        </button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <Footer />
        </div>
    );
}

export default Setting;
