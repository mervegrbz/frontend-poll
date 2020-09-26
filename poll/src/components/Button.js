import React from 'react'
import classname from 'classnames'
import style from "./Button.module.css"
 
function Button({onFunction,className,children,...probs}){
     return<button onClick={onFunction} className={classname(style.button,className)}{...probs}>{children}</button>
 }
 export default Button;
