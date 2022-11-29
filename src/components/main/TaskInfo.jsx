import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storage } from "../../firebase/config";
import { onAccept, onDelete } from "../../tools/changeTask";
import Button from "../../UI/Button";
import './styles/taskInfo.less'

const TaskInfo = ({onClose, onChange, title, id, stateTask, description, finished, file})=>{
    const [urlState, setUrl] = useState([])
    useEffect(()=>{
        [...file].map((fileName)=>{
  
           // Create a reference from a Google Cloud Storage URI
           const gsReference = ref(storage, `files/${fileName}`);
           getDownloadURL(gsReference)
              .then((url)=>{
                 setUrl(prevUrl=> [...prevUrl, url])
  
              })  
        })
      }, [])
      const filesCont = urlState.length>0 ? urlState.map((f)=> <li><a href={f} target="_blank" download>{f.substring(f.length-6, f.length-1)}</a></li>) : <p>Файлов нет к этой задаче</p>

    const onDeleteHandler = ()=> {
        onDelete(id)
        onClose()
    }
    const onAcceptHandler = ()=> {
        onAccept(stateTask, id)
        onClose()
    }
    const files = useSelector((state)=> (state.filesSlices))

    const taskInfoTitle = stateTask ? "Задача завершена" : "Задача в работе"
    const btnAcceptTitle = stateTask ? "Вернуть в работу" : "Завершить"

    console.log(files)
    return (
        <div className="task__info">
            <h2>{taskInfoTitle}</h2>
            <h3>Название: </h3> <p>{title}</p>
            <h3>Дата окончания:</h3><p>{finished}</p>
            <h3>Описание: </h3><p>{description}</p>
            <h3>Прикрепленные файлы: </h3><ul>{filesCont}</ul>
            <div className="buttons">
                <Button className="accept" onclick={onAcceptHandler} title={btnAcceptTitle}/>
                <Button className="change" nclick={onChange} title='Изменить'/>
                <Button className="delete" onclick={onDeleteHandler} title='Удалить'/>
                <Button className="close" onclick={onClose} title='Отмена'/>
            </div>
            

        </div>
    )
}

export default TaskInfo;