import { Navbar, Sidebar, Typography } from 'components';
import NoteCard from 'components/dashboard/NoteCard/NoteCard';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';
import { getNoteByQuery } from 'services/firebaseApi';

const getSelectQuery = (pathname) => {
  const selectQuery = pathname.split('/')[1];
  switch (selectQuery) {
    case 'labels':
      return { where: 'ALL' };
    case 'archive':
      return { where: 'status', operator: '==', value: 'ARCHIVE' };
    case 'trash':
      return { where: 'status', operator: '==', value: 'TRASH' };
    default:
      return { where: 'ALL' };
  }
};

const Util = () => {
  const [notes, setNotes] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const query = getSelectQuery(pathname);
    const fetchNotes = async () => {
      try {
        const res = await getNoteByQuery(query);
        if (res?.docs.length) {
          const docs = [];
          res.docs.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
          });
          setNotes([...docs]);
        }
      } catch (error) {
        toast.error("Oops! COuldn't load notes");
      }
    };
    fetchNotes();
  }, [pathname]);
  return (
    <>
      <Navbar />
      <section className="Dashboard__root">
        <div className="d-flex">
          <Sidebar />
          <div className="Dashboard__itemContainer">
            <Typography size="md" align="center" className="text-bold mr-8 my-1">
              {pathname.split('/')[1].toUpperCase()}
            </Typography>
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

export default Util;
