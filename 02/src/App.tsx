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

function App(props: any) {

  function loadExample(exampleText: string) {
    let data;
    
    props.saveData(exampleText);
    data = processData(exampleText);

    props.sendErrorMessage(null);

    if (data) {
      if ((data as GRAPHIC_DATA_ERROR).error) {
        console.log(data)
        props.sendErrorMessage(data);
      } else
        props.plotGraphic(data);
    }
  }

  function storeGraphicData() {
    let data = processData(props.graphic_data.text);

    props.sendErrorMessage(null);

    if (data) {
      if ((data as GRAPHIC_DATA_ERROR).error) {
        console.log(data)
        props.sendErrorMessage(data);
      } else
        props.plotGraphic(data);
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

  graphic_data: state.saveEditorState,
  graphicErrorMessage: state.errorMsg

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

  plotGraphic: (data: GRAPHIC_DATA[]) => dispatch(plotGraphic(data)),
  sendErrorMessage: (errorMsg: GRAPHIC_DATA_ERROR|null) => dispatch(sendErrorMessage(errorMsg)),
  saveData: (text: string) => dispatch(setDataState(text))

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
