import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold mb-4">Password Generator</h1>

      <Register />
      <Login />
    </div>
  );
}

export default App;
