
import './App.css';
import Home from './pages/Home';
import { PhotoContextProvider as Provider } from './context/photoContext';

function App() {
  return (
    <div className='App'>
      <img src="/nasa.png" alt="nasa-img" width={'80px'}/>
      <Provider>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
