import { useState } from 'react';
import Button from './Button';
import { db, storage } from './../firebase/config';
import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 

import './input.less'
const Input = ({onAddState, title, id, state, description, finished, file })=>{

    const [titleInput, setTitle] = useState(title)
    const [descript, setDescript] = useState(description)
    const [date, setDate] = useState(finished)
    const [fileInput, setFile] = useState(file)

    const onTitleChange = (e)=> setTitle(e.target.value)
    const onDescriptChange = (e)=> setDescript(e.target.value)
    const onDateChange = (e)=> setDate(e.target.value)
    const onFileChange = (e)=> {
        const fileRef = ref(storage, `files/${e.target.files[0].name}`)
        console.log(fileRef)
        uploadBytes(fileRef, e.target.files[0]).then(()=>{
            console.log('load')
        })
        console.log(12)
        setFile(e.target.files[0])
    }
    console.log(title, descript, date, file)
    const sef = async (e)=> {
        e.preventDefault();
        await addDoc(collection(db, 'tasks'), {
            title: titleInput, 
            description: descript,
            state: false,
            file: "",
            finished: ""
        })
        onAddState()
        console.log(12)
    }
    


    return (
        <form onSubmit={sef}>
            <label htmlFor='title'></label>
            <input type='text' htmlFor='title' className='title' placeholder="Имя задачи.." onChange={onTitleChange} value={titleInput}></input>
            <label htmlFor='description'></label>
            <input type='text' htmlFor='description' className='description' placeholder="Описание" onChange={onDescriptChange} value={descript}></input>
            <label for="date">Дата завершения</label>
            <input id="date" type="datetime-local" name="finishedDate" value={finished}  onChange={onDateChange} />
            <label htmlFor='file'/>
            <input name='file' type='file' onChange={onFileChange}/>
            <div className='buttons'>
                <input type="submit" value="Добавить задачу" />
                <Button onclick={onAddState} title="Отмена" />

            </div>
        </form>
    )
}

export default Input;