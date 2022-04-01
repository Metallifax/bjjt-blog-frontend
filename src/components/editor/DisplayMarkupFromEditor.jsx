import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import SanitizedHtml from '../utils/SanitizedHtml';

const DisplayMarkupFromEditor = ({
  editorData = EditorState.createEmpty(),
}) => {
  return (
    <div style={{ marginTop: 20 }} data-testid='display-markup'>
      <SanitizedHtml
        dirtyHtml={draftToHtml(convertToRaw(editorData.getCurrentContent()))}
      />
    </div>
  );
};

export default DisplayMarkupFromEditor;
