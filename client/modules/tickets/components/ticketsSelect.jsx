//select 组件复用
import React, {Component, PropTypes} from 'react';
class TicketsSelect extends Component {
  render(){
   /* const options = this.props.options[this.props.name].map((option,key)=>{
      return(
        <option value={option.value} key={key}>{option.key}</option>
      )
    });
    const prop = this.props.fields[this.props.name];
    return (
      <select type="select" name={this.props.name} {...prop} onChange={this.props.onChange?this.props.onChange:prop.onChange} className="form-control">
        {options}
      </select>
    );*/
    return (
      <select>
        <option >1</option>
        <option >2</option>
      </select>
    )
  }
}
export  default TicketsSelect;
