import './App.css';
import { Container, Col, Row } from 'react-bootstrap';
import React, {useState, useEffect, Component} from 'react';

const Input = (props) => {

    const [enterPressed, setEnterPressed] = useState(false);
    const [correctNumber, setCorrect] = useState([])
    const [submissionCount, setSubmissionCount] = useState([])


    const cancel = (nums) => {
        props.cancelButton(nums)
    }
    const correct = (nums) => {
        props.rightButton(nums)
    }
    const inList = (nums) => {
        props.almostButton(nums)
    }
    const sendEmojis = (emojis) => {
        props.sendEmojis(emojis)
    }


    useEffect(() => {
        setEnterPressed(props.enterPressed)
        setCorrect(props.correctNumber)
        setSubmissionCount(props.submissionCount)
        // console.log("Correct: " + correctNumber)

        if(enterPressed) {
            // console.log("ENTER HAS BEEN PRESSED")
            var inputs = document.getElementsByClassName("numInput");
            var wrongNumbers = [];
            var rightNumbers = [];
            var almostNumbers = [];
            var emojiString = "";
            var count = 0;
            inputs = Array.from(inputs)

            inputs.forEach(element => {
                if (count % 5 == 0 && count != 0) {
                    emojiString += "\n"
                }
                if (element.style.backgroundColor == "rgb(106, 170, 100)") { //green
                    emojiString += '🟩'
                } else if (element.style.backgroundColor == "rgb(201, 180, 88)") { //yellow
                    emojiString += '🟨'
                } else if (element.style.backgroundColor == "rgb(120, 124, 126)") { //blank
                    emojiString += '⬜'
                }
                count++;
            })
            
            if (inputs.length != 10 && inputs.length > 0) {
                inputs = inputs.slice(inputs.length - 10)
            }
            
            for(var i = 0; i < inputs.length; i++) {
                if (i >= inputs.length - 5) {
                    inputs[i].style.backgroundColor = "#FFFFFF"
                    if(submissionCount.length > 6) {
                        inputs[i].style.display="none"
                    }
                }
                else if (correctNumber[i] == inputs[i].innerHTML) { //correct place
                    inputs[i].style.backgroundColor = "#6AAA64"
                    inputs[i].style.color = "#FFFFFF"
                    inputs[i].style.border = "none"
                    rightNumbers.push(inputs[i].innerHTML)
                } else if (correctNumber.includes(parseInt(inputs[i].innerHTML))) { //within string
                    inputs[i].style.backgroundColor = "#C9B458"
                    inputs[i].style.color = "#FFFFFF"
                    inputs[i].style.border = "none"
                    almostNumbers.push(inputs[i].innerHTML)
                } else { //no match
                    inputs[i].style.backgroundColor = "#787C7E"
                    inputs[i].style.color = "#FFFFFF"
                    inputs[i].style.border = "none"
                    wrongNumbers.push(inputs[i].innerHTML)
                }
            }
        }
        // console.log(emojiString)
        cancel(wrongNumbers)
        correct(rightNumbers)
        inList(almostNumbers)
        sendEmojis(emojiString)
    })

    return (

            <Container className="inputContainer">
                <Row>
                    <Col className="inputCol">
                        <div className="numInput">{props.number[0]}</div>
                    </Col>
                    <Col className="inputCol">
                        <div className="numInput">{props.number[1]}</div>
                    </Col>
                    <Col className="inputCol">
                        <div className="numInput">{props.number[2]}</div>
                    </Col>
                    <Col className="inputCol">
                        <div className="numInput">{props.number[3]}</div>
                    </Col>
                    <Col className="inputCol">
                        <div className="numInput">{props.number[4]}</div>
                    </Col>
                </Row>
            </Container>

    )
}

export default Input