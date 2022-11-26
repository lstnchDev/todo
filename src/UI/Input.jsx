import { useState } from 'react';
import Button from './Button';
import { db, storage } from './../firebase/config';
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, Firestore, getFirestore, setDoc, Timestamp, updateDoc } from "firebase/firestore"; 

import './input.less'
import dayjs from 'dayjs';
import { async } from '@firebase/util';
const Input = ({onAddState, title, id, state, description, finished, file, statePopup=false })=>{

    const [titleInput, setTitle] = useState(title)
    const [descript, setDescript] = useState(description)
    const [date, setDate] = useState(dayjs(finished).toDate())
    const [fileInput, setFile] = useState(file)

    const onTitleChange = (e)=> setTitle(e.target.value)
    const onDescriptChange = (e)=> setDescript(e.target.value)
    const onDateChange = (e)=> setDate(dayjs(e.target.value).toDate())
    const onFileChange = (e)=> {
        const fileRef = ref(storage, `files/${e.target.files[0].name}`)
        console.log(fileRef)
        uploadBytes(fileRef, e.target.files[0]).then(()=>{
            console.log('load')
        })
        setFile(e.target.files[0])
    }

    const time = (dayjs(date).format("YYYY-MM-DDTHH:mm"))
    console.log(date)
    const onAddTask = async (e)=> {
        e.preventDefault();
        await addDoc(collection(db, 'tasks'), {
            title: titleInput, 
            description: descript,
            state: false,
            file: "",
            finished: Timestamp.fromDate(date)
        })
        onAddState()
    }
    
    const onChangeTask = async (e)=>{
        e.preventDefault();
        await updateDoc(doc(db, 'tasks', id),{
            title: titleInput, 
            description: descript,
            state: false,
            file: "",
            finished: Timestamp.fromDate(date)
        })
        onAddState()

    }
    const nameBtn = statePopup ? "Изменить задачу" : "Добавить задачу"

    return (
        <form onSubmit={statePopup ? onChangeTask : onAddTask}>
            <label htmlFor='title'></label>
            <input type='text' htmlFor='title' className='title' placeholder="Имя задачи.." onChange={onTitleChange} value={titleInput}></input>
            <label htmlFor='description'></label>
            <input type='text' htmlFor='description' className='description' placeholder="Описание" onChange={onDescriptChange} value={descript}></input>
            <label for="date">Дата завершения</label>
            <input id="date" type="datetime-local" name="finishedDate" value={time}  onChange={onDateChange} />
            <label htmlFor='file'/>
            <input name='file' type='file' onChange={onFileChange}/>
            <div className='buttons'>
                <input type="submit" value={nameBtn} />
                <Button onclick={onAddState} title="Отмена" />

            </div>
        </form>
    )
}

export default Input;