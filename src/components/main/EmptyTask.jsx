import { useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

const EmptyTask = ()=>{
    const [inputState, setInput] = useState(false)

    const addChange = ()=> setInput(true)

    const emptyCont = inputState ? <Input/> : <Button onclick={addChange} className="button" title='Добавить задачу'/>

    return(
        <div className="main__empty">
            <h1>Задач нет😓 </h1>
            {emptyCont}
        </div>
    )
}

export default EmptyTask;