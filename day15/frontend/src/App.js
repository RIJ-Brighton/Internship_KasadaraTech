import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar';
// import { TaskContextProvider } from './context/Context';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <TaskContextProvider> */}
        <Navbar/>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </div>
        {/* </TaskContextProvider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
