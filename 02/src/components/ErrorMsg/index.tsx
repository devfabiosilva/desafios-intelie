import React from 'react';
//@ts-ignore
import { connect } from 'react-redux';
import './style.css';
/**
 * This component shows error if occurs
 * It loads last error stored in React Redux
 */
export function ErrorMessage(props: any) {
    return (
        <div className="error-msg-container">
            <div className="error-msg-title">
                Error number: {(props.graphicErrorMessage)?props.graphicErrorMessage.error:""}
            </div>
            <div className="error-msg-reason">
                Reason: {(props.graphicErrorMessage)?props.graphicErrorMessage.reason:""}
            </div>
        </div>
    );
}

const mapStateToProps = (state: any, ownProps: any) => ({

    graphicErrorMessage: state.errorMsg // Get last error message

});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  
});
  
export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
