import React from "react";
import {reduxForm} from 'redux-form';
import {Grid, Row, Col, FormControls} from 'react-bootstrap';
import {Logger} from '../../tools';

import ObjTools from 'lodash/fp/object';

const CustomerInfoFields = ['id', 'name', 'username', 'email', 'mobile', 'address', 'telephone', 'memo'];
class CustomerForm extends React.Component {

  render() {
    Logger({msg: 'customer form UI :', props: this.props});
    const {
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
                   id="telephone" placeholder="电话" maxLength="32"/>
          </div>
          <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <label htmlFor="memo">备注</label>
              <textarea ref="memo" className="form-control" {...memo}
                        maxLength="500">
              </textarea>
          </div>
          {(()=> {
            if (true) {
              return <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 text-right">
                <button type="button" className="btn btn-default btn-sm" onClick={resetForm} disabled={submitting}>
                  取消
                </button>
                <button type="submit" style={{marginLeft:"15px"}} className="btn btn-primary btn-sm"
                        onClick={this.clickSubmit.bind(this)}>保存
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
    Logger("保存");
    const {saveCustomer,resetForm}=this.props;
    saveCustomer(values)((err,data)=>{
      if(err){
        Logger(err);
        Logger({msg:"showMsg", data:[{msgType: 0, msgContent: ObjTools.values(err).shift()}]});
      }else{
        Logger({msg:"showMsg", data:[{msgType: 1, msgContent: "添加成功"}]});
        //resetForm();
        
      }
    });
  }

  clickSubmit() {
    if (this.props.invalid) {
      const error = ObjTools.values(this.props.errors).shift();
      Logger(error);
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
