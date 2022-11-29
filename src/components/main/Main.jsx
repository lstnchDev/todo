import { useState } from "react";
import Button from "../../UI/Button";
import Tasks from "./Tasks";
import './styles/main.less'
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUid } from "../../redux/slices/getAuthSlices";

/**
 * 
 * @returns {React.ReactElement} - главный компонент с задачами и функциональностью
 */
const Main = ()=>{

    // состояние для показа в Tasks открытых или завершенных задач
    const [tasksState, setTasksState] = useState(false)

    const dispatch = useDispatch()

    const auth = getAuth()

    //анонимная авторизация пользователя firebase для получения uid, по которому пользователь будет получать только свои задачи
    signInAnonymously(auth)
      .then(() => {
          onAuthStateChanged(auth, (user) => {
              if (user) {
                //диспатчим uid пользователя
                dispatch(getUid(user.uid))
              } 
            });    
          })
    
  /**
      слушатель для изменения состояния tasksState при нажатии на кнопки
      @param {boolean} selectorState - переданное от кнопки состояние
  */
    const onTasksStateHandler = (selectorState) => setTasksState(selectorState)

    return (
        <div className="main">
            <div className="main_buttons">
                <Button onclick={onTasksStateHandler} states={false} title='Открытые'/>
                <Button className="finished" onclick={onTasksStateHandler} states={true} title='Завершенные'/>
            </div>
            <Tasks tasksState={tasksState}/> 
          </div>
    )
}

export default Main;