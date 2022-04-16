/* eslint-disable react/no-danger */
import { Typography, LabelContainer } from 'components';
import sanitizeHtml from 'sanitize-html';
import { FaTrash } from 'react-icons/fa';
import { BsArchiveFill, BsFillPinFill, BsPin } from 'react-icons/bs';
import { useCallback, useMemo, useState } from 'react';
import { useNote } from 'providers';
import { debounce } from 'utils/helper-funcs';
import './NoteCard.css';

const NoteCard = ({ note }) => {
  const [isNoteEditable, setIsNoteEditable] = useState(false);

  const { handleNoteUpdate } = useNote();

  const handleUpdateNote = useCallback(
    async ({ type, payload }) => {
      handleNoteUpdate({ noteId: note.id, type, payload });
    },
    [handleNoteUpdate, note.id]
  );

  const handleLabelDelete = async (selectedLabel) => {
    const filteredLabels = note.labels.filter((label) => label !== selectedLabel);
    handleNoteUpdate({ type: 'UPDATE_LABELS', noteId: note.id, payload: filteredLabels });
  };

  const handleContentChange = useMemo(() => debounce(handleUpdateNote, 700), [handleUpdateNote]);

  return (
    <div className="NoteCard__root" style={{ backgroundColor: note?.cardColor }}>
      <Typography variant="div" className="NoteCard__header d-flex content-between">
        <div className="d-flex">
          <Typography
            variant="h"
            onClick={() => handleUpdateNote({ type: 'UPDATE_PINNED' })}
            align="end"
            className="mr-1"
          >
            {note.isPinned ? <BsFillPinFill cursor="pointer" /> : <BsPin cursor="pointer" />}
          </Typography>

          <BsArchiveFill
            className="d-block text-12 mr-1"
            cursor="pointer"
            onClick={() => handleUpdateNote({ type: 'UPDATE_STATUS', payload: 'ARCHIVE' })}
          />
        </div>

        <FaTrash
          cursor="pointer"
          onClick={() => handleUpdateNote({ type: 'UPDATE_STATUS', payload: 'TRASH' })}
        />
      </Typography>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(note.content) }}
        className="NoteCard__content"
        contentEditable={isNoteEditable}
        onKeyUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleContentChange({ type: 'UPDATE_CONTENT', payload: e.target.textContent });
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
