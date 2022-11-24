import { useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Popup from "../../UI/Popup";
import './styles/emprtyTask.less'


const EmptyTask = ()=>{
    const [inputState, setInput] = useState(false)

    const setAddState = ()=> setInput(!inputState)

    const emptyCont = inputState ? <Popup><Input onAddState={setAddState}/></Popup> : ''

    return(
        <div className="main__empty">
            <h1>Задач нет😓 </h1>
            {emptyCont}
            <Button onclick={setAddState} className="button" title='Добавить задачу'/>
            <p>sadsadsad</p>
        </div>
    )
}

export default EmptyTask;