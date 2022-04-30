/* eslint-disable no-unused-vars */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { createNote, getDocById, getNotes, updateNote } from 'services/firebaseApi';
import { noteActions } from 'constants/noteMessages';
import { firestore, collection, query, where, onSnapshot, orderBy } from 'Firebase';

const NoteContext = createContext();

const NoteProvider = ({ children, user }) => {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    let unsub;
    if (user) {
      const queryRef = query(
        collection(firestore, 'notes'),
        where('status', '==', 'ACTIVE'),
        where('userId', '==', user?.uid),
        orderBy('createdAt', 'desc')
      );

      unsub = onSnapshot(queryRef, (snapshot) => {
        const docs = [];
        snapshot.docs.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setNotes([...docs]);
      });
    }

    return () => {
      if (typeof unsub === 'function') {
        unsub();
      }
    };
  }, [user]);

  const handleAddNote = useCallback(
    async (noteData) => {
      try {
        const res = await createNote({ ...noteData, userId: user.uid });
        return res?.id;
      } catch (error) {
        toast.error("Oops!! Couldn't create note");
      }
      return null;
    },
    [user?.uid]
  );

  const handleNoteUpdate = useCallback(
    async ({ type, noteId, payload }) => {
      const { SET_CONTENT, SET_LABEL, SET_STATUS, SET_PINNED } = noteActions;
      const note = notes.find((_note) => _note.id === noteId);

      if (!note) return;

      try {
        if (type === SET_PINNED) {
          note.isPinned = !note.isPinned;
        }
        if (type === SET_STATUS) {
          note.status = payload;
        }
        if (type === SET_CONTENT) {
          note.content = payload;
        }
        if (type === SET_LABEL) {
          note.labels = [...payload];
        }

        await updateNote({ ...note });
        const updatedNote = await getDocById(note.id, 'notes');
        if (updatedNote?.id) {
          const filteredNotes = notes.filter((_note) => _note.id !== noteId);
          const data = { id: updatedNote.id, ...updatedNote.data() };
          setNotes([data, ...filteredNotes]);
        }
        toast.success('Note updated successfully!');
      } catch (error) {
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
