import Button from "../../UI/Button";

const TaskInfo = ({onClose, title, id, state, description, finished, file})=>{
    return (
        <div className="task">
            <h1>{title}- {finished}</h1>
            <p>{description}</p>
            <Button onclick={onClose} title='Завершить'/>
            <Button onclick={onClose} title='Редактировать'/>
            <Button onclick={onClose} title='Удалить'/>

            <Button onclick={onClose} title='Закрыть'/>
        </div>
    )
}

export default TaskInfo;