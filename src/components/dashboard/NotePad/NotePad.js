import { useState, useReducer, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import ToolTip from 'react-tooltip';
import { CirclePicker } from 'react-color';
import TextEditor from 'react-quill';
import { BsPalette, BsFillPinFill, BsPin, BsArchive, BsThreeDotsVertical } from 'react-icons/bs';
import { toCapitalize } from 'utils/helper-funcs';
import { useNote, useAuth } from 'providers';
import { createLabel } from 'services/firebaseApi';
import { Button, LabelContainer, SelectInput, Chip } from 'components';
import { createNoteReducer } from 'reducers';
import { noteStatus, noteActions } from 'constants/noteMessages';
import { priorityOptions, selectMoreOptions } from 'constants/dropdownOptions';
import { firestore, query, collection, onSnapshot, orderBy, where } from 'Firebase';
import { toolbarModules } from 'constants/editorSettings';
import 'react-quill/dist/quill.snow.css';
import './NotePad.css';

const initialState = {
  content: '',
  cardColor: null,
  status: noteStatus.ACTIVE,
  isPinned: false,
  priority: 'Low',
  labels: [],
};

const DROPDOWN_COLORS = 'Colors';
const DROPDOWN_OPTIONS = 'Options';
const DROPDOWN_LABELS = 'Labels';
const DROPDOWN_PRIORITY = 'Priority';

const selectCommonStyles = {
  menuWidth: 140,
  position: 'absolute',
  top: '26px',
  left: '10px',
  background: '#fff',
  borderRadius: '4px',
  zIndex: 1,
};

const NotePad = () => {
  const [dropdownObj, setDropdownObj] = useState({});
  const [labelOptions, setLabelOptions] = useState([]);
  const [{ content, cardColor, status, isPinned, labels, priority }, dispatch] = useReducer(
    createNoteReducer,
    initialState
  );

  const { user } = useAuth();
  const { handleAddNote } = useNote();

  useEffect(() => {
    let unsub;
    const fetchLabels = async () => {
      try {
        const queryRef = query(
          collection(firestore, 'labels'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        unsub = onSnapshot(queryRef, (snapshot) => {
          const docs = [];
          snapshot.docs.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
          });
          setLabelOptions([...docs]);
        });
      } catch (error) {
        toast.error("Oops!! Couldn't get Labels");
      }
    };

    if (user?.uid) {
      fetchLabels();
    }

    return () => {
      if (typeof unsub === 'function') {
        unsub();
      }
    };
  }, [user?.uid]);

  const handleDropdownChange = useCallback((type) => {
    setDropdownObj((prevObj) => {
      if (prevObj[type]) {
        const duplicateObj = { ...prevObj };
        delete duplicateObj[type];
        return { ...duplicateObj };
      }
      const obj = {};
      obj[type] = true;
      return { ...obj };
    });
  }, []);

  const handleLabelDelete = useCallback(
    (text) => {
      const filteredLabels = labels?.filter((labelText) => labelText !== text);
      dispatch({ type: noteActions.SET_LABEL, payload: [...filteredLabels] });
    },
    [labels]
  );

  const handleCreateNote = async (e) => {
    e.stopPropagation();
    if (content === '') {
      toast.error('Note body cannot be empty');
      return;
    }
    const res = await handleAddNote({ content, cardColor, status, isPinned, labels });
    if (res) {
      setDropdownObj({});
      dispatch({ type: noteActions.RESET, payload: initialState });
      toast.success('Note created successfully!!');
    }
  };

  const handleLabelClick = useCallback(
    (value) => {
      const labelExits = labels?.find((labelText) => labelText === value);
      if (!labelExits) {
        dispatch({ type: noteActions.SET_LABEL, payload: [...labels, value] });
      }
    },
    [labels]
  );

  const handleCreateLabel = useCallback(
    async (value) => {
      try {
        const res = await createLabel({
          userId: user?.uid,
          label: toCapitalize(value),
          value: value.toLowerCase(),
        });
        if (res?.id) {
          handleLabelClick(value);
        }
      } catch (error) {
        toast.error("Couldn't create label. Some error occurred!!");
      }
    },
    [handleLabelClick, user?.uid]
  );

  return (
    <article className="NotePad__root" style={{ backgroundColor: cardColor }}>
      <div className="NotePad__inputContainer">
        <TextEditor
          onChange={(value) => {
            dispatch({ type: noteActions.SET_CONTENT, payload: value });
          }}
          value={content}
          placeholder="Enter some text..."
          theme="snow"
          modules={toolbarModules}
        />
        <Chip variant="primary" className="absolute right-0 mt-1">
          {priority}
        </Chip>

        <LabelContainer labels={labels} handleLabelDelete={handleLabelDelete} />

        <section className="NotePad__footer">
          <div className="d-flex items-center content-between">
            <Button
              component="div"
              variant="icon"
              onClick={() => {
                dispatch({ type: noteActions.SET_PINNED, payload: !isPinned });
              }}
              className="Button--icon-primary"
              data-tip={isPinned ? 'Unpin' : 'Pin'}
            >
              {isPinned ? <BsFillPinFill /> : <BsPin />}
              <ToolTip place="bottom" />
            </Button>

            <Button
              component="div"
              variant="icon"
              data-tip="Background options"
              onClick={() => handleDropdownChange(DROPDOWN_COLORS)}
            >
              <ToolTip place="bottom" />
              <BsPalette />
            </Button>
            <div className="popover_container">
              {dropdownObj[DROPDOWN_COLORS] && (
                <CirclePicker
                  className="NotePad__colorPicker"
                  onChange={(color) => {
                    dispatch({
                      type: noteActions.SET_STYLE,
                      payload: color?.hex,
                    });
                    handleDropdownChange(DROPDOWN_COLORS);
                  }}
                />
              )}
            </div>
            <Button
              component="div"
              variant="icon"
              data-tip="Archive"
              onClick={() => {
                dispatch({ type: noteActions.SET_STATUS, payload: noteStatus.ARCHIVE });
              }}
            >
              <BsArchive />
              <ToolTip place="bottom" />
            </Button>
            <div className="relative">
              <Button
                component="div"
                variant="icon"
                data-tip="More options"
                onClick={() => handleDropdownChange(DROPDOWN_OPTIONS)}
              >
                <BsThreeDotsVertical />
                <ToolTip place="bottom" />
              </Button>

              {dropdownObj[DROPDOWN_OPTIONS] && (
                <SelectInput
                  onSelectClick={(value) => handleDropdownChange(value)}
                  options={selectMoreOptions}
                  variant="primary"
                  defaultMenuIsOpen
                  placeholder={false}
                  isSearchable={false}
                  components={{ Control: () => {} }}
                  selectStyles={selectCommonStyles}
                />
              )}

              {dropdownObj[DROPDOWN_LABELS] && (
                <SelectInput
                  onSelectClick={(value) => {
                    handleLabelClick(value);
                    handleDropdownChange(value);
                  }}
                  onSelectCreate={handleCreateLabel}
                  options={labelOptions}
                  variant="creatable"
                  placeholder="Create a label"
                  defaultMenuIsOpen
                  selectStyles={selectCommonStyles}
                />
              )}

              {dropdownObj[DROPDOWN_PRIORITY] && (
                <SelectInput
                  onSelectClick={(value) =>
                    dispatch({ type: noteActions.SET_PRIORITY, payload: value })
                  }
                  options={priorityOptions}
                  variant="primary"
                  placeholder={false}
                  defaultMenuIsOpen
                  components={{ Control: () => {} }}
                  selectStyles={selectCommonStyles}
                />
              )}
            </div>
          </div>

          <Button
            component="button"
            variant="outlined"
            className="text-bold"
            onClick={handleCreateNote}
          >
            Add
          </Button>
        </section>
      </div>
    </article>
  );
};

export default NotePad;
