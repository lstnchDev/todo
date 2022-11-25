import Button from "../../UI/Button";
import * as dayjs from 'dayjs'
import "./styles/tasks.less"
import { useEffect, useState } from "react";
import Popup from "../../UI/Popup";
import TaskInfo from "./TaskInfo";
import { db, storage } from './../../firebase/config';
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage"
import TaskItem from "./TaskItem";

var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)
  
const Tasks = ()=>{

    const [infoState, setInfoState] = useState(false)
    const [tasksArr, setTasks] = useState([])
    useEffect(()=>{
        const q = query(collection(db, 'tasks'))

        const tasks = onSnapshot(q, (querySnapshot)=>{
            const arr = []

            querySnapshot.forEach((doc)=>{
                const date = doc.data()
                console.log(date)

                arr.push({...doc.data(), id: doc.id})
                //   setTasks((prevState)=>({
                //       ...prevState,
                //        ...doc.data()
                //   }))
            })
            setTasks(arr)

          })
      
    }, [])
    console.log(tasksArr)
    
    const taskItem = tasksArr !== undefined ? tasksArr.map((task)=> 
    <TaskItem 
        title={task.title}
        id={task.id}
        state={task.state}
        description={task.description}
        finished={task.finished}
        file={task.file}
    />) : ''
    
    const onCloseHandler = ()=> setInfoState(false)
    const popup = infoState ? <Popup><TaskInfo onClose={onCloseHandler}/></Popup> : ''
    return (
        <div className="main__tasks">
            <h2>Ваши задачи:</h2>
            <div className="task">
                {popup}
                {taskItem}
            </div>
        </div>
    )
}

export default Tasks;