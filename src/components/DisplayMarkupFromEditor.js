import { useState } from 'react';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import SanitizedHtml from './SanitizedHtml';

const DisplayMarkupFromEditor = ({ editorState }) => {
  const [rawContentState, setRawContentState] = useState();
  const [markup, setMarkup] = useState();

  const setDisplayData = () => {
    const rawData = convertToRaw(editorState.getCurrentContent());
    setRawContentState(rawData);
    setMarkup(draftToHtml(rawContentState));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <button
        style={{ width: '100px', height: '60px' }}
        onClick={setDisplayData}
      >
        Click me!
      </button>
      {markup && <SanitizedHtml dirtyHtml={markup} />}
    </div>
  );
};

export default DisplayMarkupFromEditor;
