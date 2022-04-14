import { Navbar, NotePad, Sidebar } from 'components';
import NoteCard from 'components/dashboard/NoteCard/NoteCard';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { useEffect, useState } from 'react';
import { getNotes } from 'services/firebaseApi';
import './Dashboard.css';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
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
    fetchNotes();
  }, [user]);

  return (
    <>
      <Navbar />
      <section className="Dashboard__root">
        <div className="d-flex">
          <Sidebar />
          <div className="Dashboard__itemContainer">
            <NotePad />
            <article className="Dashboard__cardContainer">
              {notes?.map((note) => (
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
