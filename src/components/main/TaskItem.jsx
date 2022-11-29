import dayjs from "dayjs";
import { getBlob, getDownloadURL, ref } from "firebase/storage";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase/config";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Popup from "../../UI/Popup";
import "./styles/item.less"
import TaskInfo from "./TaskInfo";
import 'dayjs/locale/ru'
import Modal from 'react-modal';
import { onAccept, onDelete } from "../../tools/changeTask";
import { useDispatch, useSelector } from "react-redux";

dayjs.locale('ru')

console.log(dayjs.locale() )

const TaskItem = ({title, id, stateTask, description, finished, file, })=>{
   const now = dayjs()


   console.log(stateTask)
    const [popupChange, setChange] = useState(false)
    const [popupInfo, setInfo] = useState(false)
    const [deadlineState, setDeadline] = useState(now.unix() < finished.seconds)

   const onAcceptHandler = ()=> onAccept(stateTask, id)
    const onDeleteHandler =  ()=> onDelete(id)
    const arrName = []

    console.log(file)
    

   const time = dayjs(dayjs.unix(finished.seconds)).format('dddd D MMMM, YYYY HH:mm')
    
   const timeStateTitle = deadlineState ? <h4 className="process">Задача в процессе: <p>{time}</p></h4> : <h4 className="expired">Задача просрочена: <p>{time}</p></h4>
   console.log(finished.seconds - dayjs().unix() )

   useEffect(()=>{
      // dispatch(getFiles({id, file}))
      const timer = setTimeout(()=>{
         console.log(dayjs().unix() - finished.seconds)
         setDeadline ((dayjs().unix() < finished.seconds))

      }, (finished.seconds - dayjs().unix())*1000)

      return ()=> clearTimeout(timer)
   }, [finished.seconds])
     const onChange = ()=> {
        setChange(!popupChange)
        setInfo(false)

     }
     const onItemClick=()=>{
        setInfo(!popupInfo)
     }

     const popupChangeItem = <Modal 
            className="modal"
            isOpen={popupChange}
            onRequestClose={onchange}>
         <Popup><Input onAddState={onChange} title={title} id={id} description={description} finished={finished.seconds} file={file} statePopup={true} /></Popup> 
     </Modal>
   //   const popupInfoItem = popupInfo ? <Popup><TaskInfo onClose={onItemClick} title={title} id={id} description={description} finished={time} file={file}/></Popup> : ""
     const popupInfoItem = <Modal
                     className="modal"
                     isOpen={popupInfo}
                     onRequestClose={onItemClick}><Popup><TaskInfo onClose={onItemClick} onChange={onChange} stateTask={stateTask} title={title} id={id} description={description} finished={time} file={file}/></Popup> </Modal>
     return (
        <div className="item" >
                {popupChangeItem}
                {popupInfoItem}
                 <Button  title='🖊️' onclick={onChange}/>

               <div className="btn__info" onClick={onItemClick}>
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