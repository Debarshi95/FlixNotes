import sanitizeHtml from 'sanitize-html';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { filterNoteReducer } from 'reducers';

const initialState = {
  sortBy: null,
  status: '',
  tags: null,
  isPinned: false,
  search: '',
};

const NoteFilterContext = createContext();

const NoteFilterProvider = ({ children }) => {
  const [filteredState, dispatch] = useReducer(filterNoteReducer, initialState);

  // eslint-disable-next-line default-param-last
  const getSortedNotes = (noteList = [], sortBy, search = '') => {
    if (sortBy && sortBy === 'CREATED_AT') {
      return noteList.filter((note) => note.createdAt);
    }
    if (sortBy) {
      return noteList.filter((note) => note.priority === sortBy);
    }
    if (search) {
      return noteList.filter((note) => sanitizeHtml(note.content)?.includes(search));
    }
    return noteList;
  };
  const getFilteredNotes = useCallback((noteList, { status, tags, isPinned }) => {
    if (tags) {
      return noteList?.filter((note) => note?.tags?.includes(tags));
    }
    return noteList
      ?.filter((note) => (status ? note.status === status : true))
      ?.filter((note) => (isPinned ? note.isPinned : true));
  }, []);

  const value = useMemo(
    () => ({ state: filteredState, dispatch, getFilteredNotes, getSortedNotes }),
    [getFilteredNotes, filteredState]
  );
  return <NoteFilterContext.Provider value={value}>{children}</NoteFilterContext.Provider>;
};

export const useNoteFilterContext = () => useContext(NoteFilterContext);

export default NoteFilterProvider;
