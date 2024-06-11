import React, { useState, useEffect } from "react";
import Nav from "../components/nav.jsx";
import SettingComponent from "../components/setting.jsx";
import style from "./../../public/css/settingPage.module.css";
import { FaEyeSlash, FaStop } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { MdKey } from "react-icons/md";
import Footer from "../components/footer.jsx";
import Toggle from "../components/toggle.jsx";
import Typing from "../components/typing.jsx";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Setting() {
    const [isNoTimer, setIsNoTimer] = useState(JSON.parse(localStorage.getItem("isNoTimer")) || false);
    const [isAccu100, setAccu100] = useState(JSON.parse(localStorage.getItem("isAccu100")) || false);
    const [islightMode, setlightMode] = useState(JSON.parse(localStorage.getItem("islightMode")) || false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setError(null);
    };

    useEffect(() => {
        localStorage.setItem("isNoTimer", JSON.stringify(isNoTimer));
        localStorage.setItem("isAccu100", JSON.stringify(isAccu100));
        localStorage.setItem("islightMode", JSON.stringify(islightMode));
    }, [isNoTimer, isAccu100, islightMode]);

    return (
        <div>
            <Nav />
            <h1 className={style.tittle}>ការកំណត់</h1>
            <SettingComponent
                icon={<FaEyeSlash />}
                name={"ការកំណត់ពេល "}
                detail={"សម្រាប់បង្ហាញពេលវេលារាប់ចុះ"}
                fun={<Toggle functName={"NoTimer"} setIsNoTimer={setIsNoTimer} />}
            />
            <SettingComponent
                icon={<GoSun />}
                name={"ផ្ទៃស "}
                detail={"សម្រាប់បង្ហាញ light mode"}
                fun={<Toggle functName={"lightMode"} setlightMode={setlightMode} />}
            />
            <SettingComponent
                icon={<FaStop />}
                name={"ឈប់ពេលខុស  "}
                detail={"សម្រាប់អ្នកដែលចង់បានភាពត្រឹមត្រូវ 100%។ ពេលដែលអ្នកវាយខុស នឹងឈប់ជាបន្ទាន់។"}
                fun={<Toggle functName={"Accu100"} setAccu100={setAccu100} />}
            />
            <div className={style.changePass}>
                <div className={style.detail}>
                    <SettingComponent
                        icon={<MdKey />}
                        name={"ប្តូរពាក្យសម្ងាត់"}
                        detail={"ប្តូរពាក្យសម្ថាត់របស់អ្នក"}
                    />
                </div>
                <button className={style.button} onClick={/*openPopup*/ handleClickOpen}>
                    ប្តូរ
                </button>
            </div>

            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    ModalProps={{
                        BackdropProps: {
                            timeout: 500,
                        },
                    }}
                    PaperProps={{
                        component: "form",
                        onSubmit: () => {
                            // event.preventDefault();
                            // const formData = new FormData(event.currentTarget);
                            // const email = formJson.email;
                            // console.log(email);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle id={style.dialogContentText}>ប្តូរពាក្យសម្ងាត់</DialogTitle>
                    <DialogContent>
                        <DialogContentText id={style.dialogContentText}>
                            សូមបញ្ចូលព័ត៌មានរបស់អ្នកដើម្បីប្តូរពាក្យសម្ងាត់។
                        </DialogContentText>

                        <TextField
                            autoFocus
                            required
                            margin='dense'
                            id={style.input}
                            name='confirmPassword'
                            label='ពាក្យសម្រេចចាស់'
                            type='text'
                            fullWidth
                            variant='standard'
                            placeholder='ពាក្យសម្រេចចាស់'
                            InputLabelProps={{
                                shrink: true,
                                style: { color: "white" },
                            }}
                        />

                        <TextField
                            autoFocus
                            required
                            margin='dense'
                            id={style.input}
                            name='newPassword'
                            label='ពាក្យសម្ងាតថ្មី់'
                            type='text'
                            fullWidth
                            variant='standard'
                            placeholder='ពាក្យសម្ងាតថ្មី់'
                            InputLabelProps={{
                                shrink: true,
                                style: { color: "white" },
                            }}
                        />

                        <TextField
                            autoFocus
                            required
                            margin='dense'
                            id={style.input}
                            name='confirmPassword'
                            label='ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់'
                            type='text'
                            fullWidth
                            variant='standard'
                            placeholder='ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់'
                            InputLabelProps={{
                                shrink: true,
                                style: { color: "white" },
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handleClose} id={style.button}>
                            បោះបង់
                        </button>
                        <button type='submit' id={style.button}>
                            ផ្លាស់ប្តូ
                        </button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            {/* <Typing isNoTimer={isNoTimer} isAccu100={isAccu100} islightMode={islightMode} /> */}
            <Footer />
        </div>
    );
}

export default Setting;
