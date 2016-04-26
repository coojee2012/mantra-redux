import React from 'react';
import {Link} from 'react-router';
class CreateBtnPanle extends React.Component {
  render() {
    console.log('CreateBtnPanle UI:', this.props);
    const {cid, searchKey}=this.props;
    let url = '/customer/create';
    url += '?cid=' + encodeURI(cid) + '&searchKey=' + encodeURI(searchKey);
    return (
      <div className='resultTool'>
        <div className='plzSelect'>请选择联系人</div>
        <div className='createNew'>
          <Link to={url}>+新建联系人</Link>
        </div>
      </div>
    );
  }
}
export default CreateBtnPanle;
