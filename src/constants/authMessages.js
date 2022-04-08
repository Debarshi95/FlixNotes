export const authErrorMessage = Object.freeze({
  EMAIL_IN_USE: 'Email already in use',
  USERNAME_TAKEN: 'Username taken',
  WRONG_PASSWORD: 'Incorrect Email or Password',
  USER_NOT_FOUND: 'No user found ',
});

export const noteActions = Object.freeze({
  SET_CONTENT: 'SET_CONTENT',
  SET_STYLE: 'SET_STYLE',
  SET_STATUS: 'SET_STATUS',
  SET_PINNED: 'SET_PINNED',
  SET_LABEL: 'SET_LABEL',
  RESET: 'RESET',
});

export const noteStatus = Object.freeze({
  ACTIVE: 'ACTIVE',
  ARCHIVE: 'ARCHIVE',
  TRASH: 'TRASH',
});
