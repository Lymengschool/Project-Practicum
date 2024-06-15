import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../public/css/typing.module.css";
import clickFile from "./../../public/audio/click.wav";
import clickMistakeFile from "./../../public/audio/mistake_click.wav";

var clickNoise = new Audio(clickFile);
var mistakeClickNoise = new Audio(clickMistakeFile);

function Typing(props) {
    const [isNoTimer, setIsNoTimer] = useState(() => {
        return JSON.parse(sessionStorage.getItem("isNoTimer")) || false;
    });

    const [isAccu100, setIsAccu100] = useState(() => {
        return JSON.parse(sessionStorage.getItem("isAccu100")) || false;
    });

    const playSound = () => {
        clickNoise.play();
    };

    const playMistakeSound = () => {
        mistakeClickNoise.play();
    };

    const { onButtonClick, timerm, slength, setOnType, dialogOpen, textArea } = props;

    const [timer, setTimer] = useState(timerm);
    const [mode, setMode] = useState(1 || onButtonClick);
    const [timerStarted, setTimerStarted] = useState(false);
    const [userHasStartedTyping, setUserHasStartedTyping] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [mistake, setMistake] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [wordCount, setWordCount] = useState(0);

    const navigate = useNavigate();

    function getParagraph() {
        fetch("/../public/data/para.json")
            .then((response) => response.json())
            .then((data) => {
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
        setTimer(timerm);
        setTimerStarted(false);
        setUserHasStartedTyping(false);
        setCorrect(0);
        setMistake(0);
        setCurrentPosition(0);
        setWordCount(0);
        setParagraph(textArea);
    }, [textArea, timerm]);

    useEffect(() => {
        getParagraph();
        if (mode === 1) {
            console.log("Timer Mode");
        } else if (mode === 2) {
            console.log("Quotes Mode");
        } else if (mode === 3) {
            console.log("Free Mind Mode");
        } else {
            console.log("Custom Mode");
        }
    }, [slength, mode]);

    function setParagraph(txt) {
        var content = $(".text-content");
        content.empty();
        txt.split("").forEach((char, index) => {
            let span = $(`<span class="${index === 0 ? style.active : ""}">${char}</span>`);
            content.append(span);
        });
    }

    function resetTypingState() {
        setTimer(timerm);
        setTimerStarted(false);
        setUserHasStartedTyping(false);
        setCorrect(0);
        setMistake(0);
        setCurrentPosition(0);
        setWordCount(0);
        getParagraph();
    }

    // Listen for changes in timerm prop
    useEffect(() => {
        resetTypingState();
    }, [timerm]);

    function focusOnInput(e) {
        const input = $(".text-input");
        const textarea = document.getElementById("myTextarea");
        if (document.activeElement !== textarea) {
            input.focus();
        }
    }

    function handleKeyDown(e) {
        if (dialogOpen) return; // Do not process input if the dialog is open

        if (!timerStarted) {
            setUserHasStartedTyping(true);
            startTimer();
        }

        const content = $(".text-content").find("span");
        const input = $(".text-input");

        input.focus();
        var inputValue = input.val();
        var inputLength = inputValue.length;

        if (e.nativeEvent.inputType === "deleteContentBackward") {
            $(content[currentPosition - 1]).removeClass(style.incorrect).removeClass(style.correct);
            setCurrentPosition(Math.max(0, currentPosition - 1));
            updateActiveCharacter(content, currentPosition - 1);
            if (inputValue.endsWith(" ")) {
                setWordCount((prev) => Math.max(0, prev - 1));
            }
            return;
        }

        if ($(content[currentPosition]).html() === inputValue[inputLength - 1]) {
            playSound();
            $(content[currentPosition]).addClass(style.correct);
            setCorrect((prev) => prev + 1);
            if (inputValue.endsWith(" ")) {
                setWordCount((prev) => prev + 1);
            }
        } 
        
        if ($(content[currentPosition]).html() !== inputValue[inputLength - 1]) {
            playMistakeSound();
            $(content[currentPosition]).addClass(style.incorrect);
            setMistake((prev) => prev + 1);
            if (inputValue.endsWith(" ")) {
                setWordCount((prev) => prev + 1);
            }
            if (isAccu100) {
                return; 
            }
        }

        setCurrentPosition(currentPosition + 1);
        updateActiveCharacter(content, currentPosition + 1);

        if (currentPosition + 1 === content.length) {
            // Navigate to the result page
            navigate("/result");
        }

        // Update typing rate
        const elapsedTimeInMinutes = (timerm - timer) / 60;
        const grossWPM = wordCount / elapsedTimeInMinutes;
        const netWPM = grossWPM - mistake / elapsedTimeInMinutes;
        const cpm = (correct + mistake) / elapsedTimeInMinutes;
        const accuracy = (correct / (correct + mistake)) * 100;
        const timeTaken = timerm - timer;

        localStorage.setItem('wpm', Math.max(0, netWPM).toFixed(2));
        localStorage.setItem('cpm', cpm.toFixed(2));
        localStorage.setItem('accuracy', accuracy.toFixed(2));
        localStorage.setItem('timeTaken', timeTaken);
        
        console.log(`WPM: ${Math.max(0, netWPM).toFixed(2)}`);
        console.log(`CPM: ${cpm.toFixed(2)}`);
        console.log(`Accuracy: ${accuracy.toFixed(2)}%`);
        console.log(`Time taken: ${timeTaken} seconds`);
    }

    const updateActiveCharacter = (content, position) => {
        content.removeClass(style.active);
        if (position < content.length) {
            $(content[position]).addClass(style.active);
        }
    };

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

    const handleMouseMove = () => {
        setOnType(false);
    };

    useEffect(() => {
        getParagraph();
        window.addEventListener("keydown", focusOnInput);
        window.addEventListener("keydown", () => setOnType(true));
        window.addEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <article>
                <div className={style.container}>
                    <div className={`${style.body}`}>
                        {isNoTimer ? null : (
                            <p className={`${style.time} ${onButtonClick === 1 ? style.show : style.none}`}>{timer}</p>
                        )}
                        <div>
                            <input type="text" className="text-input" onChange={handleKeyDown} style={{ opacity: 0 }} disabled={dialogOpen} />
                            <p className={`${style.typing} text-content`}></p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}

export default Typing;
