import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Components/Login';
import Register from '../Components/Register';
import StoryList from '../Components/StoryList';
import TodoList from '../Components/TodoList';
import Fp from '../Components/ForgotPassword';
import Cp from '../Components/changePassword';
import Home from '../Components/home';

function App() {

    return (
        <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    
                    <Route path="/home" element={<Home/>} />
                    <Route path="/fp" element={<Fp />} />
                    <Route path="/todolist" element={<TodoList />} />
                    <Route path="/storylist" element={<StoryList />} />
                    <Route path="/" element={<Register  />} />
                    <Route path="/cp" element={<Cp />} />
                </Routes>

        </Router>
    );
}

export default App;


