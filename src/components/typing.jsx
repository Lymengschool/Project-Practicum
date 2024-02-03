import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import style from './../css/typing.module.css';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {  } from "@fortawesome/free-brands-svg-icons";

function Typing() {

    const [timer, setTimer] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [mistake, setMistake] = useState(0);
    const [WPM, setWPM] = useState(0.00);
    const [CPM, setCPM] = useState(0.00);

    function getParaprah() {
        const txt = "យោងតាមប្រភពពី មន្ត្រីនគរបាលខណ្ឌច្បារអំពៅ បានអោយដឹងថា កាលពីថ្ងៃទី១៥ ខែមករា ឆ្នាំ២០២៤ សមត្ថកិច្ចជំនាញបានឃាត់ខ្លួនឈ្មោះ ប្រាក់ ពៅ ភេទប្រុស ជនជាតិខ្មែរ មុខរបរកម្មករសំណង់ ស្នាក់នៅផ្ទះB៥ ភូមិតាងៅក្រោម សង្កាត់និរោធ ខណ្ឌច្បារអំពៅ ពាក់ព័ន្ធករណីលួចទ្រព្យសម្បត្តិ នៅចំណុចផ្ទះB៤ ភូមិតាងៅក្រោម សង្កាត់និរោធ ខណ្ឌច្បារអំពៅ ។"
        setParagraph(txt)
    }

    function setParagraph(txt) {
        var content = $('.text-content')
        content.empty();
        txt.split("").forEach(char => {
            let span = $(`<span>${char}</span>`); 
            // console.log(str)

            content.append(span)
            
        })
        return ;
    }
    function focusOnInput(e) {
        const content = $('.text-content').find('span')
        const input = $('.text-input')
            input.focus()
    }
    function handleKeyDown(e) {
        const content = $('.text-content').find('span')
        const input = $('.text-input')
            input.focus()
        var inputValue = input.val()
        var inputLength = inputValue.length
        var inputIndex = inputLength - 1 || 0
        console.log("split", e)

        if (e.nativeEvent.inputType === 'deleteContentBackward') {
            // Backspace key was pressed
            console.log('Backspace key pressed', content[inputLength]);
            $(content[inputLength]).removeClass(style.incorrect).removeClass(style.correct)
          }

          
        
        console.log($(content[inputIndex]).html(), inputValue.split('')[inputValue.length-1])

        if ($(content[inputIndex]).html() === inputValue.split('')[inputValue.length-1]) {
            console.log('correct')
            $(content[inputIndex]).addClass(style.correct)
        } else {
            console.log("incorrect")
            $(content[inputIndex]).addClass(style.incorrect)
        }


        console.log("key down")
        
        return
       
    }

    useEffect(() => {
        getParaprah();
        window.addEventListener('keydown', focusOnInput);
        
        // getLocations();
        // getPlaces();
        // getAccomodations();
        // getTransportations();
    }, []);
    return (
        <>
            <article>
                <div className="container mt-5">
                    <input type="text" className="text-input" onChange={handleKeyDown} style={{opacity: 0}}/>
                    <p className={`${style.typing} text-content`}>
                    </p>
                </div>
            </article>
        </>
    );
}

export default Typing;
