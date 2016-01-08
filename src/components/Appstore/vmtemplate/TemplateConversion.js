/**
 * Created by jiangrx on 12/23/15.
 */

const React = require('react');
const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');
const FlatButton = require('material-ui/lib/flat-button');

let ActionVMTemplate = require('../../../actions/appstore/vmtemplate/VMTemplateAction');
let StoreVMTemplate = require('../../../store/appstore/vmtemplate/VMTemplateStore');

let TemplateDiskType = React.createClass({
  getInitialState(){
    return {
      conversions: [],
      conversionTypes: []
    };
  },
  getDefaultProps(){
    return {
      enterpriseID: 0,
      dcID: 0,
      vmTemplateID: 0,
      conversionTypes: ['RAW', 'QCOW2_SPARSE', 'VMDK_SPARSE', 'VHD_SPARSE', 'VDI_SPARSE']
    };
  },
  componentWillMount(){
    StoreVMTemplate.addFetchedConversionsSuccessListener(this.onConversionFetched);
    if ((this.props.enterpriseID !== 0) && (this.props.dcID !== 0) && (this.props.templateID !== 0)) {
      ActionVMTemplate.fetchConversions({
        enterpriseID: this.props.enterpriseID,
        dcID: this.props.dcID,
        templateID: this.props.templateID
      });
    }
  },
  componentWillUnmount(){
    console.log('unmount');
    StoreVMTemplate.removeFetchedConversionsSuccessListener(this.onConversionFetched);
  },
  onConversionFetched(){
    console.log('fetched conversions');
    this.setState({
      conversions: StoreVMTemplate.getConversions(),
      conversionTypes: StoreVMTemplate.getConversionTypes()
    });
  },
  unit(data, index) {
    if (isNaN(data)) {
      console.log(data);
      return 'N/A';
    } else {
      let units = [' Byes', ' KB', ' MB', ' GB', ' TB', ' TB', ' TB', ' TB'];
      let size = '';
      if (data <= 1024) {
        size = data + units[index];
      } else if (data <= (1024 * 1024)) {
        size = (data / 1024).toFixed(2) + units[index + 1];
      } else if (data <= (1024 * 1024 * 1024)) {
        size = (data / 1024 / 1024).toFixed(2) + units[index + 2];
      } else {
        size = (data / (1024 * 1024 * 1024)).toFixed(2) + units[index + 3];
      }
      return size;
    }
  },
  onConvert(i, e){
    ActionVMTemplate.convertTemplate({
      enterpriseID: this.props.enterpriseID,
      dcID: this.props.dcID,
      templateID: this.props.templateID,
      data: {targetFormat: this.props.conversionTypes[i]}
    });
  },
  onReConvert(i, e){
    ActionVMTemplate.reconvertTemplate({
      enterpriseID: this.props.enterpriseID,
      dcID: this.props.dcID,
      templateID: this.props.templateID,
      targetFormat: this.props.conversionTypes[i],
      data: {targetFormat: this.props.conversionTypes[i]}
    });
  },
  renderRows(){
    let ret = [];
    for (let i = 0; i < this.props.conversionTypes.length; i++) {
      let index = this.state.conversionTypes.indexOf(this.props.conversionTypes[i]);
      if (index !== -1) {
        ret.push(<TableRow key={this.props.templateID + this.state.conversions[index].targetFormat}>
          <TableRowColumn key={0}>{this.props.conversionTypes[i]}</TableRowColumn>
          <TableRowColumn key={1}>{this.state.conversions[index].state}</TableRowColumn>
          <TableRowColumn key={2}>{this.unit(this.state.conversions[index].targetSizeInBytes, 0)}</TableRowColumn>
          <TableRowColumn key={3}>
            <FlatButton disabled={this.state.conversions[index].state !== 'FAILED'}
                        label='重新转换'
                        onTouchTap={this.onReConvert.bind(this, index)}/>
          </TableRowColumn>
        </TableRow>);
      } else {
        ret.push(<TableRow key={this.props.templateID + this.props.conversionTypes[i]}>
          <TableRowColumn key={0}>{this.props.conversionTypes[i]}</TableRowColumn>
          <TableRowColumn key={1}>{'未转换'}</TableRowColumn>
          <TableRowColumn key={2}>{'N/A'}</TableRowColumn>
          <TableRowColumn key={3}>
            <FlatButton disabled={false}
                        label='转换'
                        onTouchTap={this.onConvert.bind(this, i)}/>
          </TableRowColumn>
        </TableRow>);
      }

    }
    return ret;
  },
  render(){
    console.log('render');
    return <Table
      fixedHeader={false}
      selectable={false}>
      <TableHeader enableSelectAll={false}
                   displaySelectAll={false}
                   adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn tooltip='Conversion Target'>目标格式</TableHeaderColumn>
          <TableHeaderColumn tooltip='Status'>状态</TableHeaderColumn>
          <TableHeaderColumn tooltip='Size'>占用空间</TableHeaderColumn>
          <TableHeaderColumn tooltip='Actions'>操作</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        deselectOnClickaway={true}
        showRowHover={true}
        stripedRows={true}
        displayRowCheckbox={false}>
        {this.renderRows()}
      </TableBody>
    </Table>;
  }
});
module.exports = TemplateDiskType;
