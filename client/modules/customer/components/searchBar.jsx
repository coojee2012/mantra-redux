import React from 'react';
class SearchBar extends React.Component {
  render() {

    return (
      <div className='toolBar'>
        <div>
          <input ref="searchKeyRef" className='searchInput' type="text"
                 defaultValue={this.props.searchKey}
                 placeholder={this.props.placeHolder}
                 onKeyUp={this.onKeyUp.bind(this)}/>
        </div>
        <div className='searchClick' onClick={this.searchCustomer.bind(this)}></div>
      </div>
    );
  }

  onKeyUp(e) {
    console.log(e.keyCode);

    if (e.keyCode === 13) {
      this.searchCustomer();
    }
  }

  setSearchKeyTest() {
    const {logicActions} = this.props;
    const searchKey = new Date().getTime() + ' ms';
    logicActions.setSearchKey(searchKey);
  }

  searchCustomer() {
    const {context,logicActions} = this.props;
    let searchKey = new Date().getTime() + ' ms';
    logicActions.setSearchKey(context, searchKey);
    const {searchKeyRef} = this.refs;
    if (searchKeyRef.value && searchKeyRef.value.length > 0) {
      logicActions.searchCustomers(context, searchKeyRef.value);
    } else {
      logicActions.searchCustomers(null, searchKeyRef);
    }
  }
}

export default SearchBar;
