import React from "react";
import {reduxForm} from 'redux-form';
import {Grid, Row, Col, FormControls} from 'react-bootstrap';


const h3Style = {
  paddingTop: "20px",
  borderBottom: "1px #CEC6C6 solid",
  paddingBottom: "10px"
};
const CustomerInfoFields = ['id', 'name', 'username', 'email', 'mobile', 'address', 'telephone', 'memo'];
class CreateCustomer extends React.Component {

  render() {
    console.log('create customer UI :', this.props);
    const {
      customerInfo,
      searchKey,
      setSearchKey,
      searchCustomers,
      location,
      history,
      fields: {id, name, username, email, mobile, address, telephone, memo},
      handleSubmit
    } = this.props;
    return (
      <Row>
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 form-group">
          <Col componentClass="form" onSubmit={handleSubmit}>
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 form-group" style={h3Style}>
              <span style={{right: "15px"}}>{this.props.CreateCusotmerTitle}</span>
              {this.props.CreateCusotmerTitle == "快速新建联系人" ? "" : <span>
                <span style={{float:"right",cursor:'pointer'}} onClick={this.gotoContact}>定位联系人<span
                  className="glyphicon glyphicon-search">
                </span></span>
              </span>}
            </div>
            <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
              <label htmlFor="exampleInputEmail1">姓名</label>
              <input type="text" {...name} className="form-control" placeholder="姓名" maxLength="16"/>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
              <label htmlFor="email">邮件</label>
              <input type="text" className="form-control" placeholder="邮件" {...email}
                     onChange={this.emailChangeFn} maxLength="32"/>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
              <label htmlFor="mobile">手机</label>
              <input type="text" className="form-control"
                     ref="mobile" {...mobile}
                     onChange={this.emailChangeFn}
                     placeholder="手机" maxLength="32"/>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
              <label htmlFor="address">地址</label>
              <input onChange={this.addressFn} type="text" className="form-control"
                     id="address" placeholder="地址" maxLength="128"/>
            </div>
            <div className="form-group col-lg-6 col-md-6 col-xs-12 col-sm-6">
              <label htmlFor="telephone">电话</label>
              <input onChange={this.telephoneChangeFn} type="text"
                     className="form-control"
                     id="telephone" placeholder="电话" maxLength="32"/>
            </div>
            <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12">
              <label htmlFor="memo">备注</label>
              <textarea ref="memo" className="form-control"
                        onChange={this.memoChangeFn}
                        maxLength="500">
              </textarea>
            </div>
            {(()=> {
              if (true) {
                return <div className="form-group col-lg-12 col-md-12 col-xs-12 col-sm-12 text-right">
                  <button type="button" className="btn btn-default btn-sm" onClick={this.cancelCreateCustomer}>
                    取消
                  </button>
                  <button type="button" style={{marginLeft:"15px"}} className="btn btn-primary btn-sm"
                          onClick={this.save}>保存
                  </button>
                </div>
              }
            })()}
          </Col>
        </div>
        <div>
          {this.props.children}
        </div>
      </Row>

    );
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  showBtns() {

  }

  memoChangeFn(e) {

  }

  mobileFn(e) {

  }

  telephoneChangeFn(e) {

  }

  addressFn(e) {

  }

  gotoContact() {

  }

  save() {

  }

  cancelCreateCustomer() {

  }

  nameChangeFn(e) {

  }

  emailChangeFn(e) {

  }

}
//export default CreateCustomer;
export default reduxForm({
  form: 'CreateCustomer',
  fields: CustomerInfoFields
})(CreateCustomer);
