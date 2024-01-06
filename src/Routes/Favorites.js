import React, { useEffect, useState } from 'react';
import {getTranslation, TranslationService, lang} from '../Translations';

function Favorites(){
  const [watchedList, setWatched] = useState([]);
  const [beWatchList, setBeWatch] = useState([]);

  useEffect(() => {
    const fetchMovie = async (element) => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzcxY2I4OTE5ZTYzODhkMTk1NGNmZmU3NTlhYTQ1MCIsInN1YiI6IjYyYTg3OTliNTU0MWZhMDA2NmI5MTAxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r4EQfa-l1_F9YTkdTbNUmUwDGdtfMfCfm9DJFh6h-_8'
        }
      };
  
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${element}?language=${lang()}`, options);
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
        return null;
      }
    };
  
    const fetchData = async () => {
      const watched = JSON.parse(localStorage.getItem('watched')) ?? [];
      const movies = await Promise.all(watched.map(element => fetchMovie(element)));
      setWatched(movies.filter(movie => movie !== null));
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMovie = async (element) => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzcxY2I4OTE5ZTYzODhkMTk1NGNmZmU3NTlhYTQ1MCIsInN1YiI6IjYyYTg3OTliNTU0MWZhMDA2NmI5MTAxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r4EQfa-l1_F9YTkdTbNUmUwDGdtfMfCfm9DJFh6h-_8'
        }
      };
  
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${element}?language=${lang()}`, options);
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
        return null;
      }
    };
  
    const fetchData = async () => {
      const beWatch = JSON.parse(localStorage.getItem('beWatch')) ?? [];
      const movies = await Promise.all(beWatch.map(element => fetchMovie(element)));
      setBeWatch(movies.filter(movie => movie !== null));
    };
  
    fetchData();
  }, []);

  return(
    <>
      <TranslationService />
      <br/><br/><br/>
      <a href='/' className='link'>{getTranslation().back}</a>
      <div className='favorites'>
        <div>
          <h1><span className="material-symbols-outlined">check</span> {getTranslation().alreadyWatched}:</h1>
          <div className='hr'></div>
          <div className='cards'>
            {watchedList.map(content => (
              <div className='card cardFavorites' key={content.id}>
                <img src={content.poster_path ? 'https://www.themoviedb.org/t/p/w220_and_h330_face/'+content.poster_path : 'https://images.placeholders.dev/?width=300&height=450&text=Not%20found'}/>
                <div className='rating'><span className="material-symbols-outlined">star</span> {content.vote_average.toFixed(1)}</div>
                <p>{content.title ?? content.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1><span className="material-symbols-outlined">schedule</span> {getTranslation().beWatch}:</h1>
          <div className='hr'></div>
          <div className='cards'>
            {beWatchList.map(content => (
              <div className='card cardFavorites' key={content.id}>
                <img src={content.poster_path ? 'https://www.themoviedb.org/t/p/w220_and_h330_face/'+content.poster_path : 'https://images.placeholders.dev/?width=300&height=450&text=Not%20found'}/>
                <div className='rating'><span className="material-symbols-outlined">star</span> {content.vote_average.toFixed(1)}</div>
                <p>{content.title ?? content.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
};

export default Favorites;