import React from 'react';
class SearchBar extends React.Component {
  render() {
    console.log('SearchBar UI :', this.props);
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
    if (e.keyCode === 13) {
      this.searchCustomer();
    }
  }

  searchCustomer() {
    const {context,setSearchKey,search} = this.props;
    const {searchKeyRef} = this.refs;
    if (searchKeyRef.value && searchKeyRef.value.length > 0) {
      setSearchKey(context, searchKeyRef.value);
      search(context, searchKeyRef.value);
    } else {
      search(null, searchKeyRef);
    }
  }
}

export default SearchBar;
