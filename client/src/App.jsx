import './App.css';

import InputBox from './components/InputBox';
import ResultTable from './components/ResultTable';

function App() {
  return (
    <div className="container-fluid p-2">
      <h1>Web Scraper</h1>
      <InputBox />
      <ResultTable />
    </div>
  );
}

export default App;
