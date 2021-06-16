import React from 'react';
import Button from '@material-ui/core/Button';

const ViewCorpus = ({ retrieveCorpus, isViewingCorpus, corpus }) => {
  return (
    <div>
      <Button
        onClick={retrieveCorpus}
        className="view-corpus"
        variant="outlined"
      >
        {!isViewingCorpus ? 'View' : 'Hide'} Entire Corpus
      </Button>
      {isViewingCorpus ? <p className="corpus">{corpus}</p> : null}
    </div>
  );
};

export default ViewCorpus;
