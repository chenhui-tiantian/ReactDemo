/**
 * Created by jiangrx on 12/25/15.
 */

const React = require('react');
require('./DropDownWithSearch.css');

let DropDownWithSearch = React.createClass({
  getInitialState(){
    return {
      dropDownShow: false,
      selectedValue: null,
      contents: []
    };
  },
  getDefaultProps(){
    return {
      contents: [{text: '', payload: 0}],
      defaultValue: 0,
      dropDownSize: 5,
      multiSelect: false,
      className: 'dropDownWithSearch'
    };
  },
  componentWillMount(){
    console.log('mount');
    this.setState({contents: this.props.contents, selectedValue: this.props.defaultValue});
  },
  componentWillReceiveProps(nextProps){
    if (nextProps.hasOwnProperty('contents')) {
      this.setState({contents: nextProps.contents});
    }
    if (nextProps.hasOwnProperty('defaultValue') && (this.props.defaultValue !== nextProps.defaultValue)) {
      this.setState({selectedValue: parseInt(nextProps.defaultValue)});
    }
  },
  onSelect(event){
    this.setState({dropDownShow: false, selectedValue: parseInt(event.currentTarget.value)});
  },
  onSearch(event){
    let filteredContents = this.props.contents.filter(function (content) {
      return (content.text.indexOf(this.target.value.toUpperCase()) !== -1) || (content.text.indexOf(this.target.value.toLowerCase()) !== -1);
    }, event);
    this.setState({contents: filteredContents});
  },
  toggleDropDown(){
    this.setState({dropDownShow: !this.state.dropDownShow});
  },
  showDropDown(){
    console.log('focused');
    this.setState({dropDownShow: true});
  },
  hideDropDown(){
    this.setState({dropDownShow: false});
  },
  renderList(){
    let ret = [];
    for (let i = 0; i < this.state.contents.length; i++) {
      if (this.state.contents[i].payload === this.state.selectedValue) {
        ret.push(<li value={this.state.contents[i].payload} data-selected='selected'
                     onClick={this.onSelect}>{this.state.contents[i].text}</li>);
      } else {
        ret.push(<li value={this.state.contents[i].payload} onClick={this.onSelect}>{this.state.contents[i].text}</li>);
      }
    }
    return (<div className={this.props.className + '-content'}>
      <input type='text' onChange={this.onSearch}/>
      <div>{ret}</div>
    </div>);
  },
  render(){
    return <div className={this.props.className}
                style={{width: this.props.width ? this.props.width + 'px' : '100%'}}>
      <span className='dropbtn'
            onClick={this.toggleDropDown}>{this.props.contents[this.state.selectedValue].text}</span>
      {this.renderList()}
    </div>;
  }
});
module.exports = DropDownWithSearch;
