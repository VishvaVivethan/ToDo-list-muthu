
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Components/login';
import Register from '../Components/Register';
import StoryList from '../Components/StoryList';
import TodoList from '../Components/TodoList';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/TodoList" element={<TodoList />} />
                <Route path="/storylist" element={ <StoryList  /> } />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;


// App.js
// import React from 'react';
// import TodoList from '../Components/StoryList';

// function App() {
//   return (
//     <div className="App">
//       <TodoList />
//     </div>
//   );
// }

// export default App;
