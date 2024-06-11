import React, { useState } from "react";
import menu from "./../../public/css/menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faQuoteLeft, faBrain, faWrench, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FaGear } from "react-icons/fa6";
import Typing from "../components/typing.jsx";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Menu() {
    const [activeButton, setActiveButton] = useState(1);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [length, setLength] = useState("m");
    const [timer, setTimer] = useState(30);
    const [show, setShow] = useState(false);
    const [onType, setOnType] = useState(false);
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [tempTimer, setTempTimer] = useState(timer);

    const handleClickOpen = () => {
        setOpen(true);
        setDialogOpen(true); // Set dialogOpen to true when the dialog opens
    };

    const handleClose = () => {
        setOpen(false);
        setDialogOpen(false); // Set dialogOpen to false when the dialog closes
    };

    return (
        <div className={menu.container}>
            <div className={`${menu.menublock} ${onType === false ? menu.active : menu.none}`}>
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
                    <button onClick={() => setTimer(30)}>
                        <span>30 វិ.</span>
                    </button>
                    <button onClick={() => setTimer(60)}>
                        <span>60 វិ.</span>
                    </button>
                    <button onClick={() => setTimer(90)}>
                        <span>90 វិ.</span>
                    </button>
                    <button onClick={() => setTimer(120)}>
                        <span>120 វិ.</span>
                    </button>
                    <button onClick={handleClickOpen}>
                        <span>
                            <FontAwesomeIcon className={menu.icon} icon={faScrewdriverWrench} />
                        </span>
                    </button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            id: menu.dialog,
                        }}
                    >
                        <DialogTitle id={menu.dialogContentText}>កំណត់ម៉ោងផ្ទាល់ខ្លួន</DialogTitle>
                        <DialogContent>
                            <DialogContentText id={menu.dialogContentText}>
                            សូមដាក់ពេលដែលចង់កំណត់
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                label="ពេល"
                                id={menu.time}
                                type="number"
                                fullWidth
                                variant="standard"
                                value={tempTimer}
                                onChange={(e) => setTempTimer(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                    style: { color: 'white' },
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <button onClick={handleClose} id={menu.button}>បោះបង់</button>
                            <button onClick={() => { setTimer(tempTimer); handleClose(); }} id={menu.button}>ផ្លាស់ប្ដូរ</button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div className={`${menu.innerright} ${activeButton === 2 ? menu.active : menu.none}`}>
                    <button onClick={() => setLength("s")}>
                        <span>ខ្លី</span>
                    </button>
                    <button onClick={() => setLength("m")}>
                        <span>មធ្យម</span>
                    </button>
                    <button onClick={() => setLength("l")}>
                        <span>វែង</span>
                    </button>
                </div>

                <div className={`${menu.innerright} ${activeButton === 4 ? menu.active : menu.none}`}>
                    <button onClick={() => setShow(true)}>
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
                                <button onClick={() => setTimer(30)}>
                                    <span>30 វិ.</span>
                                </button>
                                <button onClick={() => setTimer(60)}>
                                    <span>60 វិ.</span>
                                </button>
                                <button onClick={() => setTimer(90)}>
                                    <span>90 វិ.</span>
                                </button>
                                <button onClick={() => setTimer(120)}>
                                    <span>120 វិ.</span>
                                </button>
                                <button>
                                    <span>កំណត់ពេល</span>
                                </button>
                            </div>

                            <div className={`${menu.innerbottom} ${activeButton === 2 ? menu.active : menu.none}`}>
                                <button onClick={() => setLength("s")}>
                                    <span>ខ្លី</span>
                                </button>
                                <button onClick={() => setLength("m")}>
                                    <span>មធ្យម</span>
                                </button>
                                <button onClick={() => setLength("l")}>
                                    <span>វែង</span>
                                </button>
                            </div>

                            <div className={`${menu.innerbottom} ${activeButton === 4 ? menu.active : menu.none}`}>
                                <button onClick={() => setShow(true)}>
                                    <span>ផ្លាស់ប្តូ</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {show && (
                <div className={menu.ppopup}>
                    <div className={menu.pinner}>
                        <textarea id='myTextarea'></textarea>
                        <button onClick={() => setShow(false)}>
                            Ok
                        </button>
                    </div>
                </div>
            )}

            <Typing 
                onButtonClick={activeButton} 
                timerm={timer} 
                slength={length} 
                setOnType={setOnType} 
                dialogOpen={dialogOpen} // Pass the dialogOpen state to Typing component
            />
        </div>
    );
}

export default Menu;
