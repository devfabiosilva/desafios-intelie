import React from 'react';
// @ts-ignore
import ResizablePanels from "resizable-panels-react";
//@ts-ignore
import { connect } from 'react-redux';
import Graphic from './components/Graphic';
import Editor from './components/Editor';
import { processData } from './util';
import ErrorMessage from './components/ErrorMsg';
import { GRAPHIC_DATA_ERROR, GRAPHIC_DATA } from './util/dataInterface';
import { plotGraphic, sendErrorMessage, setDataState } from './action';
import { EXAMPLE1, EXAMPLE2 } from './util/examples';
/**
 * Main App function
 */
function App(props: any) {

  /**
   * 
   * Load examples function to plot it data
   */
  function loadExample(exampleText: string) {
    let data;
    
    props.saveData(exampleText); // Save selected example to Redux State
    data = processData(exampleText); // Process data from selected example

    props.sendErrorMessage(null); // Clear all error message

    if (data) {
      if ((data as GRAPHIC_DATA_ERROR).error) {
        props.sendErrorMessage(data); // If error, enable ErrorMsg component to show processData() error
      } else
        props.plotGraphic(data); // If Success return parsed data to Nivo Graphics
    }
  }

  function storeGraphicData() {
    let data = processData(props.graphic_data.text); // Extract text data from Redux State

    props.sendErrorMessage(null); // Clear all previous error

    if (data) { // If data exists
      if ((data as GRAPHIC_DATA_ERROR).error) { // If error, enable ErrorMsg component to show processData() error
        props.sendErrorMessage(data);
      } else
        props.plotGraphic(data); // If success return parsed data to Nivo Graphics
    }
  }

  return (
    <div className="app">
      <div className="title-container">
        <div className="title">Fábio's challenge</div>
      </div>
      <ResizablePanels
        displayDirection="column"
        width="100%"
        height="85%"
        panelsSize={[40, 60]}
        sizeUnitMeasure="%"
        resizerColor="#66789e"
        resizerSize="8px"
      >
        <Editor />
        {(props.graphicErrorMessage)?<ErrorMessage />:<Graphic />}
      </ResizablePanels>
      <div className="footer-container">
        <button 
          className="generate-graph-function-btn"
          onClick={() => storeGraphicData()}
        >
          Generate graph
        </button>
        <button 
          className="generate-graph-function-btn"
          onClick={() => loadExample(EXAMPLE1)}
        >
          Load example 1
        </button>
        <button 
          className="generate-graph-function-btn"
          onClick={() => loadExample(EXAMPLE2)}
        >
          Load example 2
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any, ownProps: any) => ({

  graphic_data: state.saveEditorState, // Get text from codemirror stored in Redux State
  graphicErrorMessage: state.errorMsg // Error message (if occurs)

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

  plotGraphic: (data: GRAPHIC_DATA[]) => dispatch(plotGraphic(data)), // Function plotGraphic
  sendErrorMessage: (errorMsg: GRAPHIC_DATA_ERROR|null) => dispatch(sendErrorMessage(errorMsg)), //Trigger ErrorMsg when error in processData occurs
  saveData: (text: string) => dispatch(setDataState(text)) //Get codemirror text and save all text to Redux

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
