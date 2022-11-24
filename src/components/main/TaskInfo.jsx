import Button from "../../UI/Button";

const TaskInfo = ({onClose})=>{
    return (
        <div className="task">
            <h1>Сделать кофе - Завтра 16:00</h1>
            <p>Нужно прям срочно сделать кофе очень важно это сделать прям уж так да да да да вооот</p>
            <Button onclick={onClose} title='Завершить'/>
            <Button onclick={onClose} title='Редактировать'/>
            <Button onclick={onClose} title='Удалить'/>

            <Button onclick={onClose} title='Закрыть'/>
        </div>
    )
}

export default TaskInfo;