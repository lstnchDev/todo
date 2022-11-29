import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../firebase/config";
import { onAccept, onDelete } from "../../tools/changeTask";
import Button from "../../UI/Button";
import './styles/taskInfo.less'


/**
 * 
 * @param {EventListener} onClose - слушатель для закрытия попапа 
 * @param {EventListener} onClose - слушатель для открытия попапа редактирования задачи 
 * @param {string} title - название задачи
 * @param {string} id - id задачи
 * @param {boolean} stateTask - актуальное состояние задачи (завершен или в работе)
 * @param {string} description - описание задачи
 * @param {object} finished - объект с секундой и наносекундой с определением даты завершения задачи 
 * @param {object} file - объект с информациями о прикрепленных файлов 
 * @returns {React.ReactElement} - компонент с подробной информацией о задаче
 */
const TaskInfo = ({onClose, onChange, title, id, stateTask, description, finished, file})=>{
    
    //состояние с ссылками на прикрепленные файлы
    const [urlFiles, setUrl] = useState([])
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
      //если имеются прикрепленные файлы, то создаенся jsx элемент
      const filesCont = urlFiles.length>0 ? urlFiles.map((f)=> <li><a href={f} target="_blank" download>{f.substring(f.length-6, f.length-1)}</a></li>) : <p>Файлов нет к этой задаче</p>

    //слушатель для удаления задачи
    const onDeleteHandler = ()=> {
        onDelete(id)
        onClose()
    }
    //слушатель для завершения задачи или отправки в работу
    const onAcceptHandler = ()=> {
        onAccept(stateTask, id)
        onClose()
    }

    //переменные для установки тайтлов кнопок в зависимости от состояние задачи
    const taskInfoTitle = stateTask ? "Задача завершена" : "Задача в работе"
    const btnAcceptTitle = stateTask ? "Вернуть в работу" : "Завершить"

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