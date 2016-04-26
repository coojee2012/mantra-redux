import React from 'react';
import {Logger} from '../../tools';
const App = React.createClass({
  componentWillMount() {
    //初始化值
    //TODO 在此处listen postal事件
    Logger('Main_Layout UI:', this.props);
    Logger('Main_Layout UI roomId:', this.props.coreReducer.roomId);
    const {history,location,setRoomId}=this.props;
    const openByPhone = (phone)=> {
      history.replace('/search/' + phone+'/yes?w=phone');
    }
    const openByChat = (visitorUserName)=> {
      history.replace('/search/'+visitorUserName+'/yes?w=chat');
    }
    const changeRoom = (roomId)=> {
      //如果将要打开的房间之前打开过
      if (localStorage.getItem(roomId)) {

      } else {
        //保存当前房间信息到localstorge
      }
      setRoomId(roomId)();

    }
    if (!window.UnicallPlugin) {
      window.UnicallPlugin = {
        MockListen(eventValue, roomId, eventType = 'phone'){
          if (eventType === 'chat') {
            setRoomId(roomId)();
            openByChat(eventValue);
          } else {
            setRoomId(roomId);
            openByPhone(eventValue);
          }
        }
      }
    }
  },
  componentDidMount() {

  },
  componentWillUpdate(nextProps, nextState) {
    const {history,location,setRoomId,coreReducer:{roomId}}=this.props;
    const newRoomId = nextProps.coreReducer.roomId;
    if (roomId != newRoomId && roomId !== '') {
      const states = JSON(nextProps);
      localStorage.setItem(roomId, states);
      console.log('坐席切换了聊天房间:', roomId, newRoomId);
    }
  },
  componentDidUpdate(preProps, preState) {
    Logger('Core componentDidUpdate!', preProps.coreReducer.roomId, preState);
  },
  componentWillUnmount(){
    Logger({msg: 'Core componentWillUnmount!', props: this.props});
  },
  render() {
    return (
      <div>
        <header>
          <div className='tabContainer'>
            <div className='tabUnselected'></div>
            <div className='tabSelected'>联系人</div>
            <div className='tabUnselected'></div>
          </div>
        </header>
        <div className="container-fluid">
          {
              this.props.children
            }
        </div>
      </div>
    );
  }
});
export default App;
