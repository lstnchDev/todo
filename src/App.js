import './app.less';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { db, storage } from './firebase/config';
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage"

function App() {

  



  // const listRef = ref(storage, "images")
  // listAll(listRef)
  
  //   .then((res)=>{
  //     res.items.forEach((itemRef)=>{
  //       getDownloadURL(itemRef).then((url)=>[
  //         console.log(url)
  //       ])
  //     })
  //   })

  // const fetchTask = async ()=>{
  //   const querySnapshot = await getDocs(collection(db, "images/uid"));
    

  //   // const imageRef = ref (storage, 'gs://todo-web-3ddbc.appspot.com/76695a65996f3e3c3f122973a133e43e.jpg')

  //   querySnapshot.forEach((doc) => {
  //     console.log( doc.data().title);
  //   });
  // }
  // console.log(fetchTask())
  return (
    <div className="app">
        <Header />
        <Main />
    </div>
  );
}

export default App;
