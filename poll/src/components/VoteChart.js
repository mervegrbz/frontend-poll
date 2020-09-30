import React from 'react';

import style from "./VoteChart.module.css"
import { useForm } from "react-hook-form";
import axios from "axios"
import Button from './Button';
import { PieChart } from 'react-minimal-pie-chart';

var colors = [
    "#AAAAAA",
    "#0074D9",
    "#2ECC40",
    "#7FDBFF",
    "#FF851B",
    "#39CCCC",
    "#3D9970",
    "#01FF70",
    "#DDDDDD",
    "#FFDC00",
    "#FF4136",
];

function VoteChart(props) {
    var url = process.env.REACT_APP_SERVER + "/poll/vote"

    const { register, handleSubmit } = useForm();
    const data = props.location.state.item;
    const pieTable = Object.keys(data.options).map((option, index) => { return { title: option, color: colors[index], value: data.options[option] } })
    var pollId = data._id

    const onSubmit = async data => {
        var chosen = [];
        var keys = Object.keys(data);
        if (keys[0] === 'vote') {
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
        var res = await axios.post(url, jsonfile)
        console.log(res);
        // window.location="/Pollcard"
    }
    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.question}>{data.question}</div>
                {Object.keys(data.options).map((option, index) => {
                    // var ratio = data.totalVotes == 0 ? 0 : Math.round(data.options[option] / data.totalVotes * 100)

                    return (
                        <label>
                            {data.allowMultiChoice === false && <input name="vote" type="radio" value={index} ref={register} />}
                            {data.allowMultiChoice && <input
                                name={index}
                                type="checkbox"
                                ref={register}
                            />}
                            {option}
                            <span>    {data.options[option]}</span>
                        </label>
                    )
                })}
                <Button type="submit" >Vote</Button>
            </form>

            <PieChart data={pieTable} className={style.pie} />
        </div>
    );
}

export default VoteChart;

