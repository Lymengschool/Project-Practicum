import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../public/css/typing.module.css";
import Setting from '../pages/SettingPage';
import clickFile from './../../public/audio/click.wav'
import clickMistakeFile from './../../public/audio/mistake_click.wav'

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {  } from "@fortawesome/free-brands-svg-icons";

var clickNoise = new Audio(clickFile);
var mistakeClickNoise = new Audio(clickMistakeFile);


const sound = new Howl({
    src: [""],
});

function Typing(props) {
    const [isNoTimer, setIsNoTimer] = useState(() => {
        // Retrieve from session storage or default to false
        return JSON.parse(sessionStorage.getItem('isNoTimer')) || false;
    });

    const [isAccu100, setIsAccu100] = useState(() => {
        // Retrieve from session storage or default to false
        return JSON.parse(sessionStorage.getItem('isAccu100')) || false;
    });

    const playSound = () => {
        clickNoise.play();
    
    };

    const playMistakeSound = () => {
        mistakeClickNoise.play();
    
    };

    const { onButtonClick } = props;
    const { timerm } = props;
    const { slength } = props;

    const [timer, setTimer] = useState(timerm);
    const [timerStarted, setTimerStarted] = useState(false);
    const [userHasStartedTyping, setUserHasStartedTyping] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [mistake, setMistake] = useState(0);
    const [WPM, setWPM] = useState(0.0);
    const [CPM, setCPM] = useState(0.0);

    const navigate = useNavigate();

    function getParaprah() {
        fetch("/../public/data/para.json")
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // This will log the fetched data to the console
                let para = "";
                if (slength === "s") {
                    para = data.s[0];
                } else if (slength === "m") {
                    para = data.m[0];
                } else if (slength === "l") {
                    para = data.l[0];
                }
                setParagraph(para);
            });
    }

    useEffect(() => {
        getParaprah();
    }, [slength]);

    function setParagraph(txt) {
        var content = $(".text-content");
        content.empty();
        txt.split("").forEach((char) => {
            let span = $(`<span>${char}</span>`);
            // console.log(str)

            content.append(span);
        });
        return;
    }

    function focusOnInput(e) {
        const content = $(".text-content").find("span");
        const input = $(".text-input");
        const textarea = document.getElementById("myTextarea"); // Get the textarea by its id
        if (document.activeElement !== textarea) {
            // Check if the textarea is not the currently focused element
            input.focus();
        }
    }

    function handleKeyDown(e) {
        if (!timerStarted) {
            setUserHasStartedTyping(true);
            startTimer();
        }
        const content = $(".text-content").find("span");
        const input = $(".text-input");
        input.focus();
        var inputValue = input.val();
        var inputLength = inputValue.length;
        var inputIndex = inputLength - 1 || 0;
        console.log("split", e);

        if (e.nativeEvent.inputType === "deleteContentBackward") {
            // Backspace key was pressed
            console.log("Backspace key pressed", content[inputLength]);
            $(content[inputLength]).removeClass(style.incorrect).removeClass(style.correct);
        }

        console.log($(content[inputIndex]).html(), inputValue.split("")[inputValue.length - 1]);

        if ($(content[inputIndex]).html() === inputValue.split("")[inputValue.length - 1]) {
            console.log("correct");
            playSound();
            $(content[inputIndex]).addClass(style.correct);
        } else {
            console.log("incorrect");
            playMistakeSound()
            $(content[inputIndex]).addClass(style.incorrect);
            console.log(isAccu100);
            if (isAccu100) {
                console.log(isAccu100);
                setTimerStarted(false);
                navigate("/result");
            }

        }

        console.log("key down");

        return;
    }

    const timerRef = useRef(timer);

    useEffect(() => {
        setTimer(timerm);
    }, [timerm]);

    useEffect(() => {
        timerRef.current = timer;
        if (timer === 0 && onButtonClick === 1) {
            setTimerStarted(false);
            navigate("/result");
        }
    }, [timer]);

    const decrementTimer = () => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    };

    const startTimer = () => {
        setTimerStarted(true);
        const countdown = setInterval(() => {
            decrementTimer();
            if (timerRef.current === 0) {
                clearInterval(countdown);
            }
        }, 1000);
    };

    useEffect(() => {
        getParaprah();
        window.addEventListener("keydown", focusOnInput);
        // getLocations();
        // getPlaces();
        // getAccomodations();
        // getTransportations();
    }, []);
    return (
        <>
            <article>
                <div className={style.container}>
                    <div className={`${style.body} ${onButtonClick === 1 ? style.show : style.none}`}>
            
                        
                        {isNoTimer ? null : <p className={style.time}>{timer}</p>}

                        <div>
                            <input type='text' className='text-input' onChange={handleKeyDown} style={{ opacity: 0 }} />
                            <p className={`${style.typing} text-content`}></p>
                        </div>
                    </div>

                    <div className={`${style.body} ${onButtonClick === 2 ? style.show : style.none}`}>
                        <div>
                            <input type='text' className='text-input' onChange={handleKeyDown} style={{ opacity: 0 }} />
                            <p className={`${style.typing} text-content`}></p>
                        </div>
                    </div>

                    <div className={`${style.body} ${onButtonClick === 3 ? style.show : style.none}`}>
                        <div className={style.zen}>
                            <textarea className={`${style.typing}`} />
                        </div>
                    </div>

                    <div className={`${style.body} ${onButtonClick === 4 ? style.show : style.none}`}>
                        <div>
                            <input type='text' className='text-input' onChange={handleKeyDown} style={{ opacity: 0 }} />
                            <p className={`${style.typing} text-content`}></p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}

export default Typing;
