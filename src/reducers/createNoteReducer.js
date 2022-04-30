import { noteActions } from 'constants/noteMessages';

const createNoteReducer = (state, action) => {
  switch (action.type) {
    case noteActions.SET_CONTENT:
      return { ...state, content: action.payload };
    case noteActions.SET_STYLE:
      return { ...state, cardColor: action.payload };
    case noteActions.SET_STATUS:
      return { ...state, status: action.payload };
    case noteActions.SET_PINNED:
      return { ...state, isPinned: action.payload };
    case noteActions.SET_PRIORITY:
      return { ...state, priority: action.payload };
    case noteActions.SET_LABEL:
      return { ...state, labels: [...action.payload] };
    case noteActions.RESET:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default createNoteReducer;
