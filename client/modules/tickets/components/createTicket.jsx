//@puw
import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {TicketInfo} from '../configs/const';
import UI from '../../UI'
import {Logger} from '../../tools';


class CreateTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dynamicShowBtn: true,
    };
    Logger('Ticket UI constructor!', props);
    // Bind callback methods to make `this` the correct context.
    //this.onRadChange = this.onRadChange.bind(this);
  }

  componentWillMount() {
    Logger({msg: 'Ticket UI componentWillMount!', props: this.props});


    //this.props.initializeForm(this.props.createReducer.create);
  }

  componentDidMount() {
    Logger({msg: 'Ticket UI componentDidMount!', props: this.props});
    //初始化值

    if (this.props.params.cid) {
      const {
        createReducer:{customerInfo},
        params:{cid}
      } = this.props;

      Logger({msg: 'Ticket UI 初始化值:', cid: cid, customerInfo: customerInfo});
      if (customerInfo && customerInfo.id != '' && customerInfo.id == decodeURI(cid)) {
        this.setState({dynamicShowBtn: false});
      } else {
        this.props.LogicActions.initCustomer(decodeURI(cid));
      }
      this.props.LogicActions.initSelectOptions()((err, result)=> {
        this.initTicket(result);
      });

    } else {
      //TODO linyong 如果不存在,业务逻辑是不允许的
      const {history} = this.props;
      alert('非法访问');
      history.replace('/search');

    }
  }

  componentWillUpdate(nextProps, nextState) {
    Logger({msg: 'Ticket UI componentWillUpdate!', props: this.props});

  }

  componentDidUpdate(nextProps, nextState) {
    Logger({msg: 'Ticket UI componentDidUpdate!', props: this.props});
    //初始化值 初次加载或路由变更后 @TODO 临时解决路由更新后表单不更新,待寻找更优的方式.
    const {createReducer:{saveStatus}, LogicActions:{resetSaveStatus}} = this.props;
    if (saveStatus === 2) {
      Logger("保存工单信息成功!");
      resetSaveStatus();
    }
  }

  componentWillUnmount() {
    Logger({msg: 'Ticket UI componentWillUnmount!', props: this.props});
  }


  render() {
    Logger({msg: 'ticket UI:', props: this.props});
    const {
      LogicActions:{createTicket, editCustomer, storeTicket, storeCustomer},
      createReducer:{customerInfo, editCustomerStatus, ticketInfo, selectOptions, saveStatus},
      location:{query:{searchKey}},
      history
    } = this.props;

    const {Customer:{CustomerForm}, ToolTip, Tickets:{TicketForm, FlipBar}}=UI;

    let msgType = -1;
    let msgContent = '';
    if (saveStatus == 2) {
      msgType = 1;
      msgContent = '保存工单成功!';
    }
    else if (saveStatus == -1) {
      msgType = 0;
      msgContent = '保存工单失败!';
    }
    if (editCustomerStatus == 2) {
      msgType = 1;
      msgContent = '修改客户信息成功!';
    }
    else if (editCustomerStatus == -1) {
      msgType = 0;
      msgContent = '修改客户信息失败!';
    }

    return (
      <Row>
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 form-group">
          <Col>
            <FlipBar
              contactId={this.props.params.cid}
              searchKey={searchKey}
              history={history}
            />
          </Col>
          <Col >
            <CustomerForm
              dynamicShowBtn={this.state.dynamicShowBtn}
              customerInfo={customerInfo}
              saveCustomer={editCustomer}
              storeCustomer={storeCustomer}
            />
          </Col>
          <Col>
            <TicketForm
              ticketInfo={ticketInfo}
              selectOptions={selectOptions}
              saveTickets={createTicket}
              storeTicket={storeTicket}
            />
          </Col>
          <Col>
            <ToolTip
              msgType={msgType}
              msgContent={msgContent}
            />
          </Col>
        </div>
      </Row>
    );
  };

  initTicket(selectOptions) {
    let ticket = TicketInfo;
    const {
      LogicActions:{initTicket},
      createReducer:{customerInfo, editCustomerStatus, ticketInfo},
      params:{cid},
    } = this.props;
    if (ticketInfo && ticketInfo.contactId != '' && ticketInfo.contactId == cid) {
      Logger("ddddddddddddddddddddddddddddd",ticketInfo);
      ticket.contactId = cid;
      ticket.type = ticketInfo.type;
      ticket.ticketState = ticketInfo.ticketState;
      ticket.priority = ticketInfo.priority;
      ticket.groups = ticketInfo.groups;
      ticket.subject = ticketInfo.subject;
      ticket.agents = ticketInfo.agents;
    } else {
      ticket.contactId = cid;
      ticket.type = selectOptions.type[0].value;
      ticket.ticketState = 'Opened';
      ticket.priority = 20;
      ticket.groups = '--';
      ticket.subject = '';
      ticket.agents = localStorage.getItem('agentinfo');
    }

    initTicket(ticket);
  }
}

CreateTickets.propTypes = {
  /* fields: PropTypes.object.isRequired,
   handleSubmit: PropTypes.func.isRequired,
   resetForm: PropTypes.func.isRequired,
   submitting: PropTypes.bool.isRequired*/
};
export default CreateTickets;
