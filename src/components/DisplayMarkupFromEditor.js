import { useEffect, useState } from 'react';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const DisplayMarkupFromEditor = ({ editorState }) => {
  const [rawContentState, setRawContentState] = useState();
  const [markup, setMarkup] = useState();

  useEffect(() => {
    setRawContentState(convertToRaw(editorState.getCurrentContent()));
    setMarkup(draftToHtml(rawContentState));
  }, [editorState]);

  return <div>{markup}</div>;
};

export default DisplayMarkupFromEditor;
