import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export const onAccept = async (stateTasks, id)=> {
    const question = stateTasks ? "Вы хотите вернуть задачу в работу?" : "Вы хотите завершить задачу?"
    if(window.confirm(question)){
       await updateDoc(doc(db, 'tasks', id),{
          state: !stateTasks 
      })
      return true
    }
    return false

  }
 export const onDelete = async (id)=> {
    if(window.confirm("Вы хотите удалить задачу?")){
       await deleteDoc(doc(db, 'tasks', id))
       return true
    }
    return false
   }
