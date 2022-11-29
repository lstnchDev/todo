import dayjs from "dayjs";
import { useState, useEffect } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Popup from "../../UI/Popup";
import "./styles/item.less"
import TaskInfo from "./TaskInfo";
import 'dayjs/locale/ru'
import Modal from 'react-modal';
import { onAccept, onDelete } from "../../tools/changeTask";

//перевод даты на русскую локаль
dayjs.locale('ru')


/**
 * 
 * @param {string} title - название задачи 
 * @param {string} id - id задачи 
 * @param {boolean} stateTask - состояние работы задачи, false - в работе, true - завершена 
 * @param {string} description - описание задачи 
 * @param {object} finished - объект с секундой и наносекундой с определением даты завершения задачи 
 * @param {object} file - объект с информациями о прикрепленных файлов 
 * @returns {React.ReactElement} - компонент с задачей
 */
const TaskItem = ({title, id, stateTask, description, finished, file })=>{

   //получаем актуальное время
   const now = dayjs()

   //состояние для определения открытия или закрытия попапа редактирования
    const [popupChange, setChange] = useState(false)

   //состояние для определения открытия или закрытия попапа с информацией о задаче
    const [popupInfo, setInfo] = useState(false)

    //состояние для определения истечения времени на задачу, сравниваются unix секунды актуального времени и заданного в задаче
    const [deadlineState, setDeadline] = useState(now.unix() < finished.seconds)

   //слушатель для завершении задачи
   const onAcceptHandler = ()=> onAccept(stateTask, id)

   //слушатель для удалении задачи
   const onDeleteHandler =  ()=> onDelete(id)

    
   //переопределяем дату в нужном формате
   const time = dayjs(dayjs.unix(finished.seconds)).format('dddd D MMMM, YYYY HH:mm')
    
   //переменная котороая содержит статус задачи в зависимости от deadlineState
   const timeStateTitle = deadlineState ? <h4 className="process">Задача в процессе: <p>{time}</p></h4> : <h4 className="expired">Задача просрочена: <p>{time}</p></h4>

   useEffect(()=>{
      
      //задаем таймер, который изменяет статус задачи через высчитанное время ((актуальное время - время завершенной задачи)*перевод в милисекунды)
      const timer = setTimeout(()=>{
         setDeadline ((dayjs().unix() < finished.seconds))

      }, (finished.seconds - dayjs().unix())*1000)

      return ()=> clearTimeout(timer)
   }, [finished.seconds])

   //слушатель для кнопки редактирования
     const onChangeHandler = ()=> {
        setChange(!popupChange)
        setInfo(false)

     }

      //слушатель для кнопки нажатия на задачу и получения полной информации о задаче
     const onItemClickHandler=()=>{
        setInfo(!popupInfo)
     }

     //переменная содержащая попап с редактировнием задачи
     const popupChangeItem = <Modal 
            ariaHideApp={false}
            className="modal"
            isOpen={popupChange}
            onRequestClose={onChangeHandler}>
         <Popup><Input onAddState={onChangeHandler} title={title} id={id} description={description} finished={finished.seconds} file={file} statePopup={true} /></Popup> 
     </Modal>

     //переменная содержащая попап с подробной информацией о задаче
     const popupInfoItem = <Modal
                     ariaHideApp={false}
                     className="modal"
                     isOpen={popupInfo}
                     onRequestClose={onItemClickHandler}><Popup><TaskInfo onClose={onItemClickHandler} onChange={onChangeHandler} stateTask={stateTask} title={title} id={id} description={description} finished={time} file={file}/></Popup> </Modal>
     
     return (
        <div className="item" >
                {popupChangeItem}
                {popupInfoItem}
                 <Button  title='🖊️' onclick={onChangeHandler}/>

               <div className="btn__info" onClick={onItemClickHandler}>
                    {timeStateTitle}
                   <div className="info__text">
                     <h2>{title}</h2>
                     <p className="description">{description}</p>
                   </div>
                </div>

            <div className="buttons">
                <Button className="accept" onclick={onAcceptHandler} title="✔"/>
                <Button className="delete" onclick={onDeleteHandler} title="✖"/>
             </div>
        </div>
    )
}
export default TaskItem;