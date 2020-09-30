import React, { useState } from 'react';
import Pollcard from './components/Pollcard.js';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import VoteChart from './components/VoteChart.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'

import './App.css';
import CreatePoll from "./components/CreatePoll.js"

var url = process.env.REACT_APP_SERVER + "/poll/getAll"
// console.log(url);

function App() {

  const user = localStorage.getItem('email');
  // console.log(user);
  const [data, setData] = useState();
  fetch(url).then(async (res) => {
    var data = await res.json()
    setData(data)
  });
  if (!data) {
    return <div>Loading</div>
  }
  return (
    <Router className="App">
      <nav className="navbar">
        <div>
          <Link to='/Pollcard'>Polls</Link>
          <Link to="/CreatePoll" >Create poll</Link>
        </div>
        <div>
          {user == null ? <Link to="/Login" >Login</Link> : <Link to={"/userPage/:" + user} >{user}</Link>}
          {user == null && <Link to="/Signup" >Sign Up</Link>}

        </div>
      </nav>
      <Switch>

        <Route path="/VoteChart" component={VoteChart} />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />

        <Route path="/CreatePoll" component={CreatePoll} />
        <Route path={["/Pollcard",'/' ]} >
          {data.polls.map((item) => {
            return (
              <Pollcard key={item._id} item={item}>
                {item.question}
              </Pollcard>)
          })}
        </Route>
      </Switch>

    </Router>
  )

}



export default App;
