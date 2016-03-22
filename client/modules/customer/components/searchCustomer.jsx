import React from 'react';
let cacheSearchInputWord = null;
class SearchCustomer extends React.Component {
  render() {
    console.log('customer UI :',this.props);
    return (
      <div className ='component'>
        {this.props.customerKey === null ? (<div></div>) : (
        <div style={{position:'absolute',top:'50px',fontSize:'16px',cursor:"pointer"}} onClick={this.goBackToSelectedCustomerDetail.bind(this)}>
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true">
          </span>返回</div>)}
        <div className='toolBar'>
          <div>
            <input ref="searchKeyRef" className='searchInput' type="text" defaultValue={this.props.searchKey} value={this.props.searchKey}
                   placeholder={this.props.placeHolder}
                   onKeyUp={this.onKeyUp.bind(this)}/>
          </div>
          <div className='searchClick' onClick={this.searchCustomer.bind(this)}></div>
        </div>
        <div>
          {this.props.createNewCustomer === true ?
            (
            <div>
              <CreateCustomer CreateCusotmerTitle="快速新建联系人" closeCreateCustomer={this.closeCreateCustomer.bind(this)}
                              recoverSearchInputWord={this.recoverSearchInputWord.bind(this)} searchkey={this.props.searchKey}/>
            </div>) :
            (
            <div className='payload'>
              <div className='resultTool'>
                <div className='plzSelect'>请选择联系人</div>
                <div className='createNew' onClick={this.setSearchKeyTest.bind(this)}>+新建联系人</div>
              </div>
              <table className="table table-hover" style={{width:"80%",margin: "0 auto"}}>
                <thead>
                <tr style={{width:"40px"}}>
                  <th>姓名</th>
                  <th>联系方式</th>
                </tr>
                </thead>
                <tbody>
                {this.props.result !== undefined ?
                  this.props.result.list.map(record =>
                    this.record(record)
                    )
                  :
                  (
                  <tr style={{width:"40px"}}></tr>
                    )}
                </tbody>
              </table>
            </div>)
            }
        </div>
      </div>
    );
  }

  goBackToSelectedCustomerDetail() {
    this.props.gotoBackCustomer(this.props.customerKey)
  }

  searchCustomerTest(){
    let {logicActions} = this.props;
    logicActions.search('15308098290');
  }
  setSearchKeyTest(){
    const {logicActions} = this.props;
    const searchKey = new Date().getTime()+' ms';
    logicActions.setSearchKey(searchKey);
  }
  searchCustomer() {
    const {searchCustomers} = this.props;
    const {searchKeyRef} = this.refs;
    if (searchKeyRef.value && searchKeyRef.value.length > 0) {
      searchCustomers(searchKeyRef.value, searchKeyRef);
    } else {
      searchCustomers(null, searchKeyRef);
    }
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {

      let {logicActions} = this.props;
      let searchKey = new Date().getTime()+' ms';
      logicActions.setSearchKey(searchKey);
      const {searchCustomers} = this.props;
      const {searchKeyRef} = this.refs;
      if (searchKeyRef.value && searchKeyRef.value.length > 0) {
        searchCustomers(searchKeyRef.value, searchKeyRef);
      } else {
        searchCustomers(null, searchKeyRef);
      }
    }
  }

  openCreateCustomer() {
    cacheSearchInputWord = this.refs.searchKeyRef.value;
    this.refs.searchKeyRef.value = '';
    this.props.openCreateCustomer();
  }

  closeCreateCustomer() {
    var recoverKey = cacheSearchInputWord || this.props.searchKey;
    this.refs.searchKeyRef.value = recoverKey;
    this.props.closeCreateCustomer();
    cacheSearchInputWord = null;
  }

  recoverSearchInputWord() {
    this.refs.searchKeyRef.value = cacheSearchInputWord;
    this.props.recoverSearchKey(cacheSearchInputWord);
    cacheSearchInputWord = null;
  }

  selectRecord(id) {
    return this.props.goCustomerDetail(id);
  }

  record(record) {
    let action = function () {
      this.selectRecord(record.id);
    }
    let mouseOver = function () {
      this.refs['record' + record.id].style.backgroundColor = '#eeffff'
    }
    let mouseOut = function () {
      this.refs['record' + record.id].style.backgroundColor = ''
    }
    return (
      <tr ref={'record'+record.id} style={{cursor:"pointer",width:"40px"}}>
        <td onClick={action.bind(this)}>{record.name}</td>
        <td onClick={action.bind(this)}>{record.contact}</td>
      </tr>
      /*<div style={result} key={record.id} ref={'record'+record.id} onMouseOver={mouseOver.bind(this)}
       onMouseOut={mouseOut.bind(this)}>
       <div style={resultCell}><span style={clickSpan} onClick={action.bind(this)}>{record.name}</span></div>
       <div style={resultCell}><span style={clickSpan} onClick={action.bind(this)}>{record.contact}</span>
       </div>
       </div>*/);
  }

}
SearchCustomer.propTypes = {

}
export default SearchCustomer;

