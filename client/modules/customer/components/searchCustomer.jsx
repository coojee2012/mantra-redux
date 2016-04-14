import React from 'react';
import UI from '../../UI'

class SearchCustomer extends React.Component {
  componentWillMount() {
    //TODO 加载历史
  }

  render() {
    const {SearchBar, Customer:{createBtnPanle, customerListTable}}=UI;
    console.log('customer UI :', this.props,);
    const {setSearchKey, searchCustomers, visibleLists, searchKey, location, history} = this.props;
    return (
      <div className='component'>
        {this.props.customerKey === null ? (<div></div>) : (
          <div style={{position: 'absolute',top: '50px',fontSize: '16px',cursor: 'pointer'}}
               onClick={this.goBackToSelectedCustomerDetail.bind(this)}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true">
          </span>返回</div>)}
        <SearchBar searchKey={searchKey}
                      placeHolder='手机/电子邮件/姓名'
                      setSearchKey={setSearchKey}
                      search={searchCustomers}
                      location={location}
                      history={history}
        />
        <div className='payload'>
          { !searchKey ? (<div><createBtnPanle {...this.props} />
            <customerListTable customers={visibleLists}/></div>) :
            (<div>3332222</div>)}
        </div>
      </div>
    );
  }

  goBackToSelectedCustomerDetail() {
    const {history} = this.props;
    //history.replaceState(null, '/ticket/11');
    history.replace('/ticket/11')
    //this.props.gotoBackCustomer(this.props.customerKey);
  }

}
SearchCustomer.propTypes = {}
export default SearchCustomer;

