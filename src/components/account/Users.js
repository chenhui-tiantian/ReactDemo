/**
 * Created by jiangrx on 12/24/15.
 */

const React = require('react');
const Card = require('material-ui/lib/card/card');
const CardText = require('material-ui/lib/card/card-text');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const List = require('material-ui/lib/lists/list');
const ListRow = require('../common/ListRow');
const ControlButtons = require('../common/ControlButtons');
const ListDivider = require('material-ui/lib/lists/list-divider');
const Avatar = require('material-ui/lib/avatar');
const Colors = require('material-ui/lib/styles/colors');
let EditUser = require('./EditUser');
let SearchBar = require('../common/SearchBar');
import SelectField from 'material-ui/lib/select-field';

let StoreUsers = require('../../store/account/UserStore');
let ActionUsers = require('../../actions/account/UserAction');

require('./Users.css');
let Users = React.createClass({
  getInitialState(){
    return {
      users: [],
      user: null,
      enterpriseID: 1,
      editDialogOpen: false,
      displayFilter: 0
    };
  },
  componentWillMount(){
    StoreUsers.addFetchUsersListener(this.onUsersFetched);
    ActionUsers.fetchAllUsers({enterpriseID: this.state.enterpriseID});
  },
  componentWillUpdate(nextProps, nextStates){
    console.log('nextState', nextStates);
  },
  componentWillUnmount(){
    StoreUsers.removeFetchUsersListener(this.onUsersFetched);
  },
  onUsersFetched(){
    this.setState({users: StoreUsers.getUsers()});
  },
  onEditDialogSave(){
    let data = this._edit._getData();
    console.log(data);
    if (this.state.user !== null) {
      ActionUsers.editUser({
        enterpriseID: this.state.enterpriseID,
        userID: this.state.user.id,
        data: data
      });
    } else {
      ActionUsers.addUser({
        enterpriseID: this.state.enterpriseID,
        data: data
      });
    }
    this.onEditDialogClose();
  },
  onEditDialogClose(){
    this.setState({editDialogOpen: false});
  },
  addUser(){
    this.setState({editDialogOpen: true, user: null});
  },
  onDisplayChange(event, selectedIndex){
    this.setState({displayFilter: selectedIndex});
    ActionUsers.setDisplayFilter({displayFilter: selectedIndex});
    if (selectedIndex === 3) {
      ActionUsers.fetchLoggedInUsers({enterpriseID: this.state.enterpriseID});
    } else {
      ActionUsers.fetchAllUsers({enterpriseID: this.state.enterpriseID});
    }
  },
  onSearch(searchText){
    if (this.state.displayFilter !== 3) {
      ActionUsers.fetchAllUsers({enterpriseID: this.state.enterpriseID, has: searchText});
    } else {
      ActionUsers.fetchLoggedInUsers({enterpriseID: this.state.enterpriseID, has: searchText});
    }
  },
  onItemOperation(event, item){
    if (item.key === 'edit') {
      this.setState({editDialogOpen: true, user: this.state.users[item.props.index]});
    } else if (item.key === 'del') {
      ActionUsers.deleteUser({
        userID: this.state.users[item.props.index].id,
        enterpriseID: this.state.enterpriseID
      });
    }
  },
  rightIconMenu (item, index) {
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );
    //TODO: Warning about MenuItem -> <a>
    let ret = (<IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.onItemOperation} desktop={true}>
      <MenuItem key='del' index={index}>Delete</MenuItem>
      <MenuItem key='edit' index={index}>Edit</MenuItem>
    </IconMenu>);
    return ret;
  },
  _renderCards() {
    let ret = [];
    let status = null;
    let name = '';
    let role = '';
    let userName = '';
    let email = '';
    let desc = null;
    let publicKey = null;
    for (let i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].active) {
        status =
          <Avatar color={Colors.green300} backgroundColor={Colors.blue400}>{this.state.users[i].name[0]}</Avatar>;
      } else {
        status = <Avatar color={Colors.red300} backgroundColor={Colors.grey400}>{this.state.users[i].name[0]}</Avatar>;
      }
      name = this.state.users[i].name;
      email = this.state.users[i].email;
      userName = this.state.users[i].nick;
      role = this.state.users[i].links[1].title;
      if (this.state.users[i].hasOwnProperty('description')) {
        desc = <CardText key={this.state.users[i].id + 'desc'} expandable={true}><h3>Description:</h3>
          {this.state.users[i].description}</CardText>;
      }
      if (this.state.users[i].hasOwnProperty('publicSshKey')) {
        publicKey = <CardText key={this.state.users[i].id + 'publickey'} expandable={true}><h3>Public Key:</h3>
          <textarea disabled={true} readonly cols='50'
                    rows='5'>{this.state.users[i].publicSshKey}</textarea></CardText>;
      }
      let primaryText = <h1>{userName}</h1>;
      let secondaryText = <span><h4>Role: {role}</h4><h4>Email: {email} 姓名: {name}</h4></span>;
      let leftIcon = status;
      ret.push(
        <Card key={this.state.users[i].id}
              initiallyExpanded={false}>
          <CardText actAsExpander={(desc !== null) || (publicKey !== null)}>
            <List key={this.state.users[i].id + 'list'}>
              <ListRow key={this.state.users[i].id + 'listRow'} item={this.state.users[i]}
                       primaryText={primaryText}
                       rightIconButton={this.rightIconMenu(this.state.users[i], i)}
                       secondaryText={secondaryText}
                       secondaryTextLines={2}
                       leftIcon={leftIcon}/>
            </List>
          </CardText>
          {desc}
          {publicKey}
        </Card>);
      ret.push(<ListDivider />);
      desc = null;
      publicKey = null;
    }

    return <div>{ret}</div>;
  },
  render(){
    console.log(this.state.user);
    return <div className='users'>
      <SelectField menuItems={[
      {text: 'All', payload: 0},
      {text: 'Active Users', payload: 1},
      {text: 'Inactive Users', payload: 2},
      {text: 'Logged in Users', payload: 3}
      ]} onChange={this.onDisplayChange}/>
      <ControlButtons buttons={{addButton: true}} addButtonHandler={this.addUser}/>
      <SearchBar hintText='' searchHandler={this.onSearch}/>
      {this._renderCards()}
      <EditUser ref={(ref)=>this._edit = ref} open={this.state.editDialogOpen} onRequestClose={this.onEditDialogClose}
                onDialogSubmit={this.onEditDialogSave} user={this.state.user}/>
    </div>;
  }
});
module.exports = Users;
