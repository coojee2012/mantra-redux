import React from 'react';
const App = React.createClass({
  componentWillMount() {
    //初始化值
    //TODO 在此处listen postal事件
    console.log('Main_Layout UI:', this.props);
    console.log('Main_Layout UI roomId:', this.props.coreReducer.roomId);
    const {history,location,setRoomId}=this.props;
    const openByPhone = (phone)=> {
      history.replace('/search/' + phone+'?w=phone');
    }
    const openByChat = (visitorUserName)=> {
      history.replace('/search/'+visitorUserName+'?w=chat');
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
<<<<<<< HEAD
            setRoomId(roomId)();
            openByChat(eventValue);
          } else {
            setRoomId(roomId)();
=======
            changeRoom(roomId);
            openByChat(eventValue);
          } else {
            changeRoom(roomId);
>>>>>>> 20c553e70bfd1c353f2e58123e066587edb5908c
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
    console.log('====componentDidUpdate:', preProps.coreReducer.roomId, preState);
  },
  render() {
    const {location} = this.props;
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
            /^\/ticket/.test(location.pathname)?
              (<div className="row">
                {this.props.customer}
                {this.props.ticket}
              </div>):
              this.props.children
            }
        </div>
      </div>
    );
  }
});
export default App;
