import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"


/**
 * 
 * @param {boolean} stateTasks - булен значение для определения актуального состояния для задачи, используется для вопроса и задается в запросе updatedoc
 * @param {string} id - id задачи, по которой обновляется определенная задача
 */
export const onAccept = async (stateTasks, id)=> {
   //значение с вопросом, который определяется по значению stateTasks
    const question = stateTasks ? "Вы хотите вернуть задачу в работу?" : "Вы хотите завершить задачу?"

    //вызыывается алерт, если пользователь согласен, то задача завершается или запускается в работу
    if(window.confirm(question)){
       await updateDoc(doc(db, 'tasks', id),{
          state: !stateTasks 
      })
    }
  }

  /**
 * @param {string} id - id задачи, по которой обновляется определенная задача
 */
 export const onDelete = async (id)=> {

   //вызыывается алерт, если пользователь согласен, то задача удаляется
    if(window.confirm("Вы хотите удалить задачу?")){
       await deleteDoc(doc(db, 'tasks', id))
    }
   }
