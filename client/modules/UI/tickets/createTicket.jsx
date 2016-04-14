
import React, {Component, PropTypes} from 'react';
import {Grid,Row,Col,Button} from 'react-bootstrap';
import {reduxForm} from 'redux-form';

import TicketsSelect from './ticketsSelect.jsx';



class CreateTickets extends Component {
  componentWillMount(){
    //初始化值
    this.props.initializeForm(this.props.createReducer.create);
  }
  componentDidMount(){
    //自适应description
  /*  try{
      autosize(this.refs.description);
    }catch (e){
      console.log('avoid autosize error')
    }*/
  }
  componentWillUpdate( nextProps,  nextState){
    console.log('====',nextProps,  nextState);
    //初始化值 初次加载或路由变更后 @TODO 临时解决路由更新后表单不更新,待寻找更优的方式.
    //if(this.props.values.contactId != this.props.defaultValues.contactId){
    //this.props.initializeForm(this.props.createReducer.create);
   // }
  }
  submit(values){

  }
  clickSubmit() {

  }
  changeGroup(e){

  }
  create(){

  }
  render() {
    console.log('ticket UI:',this.props);
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
      fields: {subject,type,ticketState,priority,groups,agents,description,contactId},
      LogicActions:{createTicket},
      handleSubmit,
      resetForm,
      submitting,
      } = this.props;

    return (
      <Col componentClass="form" xs={12} onSubmit={handleSubmit(this.submit.bind(this))}>
        <Row>
          <Col xs={12} sm={12} className="form-group" style={h3Style}>
            <span>新建工单</span>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className={'form-group ' + (subject.error && subject.touched ? 'has-error' : '')}>
            <label>主题</label>
            <input type="text" name="subject" {...subject} className="form-control" onFocus={createTicket('asdad')}
                   placeholder="工单主题"/>
          </Col>
          <Col xs={12} sm={6} className={'form-group ' + (type.error && type.touched ? 'has-error' : '')}>
            <label>类型</label>
            <TicketsSelect name="type" {...this.props}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className={'form-group ' + (ticketState.error && ticketState.touched ? 'has-error' : '')}>
            <label>状态</label>
            <TicketsSelect name="ticketState" {...this.props}/>
          </Col>
          <Col xs={12} sm={6} className={'form-group ' + (priority.error && priority.touched ? 'has-error' : '')}>
            <label>优先级</label>
            <TicketsSelect name="priority" {...this.props}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className={'form-group ' + (groups.error && groups.touched ? 'has-error' : '')}>
            <label>组</label>
            <TicketsSelect name="groups" {...this.props} onChange={this.changeGroup.bind(this)}/>
          </Col>
          <Col xs={12} sm={6} className={'form-group ' + (agents.error && agents.touched ? 'has-error' : '')}>
            <label>客服</label>
            <TicketsSelect name="agents" {...this.props}>
            </TicketsSelect>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={'form-group ' + (description.error && description.touched ? 'has-error' : '')}>
            <label>描述</label>
            <textarea name="description" {...description} ref="description" className="form-control" placeholder="工单描述"/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="form-group text-right">
            <Button bsStyle="default" bsSize="small" type="button" onClick={resetForm} disabled={submitting}>取消</Button>
            <Button bsStyle="primary" bsSize="small" type="submit" onClick={this.clickSubmit.bind(this)} style={{marginLeft:"15px"}} disabled={submitting}>
              {submitting ? <i/> : <i/>}保存</Button>
          </Col>
        </Row>
        <input type="hidden" name="contactId" {...contactId}/>
      </Col>
    );
  };
}

//验证字段
const validate = values => {
  const errors = {};
  if(!values.subject){
    errors.subject = "主题必填";
  }else if(values.subject.length > 128){
    errors.subject = "主题不能超过128个字符";
  }
  if(!values.type){
    errors.type = "类型必选";
  }
  if(!values.ticketState){
    errors.ticketState = "类型必选";
  }
  if(!values.priority){
    errors.priority = "优先级必选";
  }
  if(!values.ticketState){
    errors.ticketState = "状态必选";
  }
  if(values.description && values.description.length > 2000){
    errors.description = "描述不能超过2000个字符";
  }
  return errors;
};

CreateTickets = reduxForm({
  form: 'CreateTickets',                           // a unique name for this form
  fields: ['subject','type','ticketState','priority','groups','agents','description','contactId'], // all the fields in your form
  validate
})(CreateTickets);

export default CreateTickets;
