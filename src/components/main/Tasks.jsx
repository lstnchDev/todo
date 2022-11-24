import Button from "../../UI/Button";
import * as dayjs from 'dayjs'
import "./styles/tasks.less"
import { useState } from "react";
import Popup from "../../UI/Popup";
import TaskInfo from "./TaskInfo";

var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)
  
const Tasks = ()=>{

    const [infoState, setInfoState] = useState(false)

    const onAccpet = ()=> console.log('+')
    const dayNow = dayjs().calendar('2022-11-25')
    const onclick = ()=> setInfoState(true)
    const onCloseHandler = ()=> setInfoState(false)
    const popup = infoState ? <Popup><TaskInfo onClose={onCloseHandler}/></Popup> : ''
    return (
        <div className="main__tasks">
            <h2>Ваши задачи:</h2>
            <div className="task">
                <h3>{dayNow}</h3>
                {popup}
                <div className="item" >
                    <Button title='🖊️'/>
                    <div className="btn__info" onClick={onclick}>
                        <p>Сделать кофе</p>
                    </div>
                    <div className="buttons">
                        <Button onclick={onAccpet} title="✔"/>
                        <Button onclick={onAccpet} title="✖"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks;