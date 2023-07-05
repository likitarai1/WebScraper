import { useState } from 'react';
import axios from 'axios';
import './../App.css';

const InputBox = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = () => {
    axios
      .post('http://localhost:9000/insights/search', { url: searchValue })
      .then((res) => {
        console.log('search insight ', res);
        window.location.reload();
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Enter your URL"
      />
      <button onClick={handleSearch}>Get Insights</button>
    </div>
  );
};

export default InputBox;
