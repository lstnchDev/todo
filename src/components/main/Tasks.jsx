import Button from "../../UI/Button";
import "./styles/tasks.less"
import { useEffect, useState } from "react";
import Popup from "../../UI/Popup";
import TaskInfo from "./TaskInfo";
import { db, storage } from './../../firebase/config';
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import TaskItem from "./TaskItem";
import Input from "../../UI/Input";
import { useDispatch, useSelector } from "react-redux";
import getProcessTaskSlices, { getTasks } from "../../redux/slices/getProcessTaskSlices";
import Modal from 'react-modal';

  
const Tasks = ({tasksState})=>{
    function compareNumbers(a, b) {
        return (a.finished.seconds - b.finished.seconds)
      }

    const dispatch = useDispatch()
    const [infoState, setInfoState] = useState(false)

    const [tasksArr, setTasks] = useState([])
    const [inputState, setInput] = useState(false)


    const uId = useSelector((state)=> state.getAuthSlices.uId)
    const setAddState = ()=> setInput(!inputState)
    const onClose = ()=>setInput(false)
    console.log(uId)
    const myTasks = tasksState ? "Ваши завершенные задачи:" : "Ваши открытые задачи: "
    const popupCont = <Modal 
                            className="modal"
                            isOpen={inputState}
                            onRequestClose={onClose}>
                            <Popup>
                                <Input onAddState={setAddState}/>
                            </Popup>
                        </Modal>

    // const pathReference = ref(storage, 'gs://bucket/files/76695a65996f3e3c3f122973a133e43e.jpg');
      

    useEffect(()=>{
        const q = query(collection(db, 'tasks'),  where("state", "==", tasksState), where("uid", "==", uId))
        
        const tasks = onSnapshot(q, (querySnapshot)=>{
            const arr = []

            querySnapshot.forEach((doc)=>{
                const date = doc.data()
                console.log(date)

                arr.push({...doc.data(), id: doc.id})
            
                arr.sort(compareNumbers)
     
            })
            dispatch(getTasks(arr))

          })
      
    }, [tasksState, uId])
    const tasksProcessSelector = useSelector((state)=>{
        return (state.getProcessTaskSlices.items)
    })
    const taskItem = tasksProcessSelector.length>0 ? tasksProcessSelector.map((task)=> 
    <TaskItem 
        key={task.id}
        title={task.title}
        id={task.id}
        stateTask={task.state}
        description={task.description}
        finished={task.finished}
        file={task.file}
    />) : <h2>Задач нет😓</h2>

    return (
        <div className="main__tasks">
            <Button onclick={setAddState} className="button" title='Добавить задачу'/>
            {popupCont}
            <h1>{myTasks}</h1>
            <div className="task">
                {taskItem}
              </div>
             

        </div>
    )
}

export default Tasks;