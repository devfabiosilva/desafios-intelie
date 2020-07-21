import React from 'react';
//@ts-ignore
import { connect } from 'react-redux';
import { UnControlled as CodeMirror } from 'react-codemirror2';
//import 'codemirror/lib/codemirror.css';
import './codemirror.css'; // Codemirror modified
import 'codemirror/theme/material.css';
import './style.css';
import { setDataState } from '../../action';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

function Editor(props: any) {
  //      value={"//Insert your graphic data here"}
  return (
    <CodeMirror
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {
        props.saveData(value);
      }}
      onChange={(editor, data, value) => {
        //props.saveData(value);
      }}
    />
  );
}

const mapStateToProps = (state: any, ownProps: any) => ({

  graphic_data: state.saveEditorState

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

  saveData: (text: string) => dispatch(setDataState(text))

});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);