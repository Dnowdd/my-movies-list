// translations.js

import Select from 'react-select';
import React, { useState } from 'react';

const customStyles = {
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? "#d6d6d6" : "#9e9e9e",
    backgroundColor: state.isSelected ? "#131313" : "#212529",
  }),

  control: (defaultStyles) => ({
    ...defaultStyles,
    backgroundColor: "#080808",
    padding: "10px",
    border: "none",
    boxShadow: "none",
  }),
  singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
};


const options = [
  { value: 'en-US', label: 'English' },
  { value: 'pt-BR', label: 'Português' }
];

const translations = [
  {
    back: 'Back',
    searchPlaceholder: 'Search your movie/series here...',
    favorites: 'Favorites',
    popular: 'Popular',
    alreadyWatched: 'Already watched',
    beWatch: 'I want to watch',
    loadMore: 'Load more...'
  },
  {
    back: 'Voltar',
    searchPlaceholder: 'Procure seus filmes/séries aqui...',
    favorites: 'Favoritos',
    popular: 'Populares',
    alreadyWatched: 'Já assisti',
    beWatch: 'Quero assistir',
    loadMore: 'Carregar mais...'
  }
];

const getTranslation = () => {
  const language = (localStorage.getItem('language') ?? 'en-US');
  const indexOfLanguage = options.findIndex(option => option.value === language);
  return translations[indexOfLanguage];
};

const lang = () => {
  return localStorage.getItem('language') ?? 'en-US';
}

const TranslationService = () => {
  const [language, setLanguage] = useState((localStorage.getItem('language') ?? 'en-US'));
  const indexOfLanguage = options.findIndex(option => option.value === language);

  return (
    <div className='setLanguage'>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[indexOfLanguage]}
        isDisabled={false}
        isLoading={false}
        isClearable={false}
        isRtl={false}
        isSearchable={false}
        name="color"
        options={options}
        styles={customStyles}
        onChange={obj => {
          localStorage.setItem('language', obj.value);
          window.location.reload();
        }}
      />
    </div>
  );
};

export { getTranslation, TranslationService, lang};