import { useState, useReducer, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import Circle from '@uiw/react-color-circle';
import ReactQuill from 'react-quill';
import { BsPaletteFill, BsFillPinFill, BsPin, BsArchiveFill } from 'react-icons/bs';
import { toCapitalize } from 'utils/helper-funcs';
import { useNote, useAuth } from 'providers';
import { createLabel, getDocById, getLabels } from 'services/firebaseApi';
import { circlePopperColors, circlePopperStyles } from 'styles/defaultStyles';
import { Typography, Button, LabelContainer } from 'components';
import noteReducer from 'reducers/noteReducer';
import { noteActions, noteStatus } from 'constants/authMessages';
import SelectInput from 'components/common/SelectInput/SelectInput';
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
  const [isColorPopoverOpen, setIsColorPopoverOpen] = useState(false);
  const [noteState, dispatch] = useReducer(noteReducer, initialState);
  const [options, setOptions] = useState([]);

  const { user } = useAuth();
  const { handleAddNote } = useNote();

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const res = await getLabels(user.uid);
        if (res?.docs) {
          const docs = [];
          res.docs.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
          });
          setOptions([...docs]);
        }
      } catch (error) {
        toast.error("Oops!! Couldn't get labels");
      }
    };

    if (user?.uid) {
      fetchLabels();
    }
  }, [user?.uid]);

  const handleLabelDelete = useCallback(
    (text) => {
      const { labels } = noteState;
      const filteredLabels = labels?.filter((labelText) => labelText !== text);
      dispatch({ type: noteActions.SET_LABEL, payload: [...filteredLabels] });
    },
    [noteState]
  );

  const handleCreateNote = async (e) => {
    e.stopPropagation();
    if (noteState.content === '') {
      toast.error('Note body cannot be empty');
      return;
    }
    const res = await handleAddNote(noteState);
    if (res) {
      dispatch({ type: noteActions.RESET, payload: initialState });
      toast.success('Note added successfully!!');
    }
  };

  const handleOnCreateLabel = useCallback(
    async (value) => {
      const { labels } = noteState;
      try {
        const res = await createLabel({
          userId: user?.uid,
          label: toCapitalize(value),
          value: value.toLowerCase(),
        });

        if (res?.id) {
          const newLabel = await getDocById(res.id, 'labels');
          if (newLabel?.id) {
            setOptions([...options, { id: newLabel.id, ...newLabel.data() }]);
            dispatch({ type: noteActions.SET_LABEL, payload: [...labels, value] });
          }
        }
      } catch (error) {
        toast.error("Couldn't create label. Some error occurred!!");
      }
    },
    [noteState, options, user?.uid]
  );

  const handleOnLabelClick = useCallback(
    (value) => {
      const { labels } = noteState;
      const labelExits = labels?.find((labelText) => labelText === value);
      if (!labelExits) {
        dispatch({ type: noteActions.SET_LABEL, payload: [...labels, value] });
      }
    },
    [noteState]
  );

  return (
    <div className="NotePad__root" style={{ backgroundColor: noteState?.cardColor }}>
      <Typography
        variant="div"
        className="NotePad__iconWrapper d-flex items-center content-between"
      >
        <div
          className="popover__container"
          onClick={() => {
            dispatch({ type: noteActions.SET_PINNED, payload: !noteStatus.isPinned });
          }}
          aria-hidden
        >
          {noteState.isPinned ? (
            <BsFillPinFill className="d-block text-14 mr-1" />
          ) : (
            <BsPin className="d-block text-14 mr-1" />
          )}
        </div>
        <div className="d-flex items-center popover__container">
          {isColorPopoverOpen && (
            <Circle
              colors={circlePopperColors}
              onChange={(color) => dispatch({ type: noteActions.SET_STYLE, payload: color.hex })}
              style={circlePopperStyles}
            />
          )}

          <BsPaletteFill
            className="d-block text-14 mr-1"
            onClick={() => setIsColorPopoverOpen(!isColorPopoverOpen)}
          />

          <BsArchiveFill
            className="d-block text-14 mr-1"
            onClick={() => {
              dispatch({ type: noteActions.SET_STATUS, payload: noteStatus.ARCHIVE });
            }}
          />

          <SelectInput
            onCreate={handleOnCreateLabel}
            onClick={handleOnLabelClick}
            options={options}
          />
        </div>
      </Typography>
      <div className="NotePad__inputContainer">
        <ReactQuill
          onChange={(value) => {
            dispatch({ type: noteActions.SET_CONTENT, payload: value });
          }}
          value={noteState.content}
          placeholder="Enter some text..."
        />
      </div>
      <div className="NotePad__footer d-flex content-between">
        <LabelContainer labels={noteState.labels} handleLabelDelete={handleLabelDelete} />

        <Button
          component="button"
          variant="contained"
          className="text-bold"
          onClick={handleCreateNote}
        >
          ADD
        </Button>
      </div>
    </div>
  );
};

export default NotePad;
