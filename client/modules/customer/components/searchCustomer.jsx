import React from 'react';
import SearchBar from './searchBar.jsx';
import ListTable from './customerListTable.jsx';
import CreatePanel from './createBtnPanle.jsx';

class SearchCustomer extends React.Component {
  componentWillMount(){
    //TODO 加载历史
  }
  render() {
    console.log('customer UI :', this.props);
    const {setSearchKey,searchCustomers,visibleLists,searchKey,location,history} = this.props;
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
          { !searchKey ? (<div><CreatePanel {...this.props} />
            <ListTable customers={visibleLists}/></div>):
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

