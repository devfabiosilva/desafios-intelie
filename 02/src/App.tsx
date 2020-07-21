import React from 'react';
// @ts-ignore
import ResizablePanels from "resizable-panels-react";
//@ts-ignore
import { connect } from 'react-redux';
import Graphic from './components/Graphic';
import Editor from './components/Editor';
import { processData } from './util';
import { GRAPHIC_DATA_ERROR, GRAPHIC_DATA } from './util/dataInterface';
import { plotGraphic } from './action';
//        bkcolor="#e1b12c"
function App(props: any) {
  function storeGraphicData() {
    let data = processData(props.graphic_data.text);

    if (data) {
      if ((data as GRAPHIC_DATA_ERROR).error)
        console.log(data);
      else if (data !== null)
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
        <Graphic />
      </ResizablePanels>
      <div className="footer-container">
        <button 
          className="generate-graph-function-btn"
          onClick={() => storeGraphicData()}
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

  plotGraphic: (data: GRAPHIC_DATA[]) => dispatch(plotGraphic(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
