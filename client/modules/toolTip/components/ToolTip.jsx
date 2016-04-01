/*
 * author:alexchen
 * desc:it's tooltips fro tickets plugins*
 * */
import React from "react";
var $msg = "";
var ToolTip = React.createClass({
  getInitialState() {
    return {
      msgType: -1,
      msgContent: ""
    }
  },
  componentDidMount(){
    let that = this;
    $msg = $($(that.refs.msg)[0]);
    that.setState({msgType: -1, msgContent: ""});
    Unicall.tools.UnicalCGEvents.on('showMsg', (data)=> {
      that.setState({msgType: data.msgType, msgContent: data.msgContent});
      $msg.css("opacity", 1);
      if (data.msgType == 1) {
        $msg.animate({
          opacity: 0
        }, 3000, ()=> {
          that.setState({msgType: -1, msgContent: ""});
        })
      }
    });
  },
  componentWillUnmount(){
    Unicall.tools.UnicalCGEvents.off("showMsg");
  },
  close(){
    let that = this;
    that.setState({msgType: -1, msgContent: ""});
  },
  getImg(){
    return Unicall.tools.getPath("images/msg-btn-close.png");
  },
  mouseEnter(){
    if (this.state.msgType == 1) {
      $msg.stop(true, false).animate({
        opacity: 1
      }, 50);
    }
  },
  mouseLeave(){
    let that = this;
    if (this.state.msgType == 1) {
      $msg.stop(false, false).animate({
        opacity: 0
      }, 3000, ()=> {
        that.setState({msgType: -1, msgContent: ""});
      })
    }
  },
  render() {
    return (
      <div ref="msg" className={(() => {
        switch (this.state.msgType) {
          case 1: return "unicall-msg-success";
          case 0:  return "unicall-msg-error";
          default:return "unicall-msg";
        }
      })()} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
        <span className="msg-left">
        </span>
        <img src={this.getImg()} alt="关闭" onClick={this.close}/>
        <div className="msg-content">
          {this.state.msgContent}
        </div>
      </div>
    );
  }
});
export default ToolTip
