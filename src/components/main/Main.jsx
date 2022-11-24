import { useState } from "react";
import Button from "../../UI/Button";
import EmptyTask from "./EmptyTask";
import Tasks from "./Tasks";
import './styles/main.less'
const Main = ()=>{

    const [tasksState, setTasksState] = useState(false)

    const main = tasksState ? <Tasks /> : <EmptyTask />

    const change = (selectorState)=>{
        setTasksState(selectorState)
    }
    return (
        <div className="main">
            <div className="main_buttons">
                <Button onclick={change} states={true} title='Открытые'/>
                <Button onclick={change} states={false} title='Завершенные'/>
            </div>
            {main}
        </div>
    )
}

export default Main;