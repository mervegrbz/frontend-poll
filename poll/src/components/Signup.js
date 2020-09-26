import React, { useState } from 'react'
import style from './Login.module.css'
import { useForm } from 'react-hook-form'
import Button from './Button';
import classname from 'classnames'
import axios from 'axios';
import {Redirect} from 'react-router-dom'

function Signup({ children }) {
    const { register, handleSubmit,watch, errors } = useForm();
    const watchPass=watch("password","")
    const watchrePass=watch("rePassword","")

    const [serverResponse,setServerResponse] = useState('')

    async function onSubmit(data) {
        console.log(data);
        var API_URL = process.env.REACT_APP_SERVER + '/user/create'
        if (data.password == data.rePassword) {
            var res = await axios.post(API_URL, data)
            console.log(res);
            setServerResponse(res.data.message)


            if (res.data.message == 'Success') {
                localStorage.setItem('email', data.email)
                console.log('done');
                // return <Redirect to={{pathname:"/",state:{email:data.email}}}/>



            }
        }

    }
    return (
        <div className={style.container}>

            <form className={style.logInForm} onSubmit={handleSubmit(onSubmit)}>
                <input ref={register({ required: true })} name='email' type="email" placeholder="Email"></input>
                <input ref={register({ required: true ,maxLength:30,minLength:7})} name='password' type="password" placeholder="Password"></input>
               
                {errors.password?.type === "required" &&
                "Your input is required"}
                 {errors.password?.type === "minLength" &&
                "Your input is to short"}
                <input ref={register({ required: true })} name='rePassword' type="password" placeholder="Confirm Password"></input>
                {errors.rePassword?.type === "required" &&
                "Your input is required"}
                {watchPass!=watchrePass&&<div>passwords should be the same</div>}
                <Button className={style.log} type="submit">Log In</Button>
            </form>
            {serverResponse==="Success"&& <Redirect to="/Pollcard"/>}
        </div>
    )
}
export default Signup;
