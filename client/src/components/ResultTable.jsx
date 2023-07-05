import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaTrash } from 'react-icons/fa';

const ResultTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchInsights = async () => {
      const response = await axios.get('http://localhost:9000/insights');
      console.log('respponse>>', response.data);
      setTableData(response.data.result);
    };
    fetchInsights();
  }, []);

  const addToFav = (id) => {
    axios
      .patch('http://localhost:9000/insights/' + id)
      .then((res) => {
        console.log('Response :: ', res);
      })
      .catch((error) => {
        console.log('Axios Error');
        console.log(error);
      });
    window.location.reload();
  };

  const handleDelete = (id) => {
    axios
      .delete('http://localhost:9000/insights/' + id)
      .then((res) => {
        console.log('Response :: ', res);
      })
      .catch((error) => {
        console.log('Axios Error');
        console.log(error);
      });
    window.location.reload();
  };

  return (
    <table className="result-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Domain</th>
          <th>Word Count</th>
          <th>Favourite</th>
          <th>Web Links</th>
          <th>Media Links</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index} style={{ height: '100px' }}>
            <td>{index + 1}</td>
            <td>{row.domain}</td>
            <td>{row.word_count}</td>
            <td>{row.favourite ? 'True' : 'False'}</td>
            <td>
              <div style={{ width: '600px' }} className="scrollable-column">
                {row.web_links.length === 0 ? 'null' : row.web_links.join(', ')}
              </div>
            </td>
            <td>
              <div className="scrollable-column">
                {row.media_links.length === 0 ? 'null' : row.media_links.join(', ')}
              </div>
            </td>
            <td>
              <button onClick={() => addToFav(row.id)}>
                <FaHeart />
              </button>
              <button onClick={() => handleDelete(row.id)}>
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
