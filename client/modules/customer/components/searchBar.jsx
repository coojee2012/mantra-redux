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
      let {logicActions} = this.props;
      let searchKey = new Date().getTime() + ' ms';
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

  setSearchKeyTest() {
    const {logicActions} = this.props;
    const searchKey = new Date().getTime() + ' ms';
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
}

export default SearchBar;
