import React from 'react';
import SearchBar from './searchBar.jsx';
import ListTable from './customerListTable.jsx';
import CreatePanel from './createBtnPanle.jsx';

class SearchCustomer extends React.Component {
  render() {
    console.log('customer UI :', this.props);
    const {context,reduxActions,logicActions,visibleLists,searchKey} = this.props;
    return (
      <div className='component'>
        {this.props.customerKey === null ? (<div></div>) : (
        <div style={{position: 'absolute',top: '50px',fontSize: '16px',cursor: 'pointer'}}
             onClick={this.goBackToSelectedCustomerDetail.bind(this)}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true">
          </span>返回</div>)}
        <SearchBar searchKey={searchKey}
                   placeHolder='手机/电子邮件/姓名'
                   setSearchKey={logicActions.setSearchKey}
                   search={logicActions.searchCustomers}
                   context={context}/>
        <div className='payload'>
          { !searchKey ? (<div><CreatePanel logicActions={logicActions} context={context} />
            <ListTable customers={visibleLists} /></div>):
            (<div></div>)}
        </div>

      </div>
    );
  }

  goBackToSelectedCustomerDetail() {
    this.props.gotoBackCustomer(this.props.customerKey);
  }

}
SearchCustomer.propTypes = {}
export default SearchCustomer;

