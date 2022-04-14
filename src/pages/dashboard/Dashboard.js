import { Navbar, NotePad, Sidebar } from 'components';
import NoteCard from 'components/dashboard/NoteCard/NoteCard';
import { query, firestore, onSnapshot, collection, where } from 'Firebase';
import { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const docRef = query(collection(firestore, 'notes'), where('status', '!=', 'ARCHIVE'));
    const unsub = onSnapshot(docRef, (snapshot) => {
      const docs = [];
      snapshot.docs.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setNotes([...docs]);
    });

    return unsub;
  }, []);

  return (
    <>
      <Navbar />
      <section className="Dashboard__root">
        <div className="d-flex">
          <Sidebar />
          <div className="Dashboard__itemContainer">
            <NotePad />
            <article className="Dashboard__cardContainer">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
