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
    const [date, setDate] = useState(finished)
    const [fileInput, setFile] = useState([])
    const [errorState, setError] = useState(false)

    const onTitleChange = (e)=> setTitle(e.target.value)
    const onDescriptChange = (e)=> setDescript(e.target.value)
    const onDateChange = (e)=> setDate(dayjs(e.target.value).unix())
    const onFileChange = (e)=> {
        console.log(e.target.files)
        console.log(fileInput)

        for (let i = 0; i<e.target.files.length; i++){
            setFile((prevState)=>([
                ...prevState,
                e.target.files[i]
            ]))
        }
      

    }



    const time = (dayjs.unix(date).format("YYYY-MM-DDTHH:mm"))

    console.log(time)
    const onAddTask = async (e)=> {
        e.preventDefault();
        const filesNames = []
        fileInput.map((file)=>{
            console.log(file)
            const fileRef = ref(storage, `files/${file.name}`)
            filesNames.push(file.name)
            uploadBytes(fileRef, file).then(()=>{
                console.log('load')
            })
        })
        try{
             await addDoc(
                collection(db, 'tasks'), {
               title: titleInput, 
               description: descript,
               state: false,
               file: filesNames,
               finished: Timestamp.fromDate(dayjs(time).toDate())
           })
           onAddState()

        }catch (err) {
            setError(true)
          }
    }
    const error = errorState ? <p className='error'>Заполните все обязательные поля*</p> : ""
    const onChangeTask = async (e)=>{
        e.preventDefault();
        const filesNames = []
        fileInput.map((file)=>{
            console.log(file)
            const fileRef = ref(storage, `files/${file.name}`)
            filesNames.push(file.name)
            uploadBytes(fileRef, file).then(()=>{
                console.log('load')
            })
        })
       
        await updateDoc(doc(db, 'tasks', id),{
            title: titleInput, 
            description: descript,
            state: false,
            file: filesNames,
            finished:  Timestamp.fromDate(dayjs(time).toDate())
        })
        .catch((error)=>{
            console.log(error.message)
        })
        onAddState()

    }
    const nameBtn = statePopup ? "Изменить задачу" : "Добавить задачу"
    return (
        <form onSubmit={statePopup ? onChangeTask : onAddTask}>
            <label htmlFor='title'></label>
            <input type='text' htmlFor='title' className='title' placeholder="*Имя задачи.." onChange={onTitleChange} value={titleInput}></input>
            <label htmlFor='description'></label>
            <input type='text' htmlFor='description' className='description' placeholder="*Описание" onChange={onDescriptChange} value={descript}></input>
            <label for="date">*Дата завершения</label>
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