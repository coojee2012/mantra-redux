import React from "react";

class GoBackTo extends React.Component {
  render() {
    const {goBackUrl, history} = this.props;
    return (
      <div>
        {!goBackUrl || goBackUrl == '' ? (<div></div>) : (
          <div style={{position: 'absolute',top: '50px',fontSize: '16px',cursor: 'pointer'}}
               onClick={this.goBackTo.bind(this)}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true">
          </span>返回</div>)}
      </div>
    );
  }

  goBackTo() {
    const {goBackUrl, history} = this.props;
    history.replace(goBackUrl);
  }
}

export default GoBackTo;
