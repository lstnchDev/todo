import Button from "../../UI/Button";
import "./styles/tasks.less"
import { useEffect, useState } from "react";
import Popup from "../../UI/Popup";
import { db } from './../../firebase/config';
import { collection,  onSnapshot, query, where } from "firebase/firestore";
import TaskItem from "./TaskItem";
import Input from "../../UI/Input";
import { useDispatch, useSelector } from "react-redux";
import  { getTasks } from "../../redux/slices/getTaskSlices";
import Modal from 'react-modal';


/**
 * 
 * @param {boolean} tasksState - состояние для определения какой тип задач показывать (открытые или завершенные)
 * @returns {React.ReactElement} - компонент с задачами
 */
const Tasks = ({tasksState})=>{
    const dispatch = useDispatch()

    //состояние для определения открытия и закрытия попапа для кнопки "Добавить задачу"
    const [popupState, setPopup] = useState(false)

    /**
     * функция для сортировки задач по дате
     * @param {[]} a - первый массив с задачами
     * @param {[]} b - второй массив с задачами
     * @returns {string}  
     */
     const sortByDate = (a, b) => {
        console.log((a))
        return (a.finished.seconds - b.finished.seconds)
     }
      
    //получаем из редусера актуальный uid анонимного пользователя
    const uId = useSelector((state)=> state.getAuthSlices.uId)
    
    //слушатель для изменения состояния popupState
    const setAddState = ()=> setPopup(!popupState)
    
    
    //значение для определения названия задач, которое зависит от состояния tasksState
    const myTasks = tasksState ? "Ваши завершенные задачи:" : "Ваши открытые задачи: "

    useEffect(()=>{
        //получение данных из cloud firestore 
        const q = query(collection(db, 'tasks'),  where("state", "==", tasksState), where("uid", "==", uId))
        
        onSnapshot(q, (querySnapshot)=>{
            //переменная для обработки всех задач и диспатча
            const arr = []
            querySnapshot.forEach((doc)=>{
                arr.push({...doc.data(), id: doc.id})
                arr.sort(sortByDate)
            })
            dispatch(getTasks(arr))

          })
      
    }, [tasksState, uId])


    //получение задач из редусера
    const tasks = useSelector((state)=> (state.getTaskSlices.items))

    //проверка на наличие задач и получение компонента задачи, если задачи имеются у пользователя
    const taskItem = tasks.length>0 ? tasks.map((task)=> 
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
            
            {/* модальное окно, для упрощения была использована библиотека react-modal */}
            <Modal 
                ariaHideApp={false}
                id="modal"
                className="modal"
                isOpen={popupState}
                onRequestClose={setAddState}>
                <Popup>
                    <Input onAddState={setAddState}/>
                </Popup>
             </Modal>
                  <h1>{myTasks}</h1>
            <div className="task">
                {taskItem}
              </div>
             

        </div>
    )
}

export default Tasks;