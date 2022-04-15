export const filterNotes = (noteList, { isPinned, status }) => {
  return noteList
    .filter((note) => (isPinned ? note.isPinned : true))
    .filter((note) => (status === 'ARCHIVE' || status === 'TRASH' ? note.status === status : true));
};
