import { useCallback, useMemo, useRef, useState, useReducer } from 'react';
import toast from 'react-hot-toast';
import Circle from '@uiw/react-color-circle';
import ReactQuill from 'react-quill';
import { Popover } from 'react-tiny-popover';
import { BsPaletteFill, BsFillPinFill, BsPin, BsArchiveFill } from 'react-icons/bs';
import { MdLabel, MdAddCircle } from 'react-icons/md';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { createNote } from 'services/firebaseApi';
import { circlePopperColors, circlePopperStyles } from 'styles/defaultStyles';
import { Typography, Button, LabelContainer } from 'components';
import noteReducer from 'reducers/noteReducer';
import { noteActions, noteStatus } from 'constants/authMessages';
import 'react-quill/dist/quill.snow.css';
import './NotePad.css';

const initialState = {
  content: '',
  cardColor: null,
  status: noteStatus.ACTIVE,
  isPinned: false,
  labels: [],
};

const NotePad = () => {
  const [isColorPopoverOpen, setIsColorPaperOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [noteState, dispatch] = useReducer(noteReducer, initialState);
  const labelRef = useRef(null);

  const { user } = useAuth();

  const handleLabelAdd = useCallback(() => {
    const { labels } = noteState;
    if (labelRef.current.value !== '') {
      dispatch({ type: noteActions.SET_LABEL, payload: [...labels, labelRef.current.value] });
    }
    setIsPopoverOpen(false);
  }, [labelRef, noteState]);

  const handleLabelDelete = (text) => {
    const { labels } = noteState;
    const filteredLabels = labels?.filter((labelText) => labelText !== text);
    dispatch({ type: noteActions.SET_LABEL, payload: [...filteredLabels] });
  };

  const PopOverContent = useMemo(
    () => (
      <div className="popover__label d-flex">
        <input type="text" name="label" ref={labelRef} placeholder="Enter a note label" />
        <Button type="button" onClick={handleLabelAdd}>
          Add
        </Button>
      </div>
    ),
    [handleLabelAdd]
  );

  const handleAddNote = async (e) => {
    e.stopPropagation();
    if (noteState.content === '') {
      toast.error('Note body cannot be empty');
      return;
    }
    try {
      const res = await createNote({ ...noteState, userId: user.uid });
      if (res?.id) {
        toast.success('Note added successfully!!');
        dispatch({ type: noteActions.RESET, payload: initialState });
      }
    } catch (error) {
      toast.error("Oops!! Couldn't create note");
    }
  };

  return (
    <>
      <div className="NotePad__root" style={{ backgroundColor: noteState?.cardColor }}>
        <Typography
          variant="h6"
          className="mr-1"
          onClick={() => {
            dispatch({ type: noteActions.SET_PINNED, payload: !noteState.isPinned });
          }}
          align="end"
        >
          {noteState.isPinned ? <BsFillPinFill /> : <BsPin />}
        </Typography>
        <div className="NotePad__inputContainer">
          <ReactQuill
            placeholder="Empty Note"
            onChange={(value) => {
              dispatch({ type: noteActions.SET_CONTENT, payload: value });
            }}
            value={noteState.content}
          />
        </div>
        <Typography variant="div" className="NotePad__iconWrapper d-flex items-center content-end">
          <div className="d-flex items-center popover__container">
            {isColorPopoverOpen && (
              <Circle
                colors={circlePopperColors}
                onChange={(color) => dispatch({ type: noteActions.SET_STYLE, payload: color.hex })}
                className="NotePad__popover"
                style={circlePopperStyles}
              />
            )}
            <Popover
              isOpen={isPopoverOpen}
              position={['top', 'right']}
              containerStyle={{ position: 'absolute', top: '48%', left: '55%' }}
              content={PopOverContent}
            >
              <MdLabel
                className="d-block text-12 mr-1"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              />
            </Popover>

            <BsPaletteFill
              className="d-block text-12 mr-1"
              onClick={() => setIsColorPaperOpen(!isColorPopoverOpen)}
            />

            <BsArchiveFill
              className="d-block text-12 mr-1"
              onClick={() => {
                dispatch({ type: noteActions.SET_STATUS, payload: noteStatus.ARCHIVE });
              }}
            />
            <MdAddCircle className="d-block text-16 mr-1" onClick={handleAddNote} />
          </div>
        </Typography>
      </div>
      {noteState.labels.length > 0 && (
        <LabelContainer labels={noteState.labels} handleLabelDelete={handleLabelDelete} />
      )}
    </>
  );
};

export default NotePad;
