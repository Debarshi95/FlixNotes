import { Navbar, Sidebar, Typography } from 'components';
import NoteCard from 'components/dashboard/NoteCard/NoteCard';
import { useNote } from 'providers';
import { useLocation } from 'react-router';
import { filterNotes } from 'reducers/noteFilterReducer';

const Util = () => {
  const { notes } = useNote();
  const { pathname } = useLocation();
  const title = pathname.split('/')[1].toUpperCase();

  const filteredNotes = filterNotes(notes, { status: title });

  return (
    <>
      <Navbar />
      <section className="Dashboard__root">
        <div className="d-flex">
          <Sidebar />
          <div className="Dashboard__itemContainer">
            <Typography size="md" align="center" className="Typography--primary text-bold my-1">
              {title}
            </Typography>
            <article className="Dashboard__cardContainer">
              {filteredNotes?.map((note) => (
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
