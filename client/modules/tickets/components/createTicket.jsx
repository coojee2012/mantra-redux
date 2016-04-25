//@puw
import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {TicketInfo} from '../configs/const';
import UI from '../../UI'
import {Logger} from '../../tools';


class CreateTickets extends Component {
  componentWillMount() {
    //初始化值
    if (this.props.params.cid) {
      this.props.LogicActions.initCustomer(this.props.params.cid);
      this.props.LogicActions.initSelectOptions()((err, result)=> {
        this.initTicket(result);
      });

    } else {
      //TODO linyong 如果不存在,业务逻辑是不允许的
    }

    //this.props.initializeForm(this.props.createReducer.create);
  }

  componentDidMount() {

  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('====', nextProps, nextState);
    //初始化值 初次加载或路由变更后 @TODO 临时解决路由更新后表单不更新,待寻找更优的方式.
    //if(this.props.values.contactId != this.props.defaultValues.contactId){
    //this.props.initializeForm(this.props.createReducer.create);
    // }
  }


  render() {
    Logger({msg: 'ticket UI:', props: this.props});
    propTypes = {
      fields: PropTypes.object.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      resetForm: PropTypes.func.isRequired,
      submitting: PropTypes.bool.isRequired
    };
    const {
      //fields: {subject, type, ticketState, priority, groups, agents, description, contactId},
      LogicActions:{createTicket, editCustomer},
      createReducer:{customerInfo, editCustomerStatus, selectOptions},
      location:{query:{searchKey}},
      history
    } = this.props;

    const {Customer:{CustomerForm}, Tickets:{TicketForm, FlipBar}}=UI;
    return (
      <Row>
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 form-group">
          <Col>
            <FlipBar
              searchKey={searchKey}
              history={history}
            />
          </Col>
          <Col >
            <CustomerForm
              dynamicShowBtn={true}
              customerInfo={customerInfo}
              saveCustomer={editCustomer}

            />
          </Col>
          <Col>
            <TicketForm
              selectOptions={selectOptions}
              saveTickets={createTicket}
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
      params:{cid},
    } = this.props;
    ticket.contactId = cid;
    ticket.type = selectOptions.type[0].value;
    ticket.ticketState = 'Opened';
    ticket.priority = 20;
    ticket.groups = '--';
    ticket.agents = localStorage.getItem('agentinfo');
    initTicket(ticket);
  }
}


export default CreateTickets;
