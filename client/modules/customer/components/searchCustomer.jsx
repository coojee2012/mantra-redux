import React from 'react';
import UI from '../../UI';
import {Logger} from '../../tools';
class SearchCustomer extends React.Component {
  componentWillMount() {
    //TODO 加载历史
    Logger({msg: 'customer search UI componentWillMount :', props: this.props});


  }
  componentDidUpdate(preProps) {
    const {visibleLists,history,autoSearchStatus,searchKey} = this.props;
    if (this.props.params.auto === 'yes' && autoSearchStatus === 1) {
      Logger("自动搜索=====");
      if(visibleLists.length === 0){
        Logger({msg: "自动搜索没有发现联系人!!"});
        let search = this.props.location.search+'&key='+this.props.params.key;
        history.replace('/customer/create'+search);
      }
      else if(visibleLists.length === 1){
        Logger({msg: "自动搜索发现只有一个联系人!!"});
        history.replace('/ticket/' + this.props.visibleLists[0].id+'?searchKey='+searchKey);
      }
    }
  }
  render() {
    const {SearchBar, Loading, Customer:{CreateBtnPanle, CustomerListTable}}=UI;
    Logger({msg: 'customer search  UI :', props: this.props});
    const {setSearchKey, searchCustomers, visibleLists, searchKey, location, history} = this.props;

    return (
      <div className='component'>
        {this.props.customerKey === null ? (<div></div>) : (
          <div style={{position: 'absolute',top: '50px',fontSize: '16px',cursor: 'pointer'}}
               onClick={this.goBackToSelectedCustomerDetail.bind(this)}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true">
          </span>返回</div>)}
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
              <CreateBtnPanle {...this.props} />
              <CustomerListTable customers={visibleLists} auto={this.props.params.auto || 'no' } selectedRow={this.selectRow.bind(this)}/>
            </div>) :
            (<div><Loading></Loading></div>)}
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

  selectRow(id){
    const {history,searchKey} = this.props;
    history.replace('/ticket/'+id+'?searchKey='+searchKey);
  }

}
SearchCustomer.propTypes = {}
export default SearchCustomer;

