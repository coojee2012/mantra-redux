import React from 'react';
import {Logger} from '../tools';
class SearchBar extends React.Component {
  componentDidMount() {
    //TODO 加载历史
    Logger({msg: 'SearchBar UI componentDidMount :', props: this.props});
    const {search, mountAndSearch} = this.props;
    if (mountAndSearch) {
      const {searchKeyRef} = this.refs;
      search(searchKeyRef.value, true)();
    }
  }

  componentDidUpdate(preProps) {
    Logger('SearchBar UI componentDidUpdate :', this.props);
    const {search, searchKey} = this.props;
    if (searchKey != '' && searchKey != preProps.searchKey) {
      const {searchKeyRef} = this.refs;
      searchKeyRef.value = searchKey;
      search(searchKey, true)();
    }
  }

  render() {
    Logger({msg: 'SearchBar UI  :', props: this.props});
    return (
      <div className='toolBar'>
        <div>
          <input ref="searchKeyRef" className='searchInput' type="text"
                 defaultValue={this.props.searchKey}
                 placeholder={this.props.placeHolder}
                 onKeyUp={this.onKeyUp.bind(this)}/>
        </div>
        <div className='searchClick' onClick={this.doSearch.bind(this)}></div>
      </div>
    );
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.doSearch();
    }
  }

  doSearch() {
    const {search, history, location} = this.props;
    const {searchKeyRef} = this.refs;
    if (searchKeyRef.value && searchKeyRef.value.length > 0) {
      let url = '/search/' + searchKeyRef.value;
      if (location.query.cid && location.query.cid != '') {
        url += '?cid=' + location.query.cid;
      }
      history.replace(url);
      search(searchKeyRef.value)();
    }
  }
}

export default SearchBar;
