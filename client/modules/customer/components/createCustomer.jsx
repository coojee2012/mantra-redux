import React from "react";
import {reduxForm} from 'redux-form';
import {CustomerInfoFields as fields} from '../configs/const'
import {Grid, Row, Col, FormControls} from 'react-bootstrap';
import UI from '../../UI'
import {Logger} from '../../tools';

const h3Style = {
  paddingTop: "20px",
  borderBottom: "1px #CEC6C6 solid",
  paddingBottom: "10px"
};
class CreateCustomer extends React.Component {
  componentWillMount(){
    const {resetSaveStatus} = this.props;
    resetSaveStatus();
  }
  componentDidUpdate(preProps) {
    if (this.props.createReducer.saveStatus === 2) {
      const {history, resetSaveStatus, createReducer:{customerInfo}} = this.props;
      Logger({msg: "保存用户信息成功!", props: this.props.createReducer, customerInfo: customerInfo});
      resetSaveStatus();
      history.replace('/ticket/' + this.props.createReducer.customerInfo.id);
    }
  }

  render() {
    Logger({msg: 'create customer UI :', props: this.props});
    const {SearchBar, Customer:{CustomerForm, FlipBar},ToolTip}=UI;
    const {
      createReducer:{saveStatus},
      searchKey,
      searchCustomers,
      addCustomer,
      location,
      history
    } = this.props;
    const autoWay =  this.props.location.query.w || '';
    const autoKey = this.props.location.query.key || '';
    let msgType = -1;
    let msgContent='';
    if(saveStatus == 2){
      msgType = 1;
      msgContent='保存成功!';
    }
    if(saveStatus == -1){
      msgType = 0;
      msgContent='保存失败!';
    }
    return (
      <Row>
        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 form-group">
          <Col>
            <SearchBar searchKey={searchKey}
                       mountAndSearch={false}
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
              autoWay={autoWay}
              autoKey={autoKey}
              dynamicShowBtn={false}
              saveCustomer={addCustomer}
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
  }
}

export default reduxForm({
  form: 'CustomerForm',
  fields
})(CreateCustomer);
