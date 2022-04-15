import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { createNote, getDocById, getNotes, updateNote } from 'services/firebaseApi';

const NoteContext = createContext();

const NoteProvider = ({ children, user }) => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await getNotes(user.uid);
      if (res?.docs) {
        const docs = [];
        res.docs.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setNotes([...docs]);
      }
    };
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const handleAddNote = useCallback(
    async (noteData) => {
      try {
        const res = await createNote({ ...noteData, userId: user.uid });
        if (res?.id) {
          const newNote = await getDocById(res.id, 'notes');
          if (newNote?.id) {
            setNotes([{ id: newNote.id, ...newNote.data() }, ...notes]);
            return true;
          }
        }
      } catch (error) {
        toast.error("Oops!! Couldn't create note");
      }
      return false;
    },
    [notes, user?.uid]
  );

  const handleNoteUpdate = useCallback(
    async ({ type, noteId, payload }) => {
      const note = notes.find((_note) => _note.id === noteId);
      console.log({ note });
      if (!note) return;

      try {
        if (type === 'UPDATE_PINNED') {
          note.isPinned = !note.isPinned;
        }
        if (type === 'UPDATE_STATUS') {
          note.status = payload;
        }
        if (type === 'UPDATE_CONTENT') {
          note.content = payload;
        }
        await updateNote({ ...note });
        const updatedNote = await getDocById(note.id, 'notes');
        if (updatedNote?.id) {
          const filteredNotes = notes.filter((_note) => _note.id !== noteId);
          setNotes([{ id: updatedNote.id, ...updatedNote.data() }, ...filteredNotes]);
        }
        toast.success('Note updated successfully!');
      } catch (error) {
        console.log({ error });
        toast.error("Error! Couldn't update note");
      }
    },
    [notes]
  );

  const value = useMemo(
    () => ({ notes, setNotes, handleAddNote, handleNoteUpdate }),
    [notes, handleAddNote, handleNoteUpdate]
  );

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNote = () => useContext(NoteContext);
export default NoteProvider;
