import React from 'react';
import UI from '../../UI';
import {Logger} from '../../tools';
class SearchCustomer extends React.Component {
  componentWillMount() {
    //TODO 加载历史
    Logger({msg: 'customer search UI componentWillMount :', props: this.props});


  }

  componentDidUpdate(preProps) {
    const {visibleLists, history, autoSearchStatus, searchKey, location:{search}, params:{key,auto}} = this.props;
    if (auto === 'yes' && autoSearchStatus === 1) {
      if (visibleLists.length === 0) {
        Logger({msg: "自动搜索没有发现联系人!!"});
        let searchStr = search && search != '' ? search + '&key=' + key : '?key=' + key;
        history.replace('/customer/create' + searchStr);
      }
      else if (visibleLists.length === 1) {
        Logger("自动搜索发现只有一个联系人!!");
        history.replace('/ticket/' + visibleLists[0].id + '?searchKey=' + searchKey);
      }
    }
  }

  render() {
    const {SearchBar, Loading, GoBackTo, Customer:{CreateBtnPanle, CustomerListTable}}=UI;
    Logger({msg: 'customer search  UI :', props: this.props});
    const {setSearchKey, searchCustomers, visibleLists, searchKey, location, history} = this.props;
    let goBackUrl = '';
    if (this.props.location.query.cid && this.props.location.query.cid != '') {
      goBackUrl = '/ticket/' + this.props.location.query.cid;
      goBackUrl += '?searchKey=' + encodeURI(searchKey);
    }

    return (
      <div className='component'>
        <GoBackTo
          goBackUrl={goBackUrl}
          history={history}
        />
        <SearchBar searchKey={searchKey || this.props.params.key}
                   mountAndSearch={true}
                   placeHolder='手机/电子邮件/姓名'
                   search={searchCustomers}
                   location={location}
                   history={history}
        />
        <div className='payload'>
          { searchKey != '' ? (
            <div>
              <CreateBtnPanle
                cid={this.props.location.query.cid || ''}
                searchKey={searchKey}
              />
              <CustomerListTable customers={visibleLists} auto={this.props.params.auto || 'no' }
                                 selectedRow={this.selectRow.bind(this)}/>
            </div>) :
            (<div><Loading></Loading></div>)}
        </div>
      </div>
    );
  }

  goBackToSelectedCustomerDetail() {
    const {history} = this.props;
    //history.replaceState(null, '/ticket/11');
    history.goBack();
    //this.props.gotoBackCustomer(this.props.customerKey);
  }

  selectRow(id) {
    const {history, searchKey} = this.props;
    history.replace('/ticket/' + id + '?searchKey=' + searchKey);
  }

}
SearchCustomer.propTypes = {}
export default SearchCustomer;

