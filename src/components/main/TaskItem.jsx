import dayjs from "dayjs";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/config";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Popup from "../../UI/Popup";
import "./styles/item.less"
import TaskInfo from "./TaskInfo";

var calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)
dayjs().calendar(null, {
   sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
   nextDay: '[Tomorrow at] h:mm A', // The next day ( Tomorrow at 2:30 AM )
   nextWeek: 'dddd [at] h:mm A', // The next week ( Sunday at 2:30 AM )
   lastDay: '[Yesterday at] h:mm A', // The day before ( Yesterday at 2:30 AM )
   lastWeek: '[Last] dddd [at] h:mm A', // Last week ( Last Monday at 2:30 AM )
   sameElse: 'DD/MM/YYYY' // Everything else ( 17/10/2011 )
 })

const TaskItem = ({title, id, state, description, finished, file, })=>{
    const [popupChange, setChange] = useState(false)
    const [popupInfo, setInfo] = useState(false)

     const onAccpet = async ()=> {
        await updateDoc(doc(db, 'tasks', id),{
            state: !state 
        })
    }
   const time = dayjs(dayjs.unix(finished.seconds)).format('ddd, MMM D, YYYY h:mm A')
    
   console.log(time)
   const finishedDate = dayjs().calendar(dayjs(time))
   console.log(finishedDate)

     const onDelete = async ()=> {
        await deleteDoc(doc(db, 'tasks', id))
     }
     const onChange = async ()=> {
        setChange(!popupChange)
     }
     const onItemClick=()=>{
        setInfo(!popupInfo)
     }
     const popupChangeItem = popupChange ? <Popup><Input onAddState={onChange} title={title} id={id} description={description} finished={time} file={file} statePopup={true} /></Popup> : ""
     const popupInfoItem = popupInfo ? <Popup><TaskInfo onClose={onItemClick} title={title} id={id} description={description} finished={time} file={file}/></Popup> : ""

     return (
        <div className="item" >
                {popupChangeItem}
                {popupInfoItem}
                 <Button title='🖊️' onclick={onChange}/>

                    <div className="btn__info" onClick={onItemClick}>
                    <h4>{time}</h4>
                    <p>{title}</p>
                </div>

            <div className="buttons">
                <Button onclick={onAccpet} title="✔"/>
                <Button onclick={onDelete} title="✖"/>
             </div>
        </div>
    )
}
export default TaskItem;