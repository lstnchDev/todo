import { useState } from 'react';
import Button from './Button';

import './input.less'
const Input = ({onAddState})=>{

    const [title, setTitle] = useState()
    const [descript, setDescript] = useState()
    const [date, setDate] = useState()
    const [file, setFile] = useState()

    const onTitleChange = (e)=> setTitle(e.target.value)
    const onDescriptChange = (e)=> setDescript(e.target.value)
    const onDateChange = (e)=> setDate(e.target.value)
    const onFileChange = (e)=> setFile(e.target.value)
    console.log(title, descript, date, file)
    const sef = (e)=> {
        e.preventDefault();
        console.log(12)
    }
    return (
        <form onSubmit={sef}>
            <label htmlFor='title'></label>
            <input type='text' htmlFor='title' className='title' placeholder="Имя задачи.." onChange={onTitleChange}></input>
            <label htmlFor='description'></label>
            <input type='text' htmlFor='description' className='description' placeholder="Описание" onChange={onDescriptChange}></input>
            <label for="date">Дата завершения</label>
            <input id="date" type="datetime-local" name="partydate"  max="2023-01-01T" onChange={onDateChange}/>
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