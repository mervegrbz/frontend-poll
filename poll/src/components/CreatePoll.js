
import React, { useState } from 'react';
import style from './CreatePoll.module.css'
import { useForm } from "react-hook-form"
import axios from "axios"
import Minus from "./Minus.js"
import Button from "./Button"
function CreatePoll() {
    const [options, setOptions] = useState(['', ''])
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        if (data[0] === '' | data[1] === '') {
            alert('You must enter at least 2 options')
            return false
        }
        console.log('submitted');
        // console.log(data);
        // console.log(options.length);
        var inputs = []
        for (var i = 0; i < options.length; i++) {
            // inputs.push(data.shift())
            inputs.push(data[i])
        }
        if (data.question === null) {
            alert("question cannot be empty")
        }
        var Poll = {
            question: data.question,
            allowMultiChoice: data.allowMultiChoice,
            IPCheck: data.IPCheck,
            options: inputs,
        }
        axios.post(process.env.REACT_APP_SERVER + '/poll/create', Poll)


    }
    function addOption(e) {
        if (parseInt(e.target.name) === options.length - 1)
            AddButton();
        options[e.target.name] = e.target.value;
        setOptions(options)


    }

    function AddButton() {
        options.push(' ')
        setOptions(options)
    }
    function deleteOption(e) {
        var indexToBeRemoved = (e.target.id);
        if (options.length === 2)
            return
        options.splice(indexToBeRemoved, 1)
        setOptions(options)

    }

    return (
        <div className={style.container}>

            <form onSubmit={handleSubmit(onSubmit)} className={style.poll}>
                <input type="text" name='question' placeholder="Enter your Question" className={style.question} ref={register({ required: true })}></input>
                <label className={style.choice}>
                    Allow Multiple Choice
             <input name="allowMultiChoice" type="checkbox" ref={register} ></input>

                </label>
                <label className={style.choice}>
                    Ip check
             <input name="IPCheck" type="checkbox" ref={register}></input>

                </label>

                {options.map((element, index) => {
                    return <div name={index} className={style.otherbutton} >
                        <input ref={register} name={index} value={options[index]} onChange={addOption} type="text" placeholder='Write an option'>
                        </input>
                        <button id={index} onClick={deleteOption} className={style.svgbutton} >
                            <Minus id={index} name={index} />
                        </button>
                    </div>
                })}

                <Button onFunction={onSubmit}>Submit</Button>

            </form>

        </div>
    )
}


export default CreatePoll;