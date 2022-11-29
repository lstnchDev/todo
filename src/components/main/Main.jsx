import { useState } from "react";
import Button from "../../UI/Button";
import EmptyTask from "./EmptyTask";
import Tasks from "./Tasks";
import './styles/main.less'
import dayjs from "dayjs";


const Main = ()=>{
    
    const [tasksState, setTasksState] = useState(false)

    const main = <Tasks tasksState={tasksState}/> 

    const change = (selectorState)=>{
        setTasksState(selectorState)
    }
    return (
        <div className="main">
            <div className="main_buttons">
                <Button onclick={change} states={false} title='Открытые'/>
                <Button className="finished" onclick={change} states={true} title='Завершенные'/>
            </div>
            {main}
        </div>
    )
}

export default Main;