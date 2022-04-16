import { Navbar, NotePad, Sidebar } from 'components';
import NoteCard from 'components/dashboard/NoteCard/NoteCard';
import { useNote } from 'providers';
import { filterNotes } from 'reducers/noteFilterReducer';
import './Dashboard.css';

const Dashboard = () => {
  const { notes } = useNote();

  const filteredNotes = filterNotes(notes, { status: 'ACTIVE' });
  return (
    <>
      <Navbar />
      <section className="Dashboard__root">
        <div className="d-flex">
          <Sidebar />
          <div className="Dashboard__itemContainer">
            <NotePad />
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

export default Dashboard;
