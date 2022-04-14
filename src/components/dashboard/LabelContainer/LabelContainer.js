import { MdClear } from 'react-icons/md';
import Typography from 'components/common/Typography/Typography';
import React from 'react';
import './LabelContainer.css';

const LabelContainer = ({ labels, handleLabelDelete }) => {
  return (
    <div className="LabelContainer__root">
      {labels.map((label, idx) => (
        <div className="LabelItem d-flex items-center" key={idx}>
          <Typography variant="h6" size="xs" className="Typography--500">
            {label}
          </Typography>
          <div
            className="close--icon d-block text-black text-bold"
            role="button"
            onClick={() => handleLabelDelete(label)}
            tabIndex={0}
            aria-hidden
          >
            <MdClear />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabelContainer;
