import { useState } from 'react';
import Button from './Button';
import { db, storage } from './../firebase/config';
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc,  Timestamp, updateDoc } from "firebase/firestore"; 
import './input.less'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

/**
 * 
 * @param {EventListener} onAddState - слушатель для добавления задачи 
 * @param {string} title - название задачи
 * @param {string} id - id задачи
 * @param {string} description - описание задачи
  * @param {object} finished - объект с секундой и наносекундой с определением даты завершения задачи 
 * @param {object} file - объект с информациями о прикрепленных файлов 
 * @param {boolean} statePopup - булен значение для определения компонента Input, false - компонент для добавления задачи; true - компонент для редактирования
 * @returns {React.ReactElement} - компонент с подробной информацией о задаче
 */
const Input = ({onAddState, title, id, description, finished, file, statePopup=false })=>{

    //состояние для определения актуального тайтла для инпута
    const [titleInput, setTitle] = useState(title)
    //состояние для определения актуального описания  для инпута
    const [descript, setDescript] = useState(description)
    //состояние для определения актуальной даты для инпута
    const [date, setDate] = useState(finished)
    //состояние для определения актуальных прикрепленных файлов для инпута
    const [fileInput, setFile] = useState([])
    //состояние для определения состояния валидации для формы
    const [errorState, setError] = useState(false)

    //слушатели для инпутов формы
    const onTitleChange = (e)=> setTitle(e.target.value)
    const onDescriptChange = (e)=> setDescript(e.target.value)
    const onDateChange = (e)=> setDate(dayjs(e.target.value).unix())
    const onFileChange = (e)=> {
        for (let i = 0; i<e.target.files.length; i++){
            setFile((prevState)=>([
                ...prevState,
                e.target.files[i]
            ]))
        }
    }

    //получения актуального uid авторизованного пользователя
    const uId =  useSelector((state)=> state.getAuthSlices.uId)
    

    //переформатирование даты для dateline инпута
    const time = (dayjs.unix(date).format("YYYY-MM-DDTHH:mm"))

    //слушатель для добавления новой задачи в хранилище
    const onAddTask = async (e)=> {
        e.preventDefault();
        const filesNames = []
        fileInput.map((file)=>{
            const fileRef = ref(storage, `files/${file.name}`)
            filesNames.push(file.name)
            uploadBytes(fileRef, file).then()
        })
        try{
             await addDoc(
                collection(db, 'tasks'), {
               title: titleInput, 
               description: descript,
               state: false,
               file: filesNames,
               uid: uId,
               finished: Timestamp.fromDate(dayjs(time).toDate())
           })
           onAddState()

        }catch (err) {
            console.log(error.message)
            setError(true)
          }
    }

    //переменная которая устанавливает jsx с предупреждением при неверном заполнении полей
    const error = errorState ? <p className='error'>Заполните корректно все обязательные поля*</p> : ""

    //слушатель для обновления задачи при редактировании
    const onChangeTask = async (e)=>{
        e.preventDefault();
        const filesNames = []
        fileInput.map((file)=>{
            console.log(file)
            const fileRef = ref(storage, `files/${file.name}`)
            filesNames.push(file.name)
            uploadBytes(fileRef, file).then(()=>{
            })
        })
       
        await updateDoc(doc(db, 'tasks', id),{
            title: titleInput, 
            description: descript,
            state: false,
            file: filesNames,
            uid: uId,
            finished:  Timestamp.fromDate(dayjs(time).toDate())
        })
        .catch((error)=>{
            console.log(error.message)
            setError(true)
        })
        onAddState()

    }

    //название кнопки, которая зависит от состояние попапа
    const nameBtn = statePopup ? "Изменить задачу" : "Добавить задачу"
    return (
        <form onSubmit={statePopup ? onChangeTask : onAddTask}>
            <label htmlFor='title'></label>
            <input type='text' htmlFor='title' className='title' placeholder="*Имя задачи.." onChange={onTitleChange} value={titleInput}></input>
            <label htmlFor='description'></label>
            <input type='text' htmlFor='description' className='description' placeholder="*Описание" onChange={onDescriptChange} value={descript}></input>
            <label htmlFor="date">*Дата завершения</label>
            <input id="date" type="datetime-local" name="finishedDate" value={time}  onChange={onDateChange} multiple/>
            <label htmlFor='file'/>
            <input name='file' type='file' onChange={onFileChange} multiple/>
            {error}

            <div className='buttons'>
                <input type="submit" value={nameBtn} />
                <Button onclick={onAddState} title="Отмена" />
            </div>
        </form>
    )
}

export default Input;