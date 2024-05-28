import React, { useState, useEffect } from 'react';
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel';
import axios from 'axios';

const HomePage = () => {
  const [topManga, setTopManga] = useState([]);
  const [topManhwa, setTopManhwa] = useState([]);
  const [topNovel, setTopNovel] = useState([]);
  const [topLightNovel, setTopLightNovel] = useState([]);

  const [newestManga, setNewestManga] = useState([]);
  const [newestManhwa, setNewestManhwa] = useState([]);
  const [newestNovel, setNewestNovel] = useState([]);
  const [newestLightNovel, setNewestLightNovel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://mymangalist.giovan.live/home');
            const data = response.data;
            console.log('Home Media:', data);

            if (data) {
              if (data.topMedia) {
                console.log('Top Media:', data.topMedia);
                setTopManga(data.topMedia.Manga || []);
                setTopManhwa(data.topMedia.Manhwa || []);
                setTopNovel(data.topMedia.Novel || []);
                setTopLightNovel(data.topMedia['Light Novel'] || []);
              } else {
                console.warn('No topMedia found in the response');
              }

              if (data.newestMedia) {
                console.log('Newest Media:',data.newestMedia);
                setNewestManga(data.newestMedia.Manga || []);
                setNewestManhwa(data.newestMedia.Manhwa || []);
                setNewestNovel(data.newestMedia.Novel || []);
                setNewestLightNovel(data.newestMedia['Light Novel'] || []);
              } else {
                console.warn('No newestMedia found in the response');
              }
            } else {
              console.warn('No data found in the response');
            }
        } catch (error) {
            console.error('Error fetching media:', error);
        }
    };

    fetchData();
  }, []);

  const renderMediaItems = (items) => {
    if (!items || items.length === 0) {
      return <div>No items available</div>;
    }
    return items.map((item, index) => (
      <div key={index} className="bg-gray-300 w-48 h-48 rounded-md p-4 flex flex-col justify-between mx-auto">
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
        <section className="mb-8">
          <div className="bg-[#2c2f48] p-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-white p-4 rounded-t-md text-center">Top 5 Manga</h2>
            <div className="bg-[#2c2f48] p-4 rounded-b-md">
              <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
                showDots={true}
                arrows={true}
              >
                {renderMediaItems(topManga)}
              </Carousel>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="bg-[#2c2f48] p-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-white p-4 rounded-t-md text-center">Top 5 Manhwa</h2>
            <div className="bg-[#2c2f48] p-4 rounded-b-md">
              <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
                showDots={false}
                arrows={true}
              >
                {renderMediaItems(topManhwa)}
              </Carousel>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="bg-[#2c2f48] p-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-white p-4 rounded-t-md text-center">Top 5 Novels</h2>
            <div className="bg-[#2c2f48] p-4 rounded-b-md">
              <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
                showDots={false}
                arrows={true}
              >
                {renderMediaItems(topNovel)}
              </Carousel>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="bg-[#2c2f48] p-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-white p-4 rounded-t-md text-center">Top 5 Light Novels</h2>
            <div className="bg-[#2c2f48] p-4 rounded-b-md">
              <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
                showDots={false}
                arrows={true}
              >
                {renderMediaItems(topLightNovel)}
              </Carousel>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="bg-[#2c2f48] p-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-white p-4 rounded-t-md text-center">Newest Manga</h2>
            <div className="bg-[#2c2f48] p-4 rounded-b-md">
              <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
                showDots={true}
                arrows={true}
              >
                {renderMediaItems(newestManga)}
              </Carousel>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="bg-[#2c2f48] p-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-white p-4 rounded-t-md text-center">Newest Manhwa</h2>
            <div className="bg-[#2c2f48] p-4 rounded-b-md">
              <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
                showDots={false}
                arrows={true}
              >
                {renderMediaItems(newestManhwa)}
              </Carousel>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="bg-[#2c2f48] p-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-white p-4 rounded-t-md text-center">Newest Novels</h2>
            <div className="bg-[#2c2f48] p-4 rounded-b-md">
              <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
                showDots={false}
                arrows={true}
              >
                {renderMediaItems(newestNovel)}
              </Carousel>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <div className="bg-[#2c2f48] p-4 rounded-md shadow-md">
            <h2 className="text-3xl font-bold text-white p-4 rounded-t-md text-center">Newest Light Novels</h2>
            <div className="bg-[#2c2f48] p-4 rounded-b-md">
              <Carousel
                responsive={responsive}
                infinite={true}
                keyBoardControl={true}
                showDots={false}
                arrows={true}
              >
                {renderMediaItems(newestLightNovel)}
              </Carousel>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;