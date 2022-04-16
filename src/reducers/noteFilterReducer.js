export const filterNotes = (noteList, { isPinned, status }) => {
  return noteList
    ?.filter((note) => (isPinned ? note.isPinned : true))
    ?.filter((note) => (status ? note.status === status : true));
};
