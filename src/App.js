import './app.less';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { app, db } from './firebase/config';
import { collection, getDocs } from "firebase/firestore";

function App() {

  

  const fetchTask = async ()=>{
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log( doc.data().title);
    });
        // const req = await getDocs(collection(db, "tasks"))
    // req.forEach((task)=>{
    //   console.log(`${task.id} => ${task.data}`)
    // })
    // const tempTasks = req.docs.map((task)=> ({...task.data(), id: task.id}))
    // return(tempTasks)
  }
  console.log(fetchTask())
  return (
    <div className="app">
        <Header />
        <Main />
    </div>
  );
}

export default App;
