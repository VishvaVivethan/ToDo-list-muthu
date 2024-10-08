import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from '../Components/Login';
import Register from '../Components/Register';
import StoryList from '../Components/StoryList';
import TodoList from '../Components/TodoList';
import Fp from '../Components/ForgotPassword';
import Cp from '../Components/changePassword';

function App() {
    const [message, setMessage] = useState('');

    return (
        <Router>
            <div>
                {message && <p>{message}</p>}
                <Routes>
                    <Route path="/login" element={<Login setMessage={setMessage} />} />
                    <Route path="/fp" element={<Fp />} />
                    <Route path="/todolist" element={<TodoList />} />
                    <Route path="/storylist" element={<StoryList />} />
                    <Route path="/" element={<Register setMessage={setMessage} />} />
                    <Route path="/cp" element={<Cp setMessage={setMessage} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;




// import React, { useState } from 'react';
// import Login from '../Components/Login';
// import Register from '../Components/Register';
// import Fp from '../Components/ForgotPassword';
// import Cp from '../Components/changePassword';


// function App() {
//     const [message, setMessage] = useState('');

//     return (
//         <div>
//             <h1>My App</h1>
//             <Login setMessage={setMessage} />
//             <Register  setMessage={setMessage} />
//             <Fp setMessage={setMessage} />
//             <Cp setMessage={setMessage} />

//             {message && <p>{message}</p>}
//         </div>
//     );
// }

// export default App;
