import ToolTip from 'react-tooltip';
import toast from 'react-hot-toast';
import sanitizeHtml from 'sanitize-html';
import { useCallback, useMemo, useState } from 'react';
import { TagContainer, SelectInput, Button } from 'components';
import { BsArchive, BsFillPinFill, BsPalette, BsPin, BsThreeDotsVertical } from 'react-icons/bs';
import { updateNote } from 'services/firebaseApi';
import { useTagContext } from 'providers';
import { debounce } from 'utils/helper-funcs';
import { CirclePicker } from 'react-color';
import { selectCommonStyles } from 'styles/defaultStyles';
import {
  DROPDOWN_COLORS,
  DROPDOWN_TAGS,
  DROPDOWN_OPTIONS,
  DROPDOWN_PRIORITY,
  priorityOptions,
  selectMoreOptions,
} from 'constants/dropdownOptions';
import './NoteCard.css';

const NoteCard = ({ note }) => {
  const [isNoteEditable, setIsNoteEditable] = useState(false);
  const [dropdownObj, setDropdownObj] = useState({});
  const { tags, createTag } = useTagContext();

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

  const handleNoteUpdate = useCallback(
    async (payload) => {
      const noteObj = { ...note, ...payload };
      try {
        await updateNote({ ...noteObj });
      } catch (error) {
        toast.error("Error! Couldn't update note");
      }
    },
    [note]
  );

  const handleTagFilter = async (selectedTag) => {
    const filteredTags = note.tags.filter((tag) => tag !== selectedTag);
    handleNoteUpdate({ tags: filteredTags });
  };

  const handleSelectTag = useCallback(
    (value) => {
      const tag = note?.tags?.find((text) => text === value);
      if (!tag) {
        handleNoteUpdate({ tags: [value, ...note.tags] });
      }
    },
    [handleNoteUpdate, note.tags]
  );

  const handleCreateTag = async (value) => {
    try {
      const res = await createTag(value);
      if (res) {
        setDropdownObj({});
        handleNoteUpdate({ tags: [value, ...note.tags] });
      }
    } catch (error) {
      toast.error("Couldn't create tag. Some error occurred!!");
    }
  };
  const handleContentChange = useMemo(() => debounce(handleNoteUpdate, 700), [handleNoteUpdate]);

  return (
    <div className="NoteCard__root" style={{ backgroundColor: note?.cardColor }}>
      <article className="d-flex items-center content-between px-1 py-half">
        <div className="d-flex">
          <Button
            component="div"
            variant="icon"
            onClick={() => handleNoteUpdate({ isPinned: !note.isPinned })}
            className="Button--icon-primary"
            data-tip={note.isPinned ? 'Unpin' : 'Pin'}
          >
            {note.isPinned ? <BsFillPinFill /> : <BsPin />}
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
                  handleDropdownChange(DROPDOWN_COLORS);
                  handleContentChange({ cardColor: color.hex });
                }}
              />
            )}
          </div>
          <Button
            component="div"
            variant="icon"
            data-tip="Archive"
            onClick={() => handleContentChange({ status: 'ARCHIVE' })}
          >
            <BsArchive />
            <ToolTip place="bottom" />
          </Button>
        </div>
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
              selectStyles={{ ...selectCommonStyles, left: '-94px' }}
            />
          )}

          {dropdownObj[DROPDOWN_TAGS] && (
            <SelectInput
              onSelectClick={(value) => {
                handleSelectTag(value);
                handleDropdownChange(value);
              }}
              onSelectCreate={handleCreateTag}
              options={tags}
              variant="creatable"
              placeholder="Create a label"
              defaultMenuIsOpen
              selectStyles={{ ...selectCommonStyles, left: '-94px' }}
            />
          )}

          {dropdownObj[DROPDOWN_PRIORITY] && (
            <SelectInput
              onSelectClick={(value) => {
                handleContentChange({ priority: value });
                handleDropdownChange(DROPDOWN_OPTIONS);
              }}
              options={priorityOptions}
              variant="primary"
              placeholder={false}
              defaultMenuIsOpen
              components={{ Control: () => {} }}
              selectStyles={{ ...selectCommonStyles, left: '-94px' }}
            />
          )}
        </div>
      </article>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(note.content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: { img: ['src'] },
            allowedSchemes: ['data', 'http', 'https'],
          }),
        }}
        className="NoteCard__content"
        contentEditable={isNoteEditable}
        onKeyUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleContentChange({ content: e.target.textContent });
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsNoteEditable(true);
        }}
        aria-hidden
      />

      {note?.tags?.length ? <TagContainer tags={note.tags} onDelete={handleTagFilter} /> : null}
    </div>
  );
};

export default NoteCard;
