import Button from "../../UI/Button";
import * as dayjs from 'dayjs'
import "./styles/tasks.less"
import { useEffect, useState } from "react";
import Popup from "../../UI/Popup";
import TaskInfo from "./TaskInfo";
import { db, storage } from './../../firebase/config';
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage"
import TaskItem from "./TaskItem";

var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)
  
const Tasks = ()=>{
    function compareNumbers(a, b) {
        return (a.finished.seconds - b.finished.seconds)
      }
    const [infoState, setInfoState] = useState(false)
    const [tasksState, setTasksState] = useState(true)

    const [tasksArr, setTasks] = useState([])
    const [tasksArr2, setTasks2] = useState([])

    useEffect(()=>{
        const q = query(collection(db, 'tasks'),  where("state", "==", false))
        const q2 = query(collection(db, 'tasks'),  where("state", "==", true))

        // const q1 = query(collection(db, 'tasks'),  orderBy("finished", "asc"))
        
        const tasks = onSnapshot(q, (querySnapshot)=>{
            const arr = []

            querySnapshot.forEach((doc)=>{
                const date = doc.data()
                console.log(date)

                arr.push({...doc.data(), id: doc.id})
            
                arr.sort(compareNumbers)
                //   setTasks((prevState)=>({
                //       ...prevState,
                //        ...doc.data()
                //   }))
            })
            setTasks(arr)

          })
          const tasks2 = onSnapshot(q2, (querySnapshot)=>{
            const arr = []

            querySnapshot.forEach((doc)=>{
                const date = doc.data()
                console.log(date)

                arr.push({...doc.data(), id: doc.id})
            
                arr.sort(compareNumbers)
                //   setTasks((prevState)=>({
                //       ...prevState,
                //        ...doc.data()
                //   }))
            })
            setTasks2(arr)

          })
      
    }, [tasksState])
    console.log(tasksArr)
    const now = dayjs()
    console.log(now)
    console.log('2022-11-28T23:40' < '2022-11-26T23:47')

    const taskItem = tasksArr !== undefined ? tasksArr.map((task)=> 
    <TaskItem 
        title={task.title}
        id={task.id}
        state={task.state}
        description={task.description}
        finished={task.finished}
        file={task.file}
    />) : ''
    const taskItem2 = tasksArr2 !== undefined ? tasksArr2.map((task)=> 
        <TaskItem 
            title={task.title}
            id={task.id}
            state={task.state}
            description={task.description}
            finished={task.finished}
            file={task.file}
        />) : ''
    const onNext = ()=>{
        setTasksState(!tasksState)
    }

    const onCloseHandler = ()=> setInfoState(false)
    const popup = infoState ? <Popup><TaskInfo onClose={onCloseHandler}/></Popup> : ''
    return (
        <div className="main__tasks">
            <h2>Ваши задачи:</h2>
            <div className="task">
                {popup}
                {tasksState ? taskItem : taskItem2}
                <Button onclick={onNext} title='next'/>
            </div>
        </div>
    )
}

export default Tasks;