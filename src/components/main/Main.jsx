import { useState } from "react";
import Button from "../../UI/Button";
import EmptyTask from "./EmptyTask";
import Tasks from "./Tasks";
import './styles/main.less'
import dayjs from "dayjs";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUid } from "../../redux/slices/getAuthSlices";


const Main = ()=>{
    
    const [tasksState, setTasksState] = useState(false)
    const dispatch = useDispatch()

    const main = <Tasks tasksState={tasksState}/> 
    const auth = getAuth()
    signInAnonymously(auth)
    .then(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log(uid)
              dispatch(getUid(uid))
              // ...
            } else {
              // User is signed out
              // ...
            }
          });    
        })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
    
    const change = (selectorState)=>{
        setTasksState(selectorState)
    }

    return (
        <div className="main">
            <div className="main_buttons">
                <Button onclick={change} states={false} title='Открытые'/>
                <Button className="finished" onclick={change} states={true} title='Завершенные'/>
            </div>
            {main}
        </div>
    )
}

export default Main;