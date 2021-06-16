import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, Button } from '@material-ui/core';

const SearchBar = ({ onTextChange, text, onAdd }) => {
  return (
    <div className="search-bar">
      <div className="search-field">
        <SearchIcon className="search-icon" />
        <InputBase
          className="input-base"
          placeholder="search all content"
          fullWidth
          onChange={onTextChange}
          inputProps={{ 'aria-label': 'search' }}
        />
        <Button
          variant="contained"
          color="primary"
          className="add-word"
          disabled={!text}
          onClick={() => onAdd(text)}
          title={'Add ' + text}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
