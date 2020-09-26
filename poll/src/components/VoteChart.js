import React, { useState, Checkbox } from 'react';

import style from "./VoteChart.module.css"
import { useForm } from "react-hook-form";
import axios from "axios"
import Button from './Button';
import { PieChart } from 'react-minimal-pie-chart';


function VoteChart(props) {
    
    var colors = [
        "#0074D9",
        "#7FDBFF",
        "#39CCCC",
        "#3D9970",
        "#2ECC40",
        "#01FF70",
        "#FFDC00",
        "#FF851B",
        "#FF4136",
        "#AAAAAA",
        "#DDDDDD",
      ];
    var DATA_URL = "http://192.168.137.1:8080"
    var url = process.env.REACT_APP_SERVER + "/poll/vote"
    const { register, handleSubmit, errors } = useForm();
    const data = props.location.state.item;
    const pieTable = Object.keys(data.options).map((option, index)=>{return {title: option, color: colors[index],value: data.options[option]}})
    var pollId = data._id
    const onSubmit = data => {
        var chosen = [];
        var keys = Object.keys(data);
        if (keys[0] == 'vote') {
            chosen.push(data[keys[0]]);
        }
        else {
            keys.forEach(key => {
                if (data[key]) {
                    chosen.push(key)
                }
            })
        }
        var jsonfile = ({
            pollId: pollId,
            selectedOptionIndex: chosen
        })
        axios.post(url, jsonfile)
        window.location="/Pollcard"
    }
    return (
        <div className={style.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={style.question}>{data.question}</div>
            {Object.keys(data.options).map((option, index) => {
                var ratio=data.totalVotes == 0 ? 0 : Math.round(data.options[option]/data.totalVotes*100)
               
                return (
                    <label>
                        {data.allowMultiChoice == false && <input name="vote" type="radio" value={index} ref={register} />}
                        {data.allowMultiChoice && <input
                            name={index}
                            type="checkbox"
                            ref={register}
                            />}
                            {option}  
                        <span>    {data.options[option]  }</span>
                    </label>
                )
            })}
            <Button type="submit" >Vote</Button>
        </form>

        <PieChart  data={pieTable} className={style.pie}/>
            </div>
    );
}

export default VoteChart;

