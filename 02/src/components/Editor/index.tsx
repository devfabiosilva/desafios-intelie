import React from 'react';
//@ts-ignore
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import './codemirror.css'; // Codemirror modified from 'import 'codemirror/lib/codemirror.css';'
import 'codemirror/theme/material.css';
import './style.css';
import { setDataState } from '../../action';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
/**
 * Editor component
 */
function Editor(props: any) {
  return (
    <CodeMirror
      value={ props.graphic_data.text } // Read text from Redux State
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {
        props.saveData(value); // Save all text to Redux State
      }}
    />
  );
}

const mapStateToProps = (state: any, ownProps: any) => ({

  // Text changing (Reading from Redux)
  graphic_data: state.saveEditorState

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  // Text changin (Writing to Redux)
  saveData: (text: string) => dispatch(setDataState(text))

});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
