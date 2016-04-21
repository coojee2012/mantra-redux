//@puw
import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import UI from '../../UI'
import {Logger} from '../../tools';



class CreateTickets extends Component {
  componentWillMount() {
    //初始化值
    //this.props.initializeForm(this.props.createReducer.create);
  }

  componentDidMount() {
    //自适应description
    /*  try{
     autosize(this.refs.description);
     }catch (e){
     console.log('avoid autosize error')
     }*/
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('====', nextProps, nextState);
    //初始化值 初次加载或路由变更后 @TODO 临时解决路由更新后表单不更新,待寻找更优的方式.
    //if(this.props.values.contactId != this.props.defaultValues.contactId){
    //this.props.initializeForm(this.props.createReducer.create);
    // }
  }

  submit(values) {

  }

  clickSubmit() {

  }

  changeGroup(e) {

  }

  create() {

  }

  render() {
    console.log('ticket UI:', this.props);
    propTypes = {
      fields: PropTypes.object.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      resetForm: PropTypes.func.isRequired,
      submitting: PropTypes.bool.isRequired
    };
    const h3Style = {
      paddingTop: "20px",
      borderBottom: "1px #CEC6C6 solid",
      paddingBottom: "10px"
    };
    const {
      //fields: {subject, type, ticketState, priority, groups, agents, description, contactId},
      LogicActions:{createTicket},
      handleSubmit,
      resetForm,
      searchKey,
      searchCustomers,
      editCustomer,
      location,
      history,
      submitting,
    } = this.props;
    const {SearchBar, Customer:{CustomerForm}, Tickets:{TicketForm, FlipBar}}=UI;
    return (
      <Row>
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 form-group">
          <Col>
            <SearchBar searchKey={searchKey}
                       placeHolder='手机/电子邮件/姓名'
                       search={searchCustomers}
                       location={location}
                       history={history}
            />
          </Col>
          <Col>
            <FlipBar></FlipBar>
          </Col>
          <Col >
            <CustomerForm
              saveCustomer={editCustomer}
            />
          </Col>
          <Col>
            <TicketForm></TicketForm>
          </Col>
        </div>
      </Row>
    );
  };
}


export default CreateTickets;
