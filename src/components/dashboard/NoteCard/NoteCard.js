import ToolTip from 'react-tooltip';
import toast from 'react-hot-toast';
import sanitizeHtml from 'sanitize-html';
import { memo, useCallback, useMemo, useState } from 'react';
import { TagContainer, SelectInput, Button, Chip } from 'components';
import {
  BsArchive,
  BsFillPinFill,
  BsPalette,
  BsPin,
  BsThreeDotsVertical,
  BsTrash,
} from 'react-icons/bs';
import { updateNote } from 'services/firebaseApi';
import { useTagContext } from 'providers';
import { debounce } from 'utils/helper-funcs';
import { CirclePicker } from 'react-color';
import { circleDropDownColors, selectCommonStyles } from 'styles/defaultStyles';
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
  const [dropdown, setDropdown] = useState(null);
  const { tags, createTag } = useTagContext();

  const handleDropdownChange = (type) => {
    setDropdown(type);
  };

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

  const handleTagFilter = (selectedTag) => {
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
        setDropdown(null);
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
            {dropdown === DROPDOWN_COLORS && (
              <CirclePicker
                className="NotePad__colorPicker"
                colors={circleDropDownColors}
                onChange={(color) => {
                  handleDropdownChange(null);
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
          <Button
            component="div"
            variant="icon"
            data-tip="Trash"
            onClick={() => handleContentChange({ status: 'TRASH' })}
          >
            <BsTrash />
            <ToolTip place="bottom" />
          </Button>
          <Chip variant="outlined" className="right-0 mt-1">
            {note?.priority}
          </Chip>
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

          {dropdown === DROPDOWN_OPTIONS && (
            <SelectInput
              onSelectClick={({ value }) => handleDropdownChange(value)}
              options={selectMoreOptions}
              variant="primary"
              defaultMenuIsOpen
              placeholder={false}
              isSearchable={false}
              components={{ Control: () => null }}
              selectStyles={{ ...selectCommonStyles, left: '-94px' }}
            />
          )}

          {dropdown === DROPDOWN_TAGS && (
            <SelectInput
              onSelectClick={({ value }) => {
                handleSelectTag(value);
                handleDropdownChange(null);
              }}
              onSelectCreate={handleCreateTag}
              options={tags}
              variant="creatable"
              placeholder="Create a Tag"
              defaultMenuIsOpen
              selectStyles={{ ...selectCommonStyles, left: '-94px' }}
            />
          )}

          {dropdown === DROPDOWN_PRIORITY && (
            <SelectInput
              onSelectClick={({ value }) => {
                handleContentChange({ priority: value });
                handleDropdownChange(null);
              }}
              options={priorityOptions}
              variant="primary"
              placeholder={false}
              defaultMenuIsOpen
              components={{ Control: () => null }}
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

export default memo(NoteCard);
