import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { createNote } from 'services/firebaseApi';

import { firestore, collection, query, where, onSnapshot, orderBy } from 'Firebase';

const NoteContext = createContext();

const NoteProvider = ({ children, user }) => {
  const [notes, setNotes] = useState(null);
  console.log({ notes });
  useEffect(() => {
    let unsub;
    if (user) {
      const queryRef = query(
        collection(firestore, 'notes'),
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

  const value = useMemo(() => ({ notes, setNotes, handleAddNote }), [notes, handleAddNote]);

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export const useNote = () => useContext(NoteContext);
export default NoteProvider;
