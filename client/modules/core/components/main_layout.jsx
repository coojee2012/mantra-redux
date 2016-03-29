import React from 'react';
const App = React.createClass({
  render() {
    console.log('Main_Layout UI:', this.props);
    const {location} = this.props;
    return (
      <div>
        <header>
          <div className='tabContainer'>
            <div className='tabUnselected'></div>
            <div className='tabSelected'>联系人</div>
            <div className='tabUnselected'></div>
          </div>
        </header>
        <div className="container-fluid">
          {
            /^\/ticket/.test(location.pathname)?
              (<div className="row">
                {this.props.customer}
                {this.props.ticket}
              </div>):
              this.props.children
            }
        </div>
      </div>
    );
  }
});
export default App;
