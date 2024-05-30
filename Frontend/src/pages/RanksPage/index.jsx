import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RanksPage = () => {
  const [topManga, setTopManga] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState('All');
  const [tooltip, setTooltip] = useState({ visible: false, content: '', position: { x: 0, y: 0 } });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopManga = async (page) => {
      try {
        const response = await axios.get(`http://localhost:5000/rank/${page}`);
        setTopManga(response.data.data || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching top Manga:', error);
      }
    };

    fetchTopManga(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleMouseEnter = (e, description) => {
    const { clientX, clientY } = e;
    setTooltip({
      visible: true,
      content: description,
      position: { x: clientX, y: clientY }
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, content: '', position: { x: 0, y: 0 } });
  };

  const handleTitleClick = (id) => {
    navigate(`/details/${id}`);
  };

  const filteredManga = topManga.filter(manga => filterType === 'All' || manga.type === filterType);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 pt-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Top Ranked Manga</h1>
        <div className="flex justify-center mb-4">
          {['All', 'Manga', 'Manhwa', 'Novel', 'Light Novel', 'Visual Novel'].map(type => (
            <button
              key={type}
              className={`px-4 py-2 mx-2 rounded-lg transition-colors duration-200 ${filterType === type ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-gray-600`}
              onClick={() => setFilterType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white table-fixed">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-16 py-3 px-4 uppercase font-semibold text-sm">Rank</th>
                <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Title</th>
                <th className="w-16 py-3 px-4 uppercase font-semibold text-sm">Score</th>
                <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Type</th>
                <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">Genre</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredManga.map((manga, index) => (
                <tr key={manga._id} className="hover:bg-gray-200">
                  <td className="w-16 py-3 px-4 text-center">{(currentPage - 1) * 25 + index + 1}</td>
                  <td
                    className="w-1/4 py-3 px-4 cursor-pointer"
                    onClick={() => handleTitleClick(manga._id)}
                    onMouseEnter={(e) => handleMouseEnter(e, manga.description)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {manga.title}
                  </td>
                  <td className="w-16 py-3 px-4 text-center">{manga.score}</td>
                  <td className="w-1/6 py-3 px-4 text-center">{manga.type}</td>
                  <td className="w-1/4 py-3 px-4 text-center">{manga.genre.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-4 w-full">
          {currentPage > 1 && (
            <button
              className="px-4 py-2 mx-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}
          <span className="text-gray-700 mx-4">
            Page {currentPage} of {totalPages}
          </span>
          {totalPages > 1 && (
            <button
              className="px-4 py-2 mx-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          )}
        </div>
      </div>
      {tooltip.visible && (
        <div
          className="absolute bg-gray-800 text-white text-sm rounded-lg py-2 px-4"
          style={{ top: tooltip.position.y + 10, left: tooltip.position.x + 10 }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default RanksPage;