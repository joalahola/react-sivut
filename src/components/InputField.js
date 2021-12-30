import React from "react"

/* Alustetaan inputField  */
const InputField = (props) => {

    let date = props.value
    let change = props.onChange
    let text = props.description
    return (
      <div>
        {text} <input value={date} onChange = {change} type='date'/>
      
      </div>
    )
  }
  export default InputField