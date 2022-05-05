import { NotePad, Wrapper, NoteCard } from 'components';
import { useNote, useNoteFilterContext } from 'providers';
import './Dashboard.css';

const Dashboard = () => {
  const { notes } = useNote();
  const { state, getSortedNotes, getFilteredNotes } = useNoteFilterContext();

  const sortedNotes = getSortedNotes(notes, state.sortBy, state.search);
  const filteredNotes = getFilteredNotes(sortedNotes, state);

  return (
    <Wrapper>
      <section className="flex-1 p-1">
        <NotePad />
        <article className="Dashboard__notesWrapper">
          {filteredNotes?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </article>
      </section>
    </Wrapper>
  );
};

export default Dashboard;
