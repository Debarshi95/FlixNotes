import { NotePad, Wrapper, NoteCard, Typography } from 'components';
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
          {filteredNotes?.length > 0 &&
            filteredNotes.map((note) => <NoteCard key={note.id} note={note} />)}
        </article>
        {filteredNotes?.length === 0 && (
          <Typography size="md" align="center" className="my-4">
            No note found
          </Typography>
        )}
      </section>
    </Wrapper>
  );
};

export default Dashboard;
