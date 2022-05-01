import TextEditor from 'react-quill';
import toast from 'react-hot-toast';
import ToolTip from 'react-tooltip';
import { useState, useReducer, useCallback } from 'react';
import { CirclePicker } from 'react-color';
import { BsPalette, BsFillPinFill, BsPin, BsArchive, BsThreeDotsVertical } from 'react-icons/bs';

import { useNote, useTagContext } from 'providers';
import { Button, TagContainer, SelectInput, Chip } from 'components';
import { createNoteReducer } from 'reducers';
import { noteStatus, noteActions } from 'constants/noteMessages';
import { selectCommonStyles } from 'styles/defaultStyles';
import { toolbarModules } from 'constants/editorSettings';
import {
  DROPDOWN_COLORS,
  DROPDOWN_TAGS,
  DROPDOWN_OPTIONS,
  DROPDOWN_PRIORITY,
  priorityOptions,
  selectMoreOptions,
} from 'constants/dropdownOptions';
import 'react-quill/dist/quill.snow.css';
import './NotePad.css';

const initialState = {
  content: '',
  cardColor: null,
  status: noteStatus.ACTIVE,
  isPinned: false,
  priority: 'Low',
  tags: [],
};

const NotePad = () => {
  const [dropdownObj, setDropdownObj] = useState({});
  const [{ content, cardColor, status, isPinned, tags, priority }, dispatch] = useReducer(
    createNoteReducer,
    initialState
  );

  const { handleAddNote } = useNote();
  const { tags: dropdownTags = [], createTag } = useTagContext();

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

  const handleTagFilter = useCallback(
    (value) => {
      const filteredTags = tags?.filter((tagName) => tagName !== value);
      dispatch({ type: noteActions.SET_TAGS, payload: [...filteredTags] });
    },
    [tags]
  );

  const handleCreateNote = async (e) => {
    e.stopPropagation();
    if (content === '') {
      toast.error('Note body cannot be empty');
      return;
    }
    const res = await handleAddNote({ content, cardColor, status, isPinned, tags });
    if (res) {
      setDropdownObj({});
      dispatch({ type: noteActions.RESET, payload: initialState });
      toast.success('Note created successfully!!');
    }
  };

  const handleSelectTag = useCallback(
    (value) => {
      const tag = tags?.find((text) => text === value);
      if (!tag) {
        dispatch({ type: noteActions.SET_TAGS, payload: [value, ...tags] });
      }
    },
    [tags]
  );

  const handleCreateTag = async (value) => {
    try {
      const res = await createTag(value);
      if (res) {
        setDropdownObj({});
        dispatch({ type: noteActions.SET_TAGS, payload: [value, ...tags] });
      }
    } catch (error) {
      toast.error("Couldn't create tag. Some error occurred!!");
    }
  };

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

        <TagContainer tags={tags} onDelete={handleTagFilter} />

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

              {dropdownObj[DROPDOWN_TAGS] && (
                <SelectInput
                  onSelectClick={(value) => {
                    handleSelectTag(value);
                    handleDropdownChange(value);
                  }}
                  onSelectCreate={handleCreateTag}
                  options={dropdownTags}
                  variant="creatable"
                  placeholder="Create a tag"
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
