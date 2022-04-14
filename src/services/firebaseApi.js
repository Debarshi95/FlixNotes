import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  firestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'Firebase';

export const signup = async ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signin = async ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const checkUserNameTaken = async (username = '') => {
  const queryDoc = query(collection(firestore, 'users'), where('username', '==', username));
  return getDocs(queryDoc);
};

export const createUser = ({ username, uid, email }) => {
  return addDoc(collection(firestore, 'users'), {
    uid,
    username,
    email,
    createdAt: serverTimestamp(),
  });
};

export const createNote = ({ userId, labels, isPinned, cardColor, status, content = '' }) => {
  return addDoc(collection(firestore, 'notes'), {
    content,
    userId,
    labels,
    cardColor,
    status,
    isPinned,
    createdAt: serverTimestamp(),
  });
};

export const updateNote = ({ id, userId, labels, isPinned, cardColor, status, content = '' }) => {
  const docRef = doc(firestore, 'notes', id);
  return updateDoc(docRef, { userId, labels, isPinned, cardColor, status, content });
};

export const deleteNote = (id) => {
  const docRef = doc(firestore, 'notes', id);
  return deleteDoc(docRef);
};

export const signout = async () => signOut(auth);
