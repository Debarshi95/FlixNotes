/* eslint-disable react/no-danger */
import { Typography, LabelContainer } from 'components';
import toast from 'react-hot-toast';
import sanitizeHtml from 'sanitize-html';
import { updateNote } from 'services/firebaseApi';
import { FaTrash } from 'react-icons/fa';
import { BsArchiveFill, BsFillPinFill, BsPin } from 'react-icons/bs';

import './NoteCard.css';
import { useState } from 'react';

const NoteCard = ({ note }) => {
  const [isNoteEditable, setIsNoteEditable] = useState(false);

  const handleNoteUpdate = async ({ type, status = 'ACTIVE', value = '' }) => {
    try {
      if (type === 'UPDATE_PINNED') {
        await updateNote({ ...note, isPinned: !note.isPinned });
        toast.success('Note updated successfully!');
      }
      if (type === 'UPDATE_STATUS') {
        await updateNote({ ...note, status });
        toast.success('Note updated successfully!');
      }
      if (type === 'UPDATE_CONTENT') {
        await updateNote({ ...note, content: value });
      }
    } catch (error) {
      toast.error("Error! Couldn't update note");
    }
  };

  const handleLabelDelete = async (selectedLabel) => {
    const filteredLabels = note.labels.filter((label) => label !== selectedLabel);
    try {
      await updateNote({ ...note, labels: [...filteredLabels] });
    } catch (error) {
      toast.error("Error! Couldn't update note");
    }
  };

  return (
    <div className="NoteCard__root" style={{ backgroundColor: note?.cardColor }}>
      <Typography variant="div" className="d-flex content-between">
        <div className="d-flex">
          <Typography
            variant="h"
            onClick={() => handleNoteUpdate({ type: 'UPDATE_PINNED' })}
            align="end"
            className="mr-1"
          >
            {note.isPinned ? <BsFillPinFill cursor="pointer" /> : <BsPin cursor="pointer" />}
          </Typography>

          <BsArchiveFill
            className="d-block text-12 mr-1"
            cursor="pointer"
            onClick={() => handleNoteUpdate({ type: 'UPDATE_STATUS', status: 'ARCHIVE' })}
          />
        </div>

        <FaTrash
          cursor="pointer"
          onClick={() => handleNoteUpdate({ type: 'UPDATE_STATUS', status: 'TRASH' })}
        />
      </Typography>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(note.content) }}
        className="NoteCard__content"
        contentEditable={isNoteEditable}
        onKeyUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleNoteUpdate({ type: 'UPDATE_CONTENT', value: e.target.textContent });
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsNoteEditable(true);
        }}
        aria-hidden
      />

      {note.labels.length > 0 && (
        <LabelContainer labels={note.labels} handleLabelDelete={handleLabelDelete} />
      )}
    </div>
  );
};

export default NoteCard;
