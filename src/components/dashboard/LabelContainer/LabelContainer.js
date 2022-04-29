import { MdClear } from 'react-icons/md';
import { Chip } from 'components';
import './LabelContainer.css';

const LabelContainer = ({ labels, handleLabelDelete }) => {
  return (
    <article className="LabelContainer__root">
      {labels.map((label, idx) => (
        <Chip key={idx} onClick={handleLabelDelete} icon={<MdClear />}>
          {label}
        </Chip>
      ))}
    </article>
  );
};

export default LabelContainer;
