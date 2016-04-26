import React, {Component, PropTypes} from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import autosize from 'autosize';

import TicketsSelect from './ticketsSelect.jsx';
import {Logger} from '../../tools';

import ObjTools from 'lodash/fp/object';


class TicketFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    Logger({msg: 'Ticket Form componentWillMount!', props: this.props});
  }

  componentDidMount() {
    Logger({msg: 'Ticket Form componentDidMount!', props: this.props});
    //自适应description
    try {
      autosize(this.refs.description);
    } catch (e) {
      Logger('avoid autosize error:', e);
    }
  }

  componentWillUpdate(nextProps) {
    Logger({msg: 'Ticket Form componentWillUpdate!', props: this.props});
    //初始化值 初次加载或路由变更后 @TODO 临时解决路由更新后表单不更新,待寻找更优的方式.
    //if(this.props.values.contactId != this.props.defaultValues.contactId){
    //this.props.initializeForm(this.props.createReducer.create);
    // }

  }

  componentDidUpdate(nextProps) {
    Logger({msg: 'Ticket Form componentDidUpdate!', props: this.props});
    //初始化值 初次加载或路由变更后 @TODO 临时解决路由更新后表单不更新,待寻找更优的方式.
    if (this.props.ticketInfo && this.props.ticketInfo.contactId != '' && this.props.ticketInfo.contactId != this.props.values.contactId) {
      Logger({msg: 'Ticket Form 重新初始化数据!'});
      this.props.initializeForm(this.props.ticketInfo);
    }
  }

  componentWillUnmount() {
    Logger({msg: 'Ticket Form componentWillUnmount!', props: this.props});
    const {storeTicket, values, dirty} = this.props;
    if (dirty && typeof storeTicket == 'function') {
      storeTicket(values);
    }
  }

  submit(values) {
    const self = this;
    return new Promise((resolve, reject)=> {
      try {
        self.props.saveTickets(values)((err, resulet)=> {
          if (err) {
            Logger({msg: "showMsg", data: [{msgType: 0, msgContent: ObjTools.values(err).shift()}]});
            reject(err);
          } else {
            Logger({msg: "showMsg", data: [{msgType: 1, msgContent: "添加成功"}]});
            self.props.resetForm();
            self.props.fields.groups.onChange(); //解决提交后客服不初始化的BUG
            resolve(resulet);
          }
        });
      } catch (ex) {
        Logger({msg: "error", data: ex});
        reject(ex);
      }
    });
  }

  clickSubmit() {
    if (this.props.invalid) {
      const error = ObjTools.values(this.props.errors).shift();
      Logger({msg: "showMsg", data: [{msgType: 0, msgContent: error}]});
    }
  }

  changeGroup(e) {

  }

  render() {
    console.log('Ticket Form UI:', this.props);

    const h3Style = {
      paddingTop: "20px",
      borderBottom: "1px #CEC6C6 solid",
      paddingBottom: "10px"
    };
    const {
      fields: {subject, type, ticketState, priority, groups, agents, description, contactId},
      handleSubmit,
      resetForm,
      selectOptions,
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
            <input type="text" name="subject" {...subject} className="form-control"
                   placeholder="工单主题"/>
          </Col>
          <Col xs={12} sm={6} className={'form-group ' + (type.error && type.touched ? 'has-error' : '')}>
            <label>类型</label>
            <TicketsSelect name="type" {...type} options={selectOptions['type']}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className={'form-group ' + (ticketState.error && ticketState.touched ? 'has-error' : '')}>
            <label>状态</label>
            <TicketsSelect name="ticketState" {...ticketState} options={selectOptions['ticketState']}/>
          </Col>
          <Col xs={12} sm={6} className={'form-group ' + (priority.error && priority.touched ? 'has-error' : '')}>
            <label>优先级</label>
            <TicketsSelect name="priority" {...priority} options={selectOptions['priority']}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} className={'form-group ' + (groups.error && groups.touched ? 'has-error' : '')}>
            <label>组</label>
            <TicketsSelect name="groups" {...groups} options={selectOptions['groups']}
                           onChange={this.changeGroup.bind(this)}/>
          </Col>
          <Col xs={12} sm={6} className={'form-group ' + (agents.error && agents.touched ? 'has-error' : '')}>
            <label>客服</label>
            <TicketsSelect name="agents" {...agents} options={selectOptions['agents']}>
            </TicketsSelect>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={'form-group ' + (description.error && description.touched ? 'has-error' : '')}>
            <label>描述</label>
            <textarea name="description" {...description} ref="description" className="form-control"
                      placeholder="工单描述"/>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="form-group text-right">
            <Button bsStyle="default" bsSize="small" type="button" onClick={resetForm} disabled={submitting}>取消</Button>
            <Button bsStyle="primary" bsSize="small" type="submit" onClick={this.clickSubmit.bind(this)}
                    style={{marginLeft:"15px"}} disabled={submitting}>
              {submitting ? <i/> : <i/>}保存</Button>
          </Col>
        </Row>
        <input type="hidden" name="contactId" {...contactId}/>
      </Col>
    );
  };
}

TicketFrom.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};
//验证字段
const validate = values => {
  const errors = {};
  if (!values.subject) {
    errors.subject = "主题必填";
  } else if (values.subject.length > 128) {
    errors.subject = "主题不能超过128个字符";
  }
  if (!values.type) {
    errors.type = "类型必选";
  }
  if (!values.ticketState) {
    errors.ticketState = "类型必选";
  }
  if (!values.priority) {
    errors.priority = "优先级必选";
  }
  if (!values.ticketState) {
    errors.ticketState = "状态必选";
  }
  if (values.description && values.description.length > 2000) {
    errors.description = "描述不能超过2000个字符";
  }
  return errors;
};

export default reduxForm({
  form: 'TicketFrom',                           // a unique name for this form
  fields: ['subject', 'type', 'ticketState', 'priority', 'groups', 'agents', 'description', 'contactId'], // all the fields in your form
  validate
})(TicketFrom);

