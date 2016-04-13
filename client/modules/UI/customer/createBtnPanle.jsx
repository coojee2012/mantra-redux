import React from 'react';
import {Link} from 'react-router';
class CreateBtnPanle extends React.Component {
  render() {
    return (
      <div className='resultTool'>
        <div className='plzSelect'>请选择联系人</div>
        <div className='createNew'>
          <Link to='/customer/create'>+新建联系人</Link>
        </div>
      </div>
    );
  }
}
export default CreateBtnPanle;
