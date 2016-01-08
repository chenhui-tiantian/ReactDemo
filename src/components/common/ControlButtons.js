/**
 * Created by gtkrab on 15-11-23.
 */
'use strict';

let React = require('react');
const ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
let injectTapEventPlugin = require('react-tap-event-plugin');
const IconButton = require('material-ui/lib/icon-button');
injectTapEventPlugin();

class ControlButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var addB = null;
    var editB = null;
    var delB = null;
    if (this.props.buttons.addButton) {
      addB = <IconButton label='Add' iconClassName="icon-add"
                         style={{width: '38px', height: '26px', padding: '0', background: '#cccccc', margin: '0px 5px'}}
                         onClick={this.props.addButtonHandler}/>;
    }
    if (this.props.buttons.editButton) {
      editB = <IconButton label='Edit' iconClassName="icon-edit"
                          style={{width: '38px', height: '26px', padding: '0', background: '#cccccc', margin: '0px 5px'}}
                          onClick={this.props.editButtonHandler}/>;
    }
    if (this.props.buttons.deleteButton) {
      delB = <IconButton label='Delete' iconClassName="icon-del"
                         style={{width: '38px', height: '26px', padding: '0', background: '#cccccc', margin: '0px 5px'}}
                         onClick={this.props.deleteButtonHandler}/>;
    }
    return (
      < ButtonToolbar className="icon-aed">
        {addB}
        {editB}
        {delB}
      </ButtonToolbar>
    );
  }
}
ControlButtons.defaultProps = {
  buttons: {
    addButton: true,
    editButton: true,
    deleteButton: true
  },
  addButtonHandler: null,
  editButtonHandler: null,
  deleteButtonHandler: null,
  style: null
};

module.exports = ControlButtons;
