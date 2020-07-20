import React from 'react';
// @ts-ignore
import ResizablePanels from "resizable-panels-react";
//@ts-ignore
import { connect } from 'react-redux';
import Graphic from './components/Graphic';
import Editor from './components/Editor';

function App(props: any) {
  return (
    <div className="app">
      <div className="title-container">
        <div className="title">Fábio's challenge</div>
      </div>
      <ResizablePanels
        bkcolor="#e1b12c"
        displayDirection="column"
        width="100%"
        height="85%"
        panelsSize={[40, 60]}
        sizeUnitMeasure="%"
        resizerColor="#66789e"
        resizerSize="8px"
      >
        <Editor />
        <Graphic />
      </ResizablePanels>
      <div className="footer-container">
        <button 
          className="generate-graph-function-btn"
          onClick={() => console.log(props.graphic_data.text)}
        >
          Generate graph
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any, ownProps: any) => ({

  graphic_data: state.saveEditorState

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
