/* eslint-disable react/no-danger */
import { Typography, LabelContainer } from 'components';
import toast from 'react-hot-toast';
import sanitizeHtml from 'sanitize-html';
import { deleteNote, updateNote } from 'services/firebaseApi';
import { FaTrash } from 'react-icons/fa';
import { BsArchiveFill, BsFillPinFill, BsPin } from 'react-icons/bs';

import './NoteCard.css';

const NoteCard = ({ note }) => {
  const handleNoteUpdate = async (type, status = 'ACTIVE') => {
    try {
      if (type === 'UPDATE_PINNED') {
        await updateNote({ ...note, isPinned: !note.isPinned });
      }
      if (type === 'UPDATE_STATUS') {
        await updateNote({ ...note, status });
      }
      toast.success('Note updated successfully!');
    } catch (error) {
      toast.error("Error! Couldn't update note");
    }
  };

  const handleNoteDelete = async () => {
    try {
      await deleteNote(note.id);
      toast.success('Note deleted successfully!');
    } catch (error) {
      toast.error("Error! Couldn't delete note");
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
            onClick={() => handleNoteUpdate('UPDATE_PINNED')}
            align="end"
            className="mr-1"
          >
            {note.isPinned ? <BsFillPinFill cursor="pointer" /> : <BsPin cursor="pointer" />}
          </Typography>

          <BsArchiveFill
            className="d-block text-12 mr-1"
            cursor="pointer"
            onClick={() => handleNoteUpdate('UPDATE_STATUS', 'ARCHIVE')}
          />
        </div>

        <FaTrash cursor="pointer" onClick={handleNoteDelete} />
      </Typography>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(note.content) }}
        className="NoteCard__content"
      />

      {note.labels.length > 0 && (
        <LabelContainer labels={note.labels} handleLabelDelete={handleLabelDelete} />
      )}
    </div>
  );
};

export default NoteCard;
