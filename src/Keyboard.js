import axios from 'axios';
import React, {memo, useState, useEffect, Component} from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import Input from './Input';
import Swal from 'sweetalert2'
import { types, useAlert } from 'react-alert'
import './App.css';

const Keyboard = (props) => {
    const alert = useAlert()
    const [numbers, setNumbers] = useState([])
    const [correctNumber, setCorrect] = useState([]);
    const [enterPressed, setEnterPressed] = useState(false)
    const [submissionCount, setSubmissionCount] = useState([""])
    const [data, setData] = useState([])
    const [haveWon, setWin] = useState(false)
    const [haveLost, setLose] = useState(false)
    const [count, setUpdateCount] = useState(0) //this is to force update in submit
    const [emojis, setEmojis] = useState("")

    useEffect(() => {
        var correctArray = [5];
        for (var i = 0; i < 5; i++) {
            correctArray[i] = Math.floor(Math.random() * 9)
        }
        setCorrect(correctArray);
    }, [])

    useEffect(() => {
        console.log(data)
        if (submissionCount.length > 6 && !haveWon) {
            setLose(true)
            lose();
        }
    })

    const numClick = (e) => {
        if(!haveWon && !haveLost) {
            if(numbers.length == 5) {
                return;
            }
            setNumbers(numbers.concat(e.target.innerHTML)) 
        }
    }

    const submit = () => {
        if(!haveWon && !haveLost) {
            if (numbers.length < 5) {
                // not enough numbers alert here
                return;
            } else {
                setUpdateCount(count => count+1)
                setSubmissionCount(submissionCount.concat(""))
                setData(data.concat([numbers]))
                setEnterPressed(true);
                setNumbers([])     
            }
        } 
    }

    const deleteEntry = () => {
        if (!haveWon && !haveLost) {
            numbers.splice(numbers.length-1, 1)
            setEnterPressed(false)
            setUpdateCount(count => count+1)
        }       
    }

    const win = () => {
        // console.log("WINNER")
        Swal.fire({
            customClass: {
                confirmButton: 'share',
                title: 'title',
                text: 'modalText'
            },
            text: 'You found the number!',
            showCancelButton: false,
            confirmButtonText: 'SHARE',
            confirmButtonColor: "#6AAA64"
        }).then((result) => {
            if(result.isConfirmed) {
                var guessCount =  emojis.split(/\r\n|\r|\n/).length - 1
                //copy emojis state to clipboard
                navigator.clipboard.writeText(
                    "Numberle " + guessCount  + "/6 " + "\n\n" + emojis
                )
                alert.show("Copied result to clipboard!")
            }
        })
    }

    const lose = () => {
        // console.log("LOSER")
        Swal.fire({
            customClass: {
                confirmButton: 'share',
                title: 'title',
                text: 'modalText'
            },
            text: 'Nice try! The number was ' + correctNumber.join('').toString() + '. Good luck next time!',
            showCancelButton: false,
            confirmButtonText: 'SHARE',
            confirmButtonColor: "#6AAA64"
        }).then((result) => {
            if(result.isConfirmed) {
                var guessCount =  emojis.split(/\r\n|\r|\n/).length - 1
                //copy emojis state to clipboard
                navigator.clipboard.writeText(
                    "Numberle " + guessCount  + "/6 " + "\n\n" + emojis
                )
                alert.show("Copied result to clipboard!")
            }
        })
    }


    const cancelButton = (wrongButtons) => {
        var buttons = Array.from(document.getElementsByClassName("numButton"));
        for (var i = 0; i < buttons.length; i++) {
            if (wrongButtons && wrongButtons.includes(buttons[i].innerHTML)) {
                buttons[i].style.backgroundColor = "#787C7E"
                buttons[i].style.color = "#FFFFFF"
            }
        }
    }
    const rightButton = (rightButtons) => {
        var buttons = Array.from(document.getElementsByClassName("numButton"));
        for (var i = 0; i < buttons.length; i++) {
            if (rightButtons && rightButtons.includes(buttons[i].innerHTML)) {
                buttons[i].style.backgroundColor = "#6AAA64"
                buttons[i].style.color = "#FFFFFF"
            }
        }
        if (rightButtons && rightButtons.length == 5) {
            setWin(true)
            win();
        }
    }
    const almostButton = (almostButtons) => {
        var buttons = Array.from(document.getElementsByClassName("numButton"));
        for (var i = 0; i < buttons.length; i++) {
            if (almostButtons && almostButtons.includes(buttons[i].innerHTML)) {
                if (buttons[i].style.backgroundColor != "rgb(106, 170, 100)") {
                    buttons[i].style.backgroundColor = "#C9B458"
                    buttons[i].style.color = "#FFFFFF"
                }               
            }
        }
    }
    const getEmojis = (emojis) => {
        setEmojis(emojis)
    }

    return (

        <div>
            <div className="inputSpacer">
            {
                data.length == 0 ? 
                 <Input number={numbers} correctNumber={correctNumber} enterPressed={enterPressed} cancelButton={cancelButton}
                    rightButton={rightButton} almostButton={almostButton} sendEmojis={getEmojis} submissionCount={submissionCount}></Input> : null
            }
            {
                submissionCount.map((current, index) => {
                    if (index <= data.length-1 && data.length != 0) {
                        return (               
                           <Input key={index} number={data[index]} correctNumber={correctNumber} enterPressed={true} cancelButton={cancelButton}
                                rightButton={rightButton} almostButton={almostButton} sendEmojis={getEmojis} submissionCount={submissionCount}></Input>              
                        )
                    } else {
                        if (data.length != 0) {
                            return (
                                <Input key={index} number={numbers} correctNumber={correctNumber} enterPressed={enterPressed} cancelButton={cancelButton}
                                    rightButton={rightButton} almostButton={almostButton} sendEmojis={getEmojis} submissionCount={submissionCount}></Input>                           
                            )
                        }
                        
                    }
                })
            }
            </div>
            
            
            <Container className="numContainer">
                <Row className="numRow">
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">0</Button>
                    </Col>
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">1</Button>
                    </Col>
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">2</Button>
                    </Col>
                </Row>
                <Row className="numRow">
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">3</Button>
                    </Col>
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">4</Button>
                    </Col>
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">5</Button>
                    </Col>
                </Row>
                <Row className="numRow">
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">6</Button>
                    </Col>
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">7</Button>
                    </Col>
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">8</Button>
                    </Col>
                </Row>
                <Row className="numRow">
                    <Col lg={4} xs={4}>
                        <Button onClick={(e) => numClick(e)} className="numButton">9</Button>
                    </Col>
                    <Col lg={4} xs={4}>
                        <Button onClick={() => deleteEntry()} className="numButton">x</Button>
                    </Col>
                    <Col lg={4} xs={4}>
                        <Button onClick={() => submit()} className="numButton">ent</Button>
                    </Col>
                </Row>
            </Container>
        </div>
        
    )
}

export default memo(Keyboard)