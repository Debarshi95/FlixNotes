const filterNoteReducer = (state, action) => {
  switch (action.type) {
    case 'TAGS':
      return { ...state, tags: action.payload };
    case 'PINNED':
      return { ...state, isPinned: !state.isPinned };
    case 'STATUS':
      return { ...state, status: action.payload?.toUpperCase() };
    case 'SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SEARCH':
      return {
        ...state,
        search: action.payload,
      };
    case 'CLEAR':
      return { ...state, sortBy: null, status: '', tags: null, isPinned: false, search: '' };

    default:
      return state;
  }
};

export default filterNoteReducer;
