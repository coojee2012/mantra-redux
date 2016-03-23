import React from 'react';

const App = React.createClass({

  render() {
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
          {this.props.children}
        </div>
      </div>
    );
  }
});
export default App;
/*const Layout = (props) => (
 <div>
 <header>
 <div className ='tabContainerStyle'>
 <div className='tabUnselected'></div>
 <div className='tabSelected'>联系人</div>
 <div className='tabUnselected'></div>
 </div>
 </header>
 <div className="container-fluid">
 {props.children}
 </div>
 </div>
 );*/
//export default Layout;
