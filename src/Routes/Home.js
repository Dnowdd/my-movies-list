import CardType from '../Components/CardType';
import React from 'react';
import {getTranslation, TranslationService, lang} from '../Translations';

function Home(){
  return(
    <>
      <TranslationService />
      <div className='hero'>
        <div>
          <a href='/favorites'><CardType title={getTranslation().favorites} icon="grade"/></a>
          <a href='/popular'><CardType title={getTranslation().popular} icon="local_fire_department"/></a>
        </div>
        <form className='inputBox' action='/search' method='get'>
          <input name='name' placeholder={getTranslation().searchPlaceholder} id='search'></input>
          <label className="material-symbols-outlined" htmlFor='search'>search</label>
        </form>
      </div>
    </>
  )
};

export default Home;