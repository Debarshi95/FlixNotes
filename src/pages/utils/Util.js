import { Typography, Wrapper, NoteCard } from 'components';
import { useNote } from 'providers';
import { useCallback } from 'react';
import { useLocation } from 'react-router';

const Util = () => {
  const { notes } = useNote();
  const { pathname } = useLocation();
  const title = pathname.split('/')[1].toUpperCase();

  const filterNotes = useCallback((noteList, { isPinned, status }) => {
    return noteList
      ?.filter((note) => (isPinned ? note.isPinned : true))
      ?.filter((note) => (status ? note.status === status : true));
  }, []);

  const filteredNotes = filterNotes(notes, { status: title !== 'LABELS' ? title : null });

  return (
    <Wrapper>
      <section className="d-flex flex-1 flex-col p-1">
        <Typography size="md" align="center" className="Typography--primary text-bold my-1">
          {title}
        </Typography>
        <article>
          {filteredNotes?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </article>
      </section>
    </Wrapper>
  );
};

export default Util;
