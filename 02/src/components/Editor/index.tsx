import React from 'react';
//@ts-ignore
import { connect } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import './codemirror.css'; // Codemirror modified
import 'codemirror/theme/material.css';
import './style.css';
import { setDataState } from '../../action';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

function Editor(props: any) {
  return (
    <CodeMirror
      value={ props.graphic_data.text }
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
      }}
      onBeforeChange={(editor, data, value) => {
        props.saveData(value);
        // Problem solved! Ref => https://developer.aliyun.com/mirror/npm/package/react-codemirror2
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
