import React from 'react';
class CustomerListTableRow extends React.Component {
  render() {
    console.log('CustomerListTableRow UI:', this.props);
    const {name,contact} = this.props.customer;
    return (
      <tr onClick={this.action.bind(this)}
          onMouseOver={this.mouseOver.bind(this)}
          onMouseOut={this.mouseOut.bind(this)}>
        <td>{name}</td>
        <td>{contact}</td>
      </tr>
    );
  }

  selectRecord(id) {
    //return this.props.goCustomerDetail(id);
  }

  action(e) {
    //this.selectRecord(record.id);
  }

  mouseOver(e) {
    const dom = e.target.parentElement;
    dom.style.backgroundColor = '#f7f7f7';
  }

  mouseOut(e) {
    const dom = e.target.parentElement;
    dom.style.backgroundColor = '';
  }
}

export default CustomerListTableRow;
