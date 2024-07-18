import React from 'react';
import './App.css';
import AddToDo from './components/addtodo';
import Todos from './components/todos';
import Navbar from './components/Navbar';

function App() {
  return (
  <main>
   <h1>WELCOME TO MY PAGE</h1>
   <Navbar/>
   <AddToDo />
   <Todos/>
  </main>
  );
}

export default App;
