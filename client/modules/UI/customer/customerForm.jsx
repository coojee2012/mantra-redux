import React from "react";
import {reduxForm} from 'redux-form';
import {Grid, Row, Col, FormControls} from 'react-bootstrap';
import {Logger} from '../../tools';

import ObjTools from 'lodash/fp/object';

const CustomerInfoFields = ['id', 'name', 'username', 'email', 'mobile', 'address', 'telephone', 'memo'];
class CustomerForm extends React.Component {
  componentDidMount() {
    if (this.props.autoWay === 'phone') {
      if (/^[01|1][3|4|5|8][0-9]\d{4,8}$/.test(this.props.autoKey)) {
        this.refs.mobile.value = this.props.autoKey;
      } else {
        this.refs.telephone.value = this.props.autoKey;
      }
    }
    else if (this.props.autoWay === 'webchat') {
      this.refs.username.value = this.props.autoKey;
    }
  }

  componentDidUpdate(preProps) {
    //初始化用户信息
    if (this.props.customerInfo && this.props.customerInfo.id != '' && this.props.customerInfo.id != this.props.values.id) {
      this.props.initializeForm(this.props.customerInfo);
    }
    if (this.props.submitting != preProps.submitting) {
      Logger({msg: 'customer UI submitting :' + this.props.submitting});
    }

  }

  componentWillUnmount(){
    Logger({msg: 'Customer Form componentWillUnmount!', props: this.props});
    const {storeCustomer,values,dirty} = this.props;
    if(dirty && typeof storeCustomer == 'function'){
      storeCustomer(values);
    }

  }

  render() {
    Logger({msg: 'customer form UI :', props: this.props});
    const {
      dynamicShowBtn,
      dirty,
      submitting,
      resetForm,
      handleSubmit,
      fields: {id, name, username, email, mobile, address, telephone, memo},
    } = this.props;
    return (
      <Row>
        <Col componentClass="form" onSubmit={handleSubmit(this.submit.bind(this))}>
          <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
            <label htmlFor="exampleInputEmail1">姓名</label>
            <input type="text" {...name} className="form-control" placeholder="姓名" maxLength="16"/>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
            <label htmlFor="email">邮件</label>
            <input type="text" className="form-control"
                   placeholder="邮件" {...email}
                   maxLength="32"/>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
            <label htmlFor="mobile">手机</label>
            <input type="text" className="form-control"
                   ref="mobile" {...mobile}
                   placeholder="手机" maxLength="32"/>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
            <label htmlFor="address">地址</label>
            <input type="text" className="form-control" {...address}
                   placeholder="地址" maxLength="128"/>
          </div>
          <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
            <label htmlFor="telephone">电话</label>
            <input type="text" className="form-control" {...telephone}
                   ref="telephone" placeholder="电话" maxLength="32"/>
          </div>
          <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <label htmlFor="memo">备注</label>
              <textarea ref="memo" className="form-control" {...memo}
                        maxLength="500">
              </textarea>
            <input type="hidden" name="id" {...id}/>
            <input type="hidden" name="username" ref="username" {...username}/>
          </div>
          {(()=> {
            if (!dynamicShowBtn || (dynamicShowBtn && dirty)) {
              return <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 text-right">
                <button type="button" className="btn btn-default btn-sm" onClick={resetForm} disabled={submitting}>
                  取消
                </button>
                <button type="submit" style={{marginLeft:"15px"}} className="btn btn-primary btn-sm"
                        onClick={this.clickSubmit.bind(this)} disabled={submitting}>保存
                </button>
              </div>
            }
          })()}
        </Col>
      </Row>

    );
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  save() {

  }

  submit(values) {
    Logger('保存客户信息!');
    const {saveCustomer, resetForm}=this.props;
    return new Promise((resolve, reject)=> {
      saveCustomer(values)((err, data)=> {
        if (err) {
          Logger({msg: 'Save Customer Error:', error: err});
          reject(err);
        } else {
          Logger({msg: "Save Customer Success:", data: "添加成功"});
          //resetForm();
          resolve(data);
        }
      });
    });
  }

  clickSubmit() {
    if (this.props.invalid) {
      const error = ObjTools.values(this.props.errors).shift();
      Logger({msg: 'Submit Check Customer Error:', error: error});
    }
  }

}

//验证字段
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "姓名必填";
  } else if (values.name.length > 16) {
    errors.name = "姓名不能超过16个字符";
  }
  if (!values.email) {
    errors.email = "电子邮件必选";
  }
  return errors;
};

//export default CustomerForm;
export default reduxForm({
  form: 'CustomerForm',
  fields: CustomerInfoFields,
  validate
})(CustomerForm);
