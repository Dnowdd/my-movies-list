import React, { useEffect, useState } from 'react';
import translations from '../Translations';
import {getTranslation, TranslationService, lang} from '../Translations';

function Popular({language}){
    const [currentPage, setCurrentPage] = useState(1);
    const [trend, setTrend] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzcxY2I4OTE5ZTYzODhkMTk1NGNmZmU3NTlhYTQ1MCIsInN1YiI6IjYyYTg3OTliNTU0MWZhMDA2NmI5MTAxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r4EQfa-l1_F9YTkdTbNUmUwDGdtfMfCfm9DJFh6h-_8'
            }
        };
        fetch(`https://api.themoviedb.org/3/trending/movie/week?language=${lang()}&page=${currentPage}`, options)
            .then(response => response.json())
            .then(response => setTrend(prevTrend => [...prevTrend, ...response.results]))
            .catch(err => console.error(err));
    }, [currentPage])

    const loadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
    }
    

    const watch = (id, type) => {
        if(type === 'watched'){
            const but = document.getElementById('beWatch-'+id);
            const butt = document.getElementById(type+'-'+id);
            const watchedList = JSON.parse(localStorage.getItem(type)) ?? [];

            if (but.style.display === 'none'){
                /* REMOVE CLICK */

                but.style.display = 'block';
                butt.classList.remove(type);

                /* Remove o id da lista */
                const index = watchedList.indexOf(id);
                if(index > -1){
                    watchedList.splice(index, 1);
                }
            }else{
                /* ADD CLICK */

                but.style.display = 'none';
                butt.classList.add(type);

                /* Adiciona o id na lista */
                watchedList.push(id);
            }

            localStorage.setItem(type, JSON.stringify(watchedList));
        }
        if(type === 'beWatch'){
            const but = document.getElementById('watched-'+id);
            const butt = document.getElementById(type+'-'+id);
            const beWatchList = JSON.parse(localStorage.getItem(type)) ?? [];

            if (but.style.display === 'none'){
                /* REMOVE CLICK */

                but.style.display = 'block';
                butt.classList.remove(type);

                /* Remove o id da lista */
                const index = beWatchList.indexOf(id);
                if(index > -1){
                    beWatchList.splice(index, 1);
                }
            }else{
                /* ADD CLICK */

                but.style.display = 'none';
                butt.classList.add(type);

                /* Adiciona o id na lista */
                beWatchList.push(id);
            }

            localStorage.setItem(type, JSON.stringify(beWatchList));
        }
    }

    return(
        <>
            <TranslationService />
            <br/><br/><br/>
            <a href='/' className='link'>{getTranslation().back}</a>
            <div className='trending'>
                {trend.map(content => (
                    <div className='card' key={content.id}>
                        <img src={content.poster_path ? 'https://www.themoviedb.org/t/p/w220_and_h330_face/'+content.poster_path : 'https://images.placeholders.dev/?width=300&height=450&text=Not%20found'}/>
                        <div className='rating'><span className="material-symbols-outlined">star</span> {content.vote_average.toFixed(1)}</div>
                        <p>{content.title ?? content.name}</p>
                        <div className='buttons'>
                            <button className={(localStorage.getItem('watched') ?? []).includes(content.id) ? 'watched' : ''} style={{display: (localStorage.getItem('beWatch') ?? []).includes(content.id) ? 'none' : ''}} id={'watched-'+content.id} onClick={() => watch(content.id, 'watched')}><span className="material-symbols-outlined">check</span> {getTranslation().alreadyWatched}</button>
                            <button className={(localStorage.getItem('beWatch') ?? []).includes(content.id) ? 'beWatch' : ''} style={{display: (localStorage.getItem('watched') ?? []).includes(content.id) ? 'none' : ''}} id={'beWatch-'+content.id} onClick={() => watch(content.id, 'beWatch')}><span className="material-symbols-outlined">schedule</span> {getTranslation().beWatch}</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='loadMoreBox'>
                <button className='loadMore' onClick={() => loadMore()}>{getTranslation().loadMore}</button>
            </div>
        </>
    )
}

export default Popular;