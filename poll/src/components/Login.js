import React, { useState } from 'react'
import style from './Login.module.css'
import { useForm } from 'react-hook-form'
import Button from './Button';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
function Login({ children }) {
    const { register, handleSubmit } = useForm();
    const [serverResponse, setServerResponse] = useState('')
    const [pop, setpop] = useState(false)

    async function onSubmit(data) {
        var API_URL = process.env.REACT_APP_SERVER + '/user/logIn'
        let res = await axios.post(API_URL, data)
        setServerResponse(res.data.message)
        setpop(true)
        await new Promise(r => setTimeout(r, 2000));
        setpop(false)
        if (res.data.message === "Success") {
            localStorage.setItem('email', data.email);
            return <Redirect to={{ pathname: "/", state: { email: data.email } }} />
        }
    }

    return (
        <div className={style.container}>

            <form className={style.logInForm} onSubmit={handleSubmit(onSubmit)}>
                <input ref={register({ required: true })} name='email' type="email" placeholder="Email"></input>
                <input ref={register({ required: true })} name='password' type="password" placeholder="Password"></input>
                <div className={style.foot}>
                    {pop && <div className={style.popup}>
                        <p className={style.modal}>{serverResponse}</p>
                    </div>
                    }
                    <Button className={style.log} type="submit">Log In</Button>
                </div>
            </form>
            {serverResponse === "Success" && <Redirect to="/Pollcard" />}
        </div>
    )

}
export default Login;
