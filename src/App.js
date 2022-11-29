import './app.less';
import Header from './components/header/Header';
import Main from './components/main/Main';

function App() {

  return (
    <div className="app">
        {/* <PopupBg/> */}
        <Header />
        <Main />
    </div>
  );
}

export default App;
