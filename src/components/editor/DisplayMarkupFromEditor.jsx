import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import SanitizedHtml from '../utils/SanitizedHtml';
import { useSelector } from 'react-redux';

const DisplayMarkupFromEditor = () => {
  const editorData = useSelector((state) => state.editor.value);

  return (
    <div style={{ marginTop: 20 }}>
      <SanitizedHtml
        dirtyHtml={draftToHtml(convertToRaw(editorData.getCurrentContent()))}
      />
    </div>
  );
};

export default DisplayMarkupFromEditor;
