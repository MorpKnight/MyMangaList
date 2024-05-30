import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const HomePage = () => {
  const [mediaData, setMediaData] = useState({
    topRatedManga: [], topRatedManhwa: [], topRatedNovel: [],
    topRatedLightNovel: [], topRatedVisualNovel: [], newest: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mymangalist.giovan.live/home');
        if (response.status === 200 && response.data.data) {
          setMediaData({
            topRatedManga: response.data.data.topRatedManga || [],
            topRatedManhwa: response.data.data.topRatedManhwa || [],
            topRatedNovel: response.data.data.topRatedNovel || [],
            topRatedLightNovel: response.data.data.topRatedLightNovel || [],
            topRatedVisualNovel: response.data.data.topRatedVisualNovel || [],
            Newest: response.data.data.newest || []
          });
          setIsLoading(false);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderMediaItems = (items) => {
    if (!items.length) {
      return <div className='text-white'>No items available</div>;
    }
    return items.map((item, index) => (
      <div key={index} className="bg-gray-300 w-48 h-48 rounded-md p-4 flex flex-col justify-between mx-auto hover:cursor-pointer" onClick={() => navigate(`/details/${item._id}`)}>
        <h3 className="text-lg font-bold">{item.title}</h3>
        <p className="text-sm">{item.author}</p>
        <p className="text-sm">Score: {item.score}</p>
      </div>
    ));
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <main className="w-4/5 max-w-5xl mt-20">
        {user && user.role === 'admin' && (
          <button
            className="mb-8 bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-[#7e2d24]"
            onClick={() => navigate('/home/add')}
          >
            Add Media
          </button>
        )}
        {Object.entries(mediaData).map(([key, items], index) => (
          <section className="mb-8" key={index}>
            <div className="bg-[#2c2f48] p-4 rounded-md shadow-md">
              <h2 className="text-3xl font-bold text-white p-4 rounded-t-md text-center">{key.replace('topRated', 'Top Rated ')}{}</h2>
              <div className="bg-[#2c2f48] p-4 rounded-b-md">
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  keyBoardControl={true}
                  showDots={false}
                  arrows={true}
                >
                  {renderMediaItems(items)}
                </Carousel>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default HomePage;