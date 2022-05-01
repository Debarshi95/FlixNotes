import { MdClear } from 'react-icons/md';
import { Chip } from 'components';
import './TagContainer.css';

const TagContainer = ({ tags, onDelete }) => {
  return (
    <article className="TagContainer__root">
      {tags?.map((tag, idx) => (
        <Chip key={idx} onClick={onDelete} icon={<MdClear />}>
          {tag}
        </Chip>
      ))}
    </article>
  );
};

export default TagContainer;
