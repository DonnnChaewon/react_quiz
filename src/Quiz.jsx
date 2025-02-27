import React, {useState, useRef} from 'react'
import './Quiz.css'
import {data} from './data'

const Quiz = () => {
    let [index, setIndex] = useState(0)
    let [question, setQuestion] = useState(data[index])
    let [lock, setLock] = useState(false)
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)
    let [explanation, setExplanation] = useState(false)

    let Option1 = useRef(null)
    let Option2 = useRef(null)
    let Option3 = useRef(null)
    let Option4 = useRef(null)
    let option_array = [Option1, Option2, Option3, Option4]

    const checkAnswer = (e, answer) => {
        if(lock === false) {
            setExplanation(true)
            if(question.answer === answer) {
                e.target.classList.add('correct')
                setScore(prev => prev+1)
            } else {
                e.target.classList.add('wrong')
                option_array[question.answer-1].current.classList.add('correct')
            }
            setLock(true)
        }
    };

    const next = () => {
        if(lock === true) {
            if(index === data.length-1) {
                setResult(true)
                return 0
            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            setExplanation(false);
            option_array.map((option) => {
                option.current.classList.remove('wrong')
                option.current.classList.remove('correct')
                return null
            })
        }
    }

    const reset = () => {
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
        setExplanation(false)
    }

    return (
        <div className='container'>
            <h2><center>Quiz</center></h2><hr />
            {result ? <></> : <><h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e) => {checkAnswer(e, 1)}}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => {checkAnswer(e, 2)}}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => {checkAnswer(e, 3)}}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => {checkAnswer(e, 4)}}>{question.option4}</li>
            </ul>
            {explanation && <p>{question.explanation}</p>}
            <button onClick={next}>Next</button>
            <div className="index">{index+1} of {data.length} questions</div></>}
            {result ? <><h2>You answered {score} out of {data.length}</h2><button onClick={reset}>Reset</button></> : <></>}
        </div>
    )
}

export default Quiz