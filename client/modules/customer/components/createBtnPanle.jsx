import React from 'react';
class CreateBtnPanle extends React.Component {
  render() {
    return (
      <div className='resultTool'>
        <div className='plzSelect'>请选择联系人</div>
        <div className='createNew' onClick={this.setSearchKeyTest.bind(this)}>+新建联系人</div>
      </div>
    );
  }

  setSearchKeyTest() {
    const {logicActions} = this.props;
    const searchKey = new Date().getTime() + ' ms';
    logicActions.setSearchKey(searchKey);
  }
}
export default CreateBtnPanle;
