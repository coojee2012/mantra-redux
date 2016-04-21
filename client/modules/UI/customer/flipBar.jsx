/**
 * Created by linyong on 16/4/14.
 */
import React from "react";
const h3Style = {
  paddingTop: "20px",
  borderBottom: "1px #CEC6C6 solid",
  paddingBottom: "10px"
}
class FlipBar extends React.Component {

  render() {
    return (<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 form-group" style={h3Style}>
      <span style={{right: "15px"}}>快速新建联系人</span>
      <span>
      </span>
    </div>)

  }
  
}
export default FlipBar
