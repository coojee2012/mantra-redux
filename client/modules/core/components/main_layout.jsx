import React from 'react';
import {Logger} from '../../tools';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};


  }

  openByPhone(phone, roomId) {
    const {history, setRoomId}=this.props;
    setRoomId(roomId);
    history.replace('/search/' + phone + '/yes?w=phone');
  }

  componentWillMount() {
    //初始化值
    //TODO 在此处listen postal事件
    Logger('Main_Layout UI componentWillMount!', this.props);
    const {history, setRoomId}=this.props;
    const openByPhone = (phone, roomId)=> {
      setRoomId(roomId);
      history.replace('/search/' + phone + '/yes?w=phone');
    }
    const openByChat = (visitorUserName, roomId)=> {
      setRoomId(roomId);
      history.replace('/search/' + visitorUserName + '/yes?w=chat');
    }

    if (window.UnicallPlugin) {
      UnicallPlugin.ready(function () {
        UnicallPlugin.get('Tenant.Id', {}, function (tenantId) {
          //Meteor
        })
        UnicallPlugin.get('Agent.info', {}, function (a) {
          localStorage.setItem("agentinfo", a.username)
        });
        UnicallPlugin.listen('Phone.info', function ({username, room_id}) {
          openByPhone(username, room_id);
        });
        UnicallPlugin.listen('Webchat.info', function ({username, room_id}) {
          openByChat(username, room_id);
        });

        UnicallPlugin.listen('Phone.history', function ({username, room_id}) {
          openByPhone(username, room_id);
        });
      })
    } else {
      //TODO linyong 如果没有成功加载,应该做怎样的业务逻辑处理
      Logger('!!!!!!ERROR:UnicallPlugin Is Not Ready!');
    }


    //TODO for debug
    window.openByPhone = openByPhone;
    window.openByChat = openByChat;
    window.setAgentInfo = ()=> {
      localStorage.setItem("agentinfo", 'agent1');
    }

  }

  componentDidMount() {
    Logger('Main_Layout UI componentDidMount!', this.props);
  }

  componentWillUpdate(nextProps) {
    Logger('Main_Layout UI componentWillUpdate!', this.props);
    const {coreReducer:{roomId}}=this.props;
    const newRoomId = nextProps.coreReducer.roomId;
    if (newRoomId != '' && roomId != newRoomId) {
      Logger('坐席切换了聊天房间:', roomId, newRoomId);
    }
  }

  componentDidUpdate(preProps) {

    const {coreReducer:{roomId}, saveState}=this.props;

    const oldRoomId = preProps.coreReducer.roomId;

    Logger('Main_Layout UI componentDidUpdate!', roomId, oldRoomId, this.props);
    //如果是新房间,先尝试从localstage恢复
    if (roomId != '' && roomId != oldRoomId) {

      //刷新时写入localestorge
      window.addEventListener('beforeunload', ()=> {
        if (roomId !== '') {
          saveState(roomId);
        }
      });
      //先保存之前房间的数据
      saveState(oldRoomId);

      //尝试从历史数据中恢复
      const cacheData = localStorage.getItem('roomId');
      if (cacheData) {
        window.UnicallCacheState = JSON.parse(cacheData);
      }
    }
  }

  componentWillUnmount() {
    Logger('Main_Layout UI componentWillUnmount!', this.props);

  }

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
}
export default App;
