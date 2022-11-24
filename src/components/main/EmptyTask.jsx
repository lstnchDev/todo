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
            {emptyCont}
            <h1>Задач нет😓</h1>
            <Button onclick={setAddState} className="button" title='Добавить задачу'/>
        </div>
    )
}

export default EmptyTask;