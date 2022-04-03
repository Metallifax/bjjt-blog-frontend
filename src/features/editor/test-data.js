import { EditorState } from 'draft-js';

// test data for creating posts without manually entering new ones
const data = [
  {
    title: 'Homer',
    name: 'Homer Simpson',
    imageUrl:
      'https://metro.co.uk/wp-content/uploads/2020/06/PRI_154097326-2.' +
      'jpg?quality=90&strip=all&crop=0px%2C11px%2C980px%2C515px&resize' +
      '=1200%2C630',
    editorState: EditorState.createWithText('Homer simpson!'),
  },
  {
    title: 'Marge',
    name: 'Marge Simpson',
    imageUrl:
      'https://www.gannett-cdn.com/-mm-/d95634d8cf722215fec6d500c36ba3' +
      '6ee15a4c48/c=0-634-1644-1559/local/-/media/2016/01/23/USATODAY/' +
      'usatsports/marge.jpg?width=1644&height=925&fit=crop&format=pjpg' +
      '&auto=webp',
    editorState: EditorState.createWithText('Marge simpson!'),
  },
];

export default data;
