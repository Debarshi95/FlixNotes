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
  getDoc,
  orderBy,
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

export const getNoteByQuery = ({ where: queryWhere, operator, value: queryValue }) => {
  let queryRef;
  if (queryWhere === 'ALL') {
    queryRef = query(collection(firestore, 'notes'));
  } else {
    queryRef = query(collection(firestore, 'notes'), where(queryWhere, operator, queryValue));
  }
  return getDocs(queryRef);
};
export const getNotes = (userId) => {
  const queryRef = query(
    collection(firestore, 'notes'),
    where('status', '==', 'ACTIVE'),
    where('userId', '==', userId)
  );
  return getDocs(queryRef);
};

export const createLabel = ({ label, value, userId, notes = [] }) => {
  return addDoc(collection(firestore, 'labels'), {
    label,
    value,
    userId,
    notes,
    createdAt: serverTimestamp(),
  });
};

export const getLabels = (userId) => {
  const queryRef = query(
    collection(firestore, 'labels'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return getDocs(queryRef);
};

export const getDocById = (docId, path = '') => {
  const docRef = doc(firestore, path, docId);
  return getDoc(docRef);
};
export const signout = async () => signOut(auth);
