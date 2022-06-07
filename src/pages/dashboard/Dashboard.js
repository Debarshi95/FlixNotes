import Masonry from 'react-masonry-css';
import { NotePad, Wrapper, NoteCard, Typography } from 'components';
import { useNote, useNoteFilterContext } from 'providers';
import './Dashboard.css';

const breakpointColumnsObj = {
  default: 2,
  800: 1,
};

const Dashboard = () => {
  const { notes } = useNote();
  const { state, getSortedNotes, getFilteredNotes } = useNoteFilterContext();

  const sortedNotes = getSortedNotes(notes, state.sortBy, state.search);
  const filteredNotes = getFilteredNotes(sortedNotes, state);

  const renderNotes = () => {
    return (
      filteredNotes?.length > 0 &&
      filteredNotes.map((note) => <NoteCard key={note.id} note={note} />)
    );
  };
  return (
    <Wrapper>
      <section className="flex-1 p-1">
        <NotePad />
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {renderNotes()}
        </Masonry>
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
