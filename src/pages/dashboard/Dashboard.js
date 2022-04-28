import { NotePad, Wrapper, NoteCard } from 'components';
import { useNote } from 'providers';
import { filterNotes } from 'reducers/noteFilterReducer';

const Dashboard = () => {
  const { notes } = useNote();

  const filteredNotes = filterNotes(notes, { status: 'ACTIVE' });

  return (
    <Wrapper>
      <section className="flex-1 p-1">
        <NotePad />
        <article>
          {filteredNotes?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </article>
      </section>
    </Wrapper>
  );
};

export default Dashboard;
