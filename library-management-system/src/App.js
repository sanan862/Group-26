import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h2>Library Management System</h2>

      <button onClick={() => navigate("/login")}>Login</button>

      <button onClick={() => navigate("/register")}>Register</button>

    </div>
  );
}

export default App;
