import React from 'react';
import './LanguageSelection.css';

const LanguageSelector = ({ onSelect }) => {
  const languages = ['Java', 'Python', 'C++', 'JavaScript'];

  return (
    <div className="language-selector">
      <h3>Choose Language:</h3>
      <div className="language-buttons">
        {languages.map((lang) => (
          <button key={lang} onClick={() => onSelect(lang)}>
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
