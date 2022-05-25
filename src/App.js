import './App.css';

function App() {
  return (
    <div>
      <form>
        <input type={"file"} accept={".csv"} />
        <button>Import CSV</button>
      </form>
    </div>
  );
}

export default App;
