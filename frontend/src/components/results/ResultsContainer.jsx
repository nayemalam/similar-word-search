import React from 'react';
import { TextField, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const ResultsContainer = ({
  filteredSimilarTextList,
  isEditing,
  currentItem,
  onActivateInlineEditMode,
  onEdit,
  onConfirmEdit,
  onCancelEdit,
  onRemoveItemFromQueryableList,
}) => {
  return (
    <div className="results-container">
      {filteredSimilarTextList.length === 0 ? (
        <h3 className="no-results">No results</h3>
      ) : (
        <ul>
          {(filteredSimilarTextList.slice(0, 3) || []).map((item, id) => (
            <li key={id}>
              {isEditing && currentItem === item ? (
                <div className="edit">
                  <TextField
                    className="editing-field"
                    type="text"
                    name={item}
                    placeholder={item}
                    defaultValue={item}
                    onChange={onEdit}
                  />
                  <span>
                    <Tooltip title={'Confirm'}>
                      <IconButton aria-label="Confirm" onClick={onConfirmEdit}>
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={'Cancel'}>
                      <IconButton aria-label="Cancel" onClick={onCancelEdit}>
                        <CancelIcon />
                      </IconButton>
                    </Tooltip>
                  </span>
                </div>
              ) : (
                <div className="edit-delete">
                  <span>{item}</span>{' '}
                  <span>
                    <Tooltip title={'Edit ' + item}>
                      <IconButton
                        aria-label="edit"
                        onClick={() => onActivateInlineEditMode(item)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={'Remove ' + item}>
                      <IconButton
                        aria-label="remove"
                        onClick={() => onRemoveItemFromQueryableList(item)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </span>
                </div>
              )}
            </li>
          ))}
          <p className="notice-text">
            {filteredSimilarTextList.length > 0
              ? `Showing top ${
                  filteredSimilarTextList.slice(0, 3).length
                } results related to your query`
              : null}
          </p>
        </ul>
      )}
    </div>
  );
};

export default ResultsContainer;
