/**
 * Created by gtkrab on 15-11-23.
 */
'use strict';

let React = require('react');
const TextField = require('material-ui/lib/text-field');
const IconButton = require('material-ui/lib/icon-button');
const UniCloud = require('../../themes/unicloud');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const Colors = require('material-ui/lib/styles/colors');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
require('./SearchBar.css');

let SearchBar = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },
  getInitialState() {
    return {
      searchText: '',
      muiTheme: ThemeManager.getMuiTheme(UniCloud)
    };
  },
  getDefaultProps(){
    return {
      searchHandler: null,
      hintText: '回车搜索',
      labelText: '搜索'
    };
  },
  componentWillMount(){
    let theme = this.state.muiTheme;
    theme.textField.hintColor = Colors.lightBlue600;
    theme.textField.focusColor = Colors.lightBlue300;
    this.setState({muiTheme: theme});
  },
  updateSearchText(){
    this.setState({searchText: this.refs.searchInput.getValue()});
  },
  searchHandler() {
    if (this.props.searchHandler !== null) {
      this.props.searchHandler(this.state.searchText);
    }
  },
  clearSearch(){
    this.refs.searchInput.clearValue();
    this.setState({searchText: this.refs.searchInput.getValue()});
  },
  render() {

    let {hintText ,labelText, updateSearchText, searchHandler, ...other}= this.props;
    return (
      <div className='row' >
        <div className='col-12 bottom searchWidth'>
          <TextField
            {...other}
            hintText={this.props.hintText}
            ref='searchInput'
            fullWidth={false}
            floatingLabelText={this.props.labelText}
            onChange={this.updateSearchText}
            onEnterKeyDown={this.searchHandler}
            style={{width: '80%'}}/>
            <span onClick={this.clearSearch}>C</span>
          </div>
        </div>
    );
  }
});

module.exports = SearchBar;
