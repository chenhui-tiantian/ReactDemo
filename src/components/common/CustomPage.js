/**
 * Created by chenh on 2015/11/27.
 */
var React = require('react');
const RaisedButton = require('material-ui/lib/raised-button');
let injectTapEventPlugin = require('react-tap-event-plugin');
const FlatButton = require('material-ui/lib/flat-button');
injectTapEventPlugin();
require('../../styles/main.css');
var currentPage = 1;
const CustomPage = React.createClass({
  getDefaultProps() {
    return {
      maxSize: 5,
      currentPage: 1,
      limit: 10,
      totalSize: 0,
      searchClick: (maxSize, currentPage, limit, startwith, totalSize)=> {
      }
    };
  },
  clickSearch(e)
  {
    //console.log(e.target.textContent);
    var maxSize = this.props.maxSize;
    var limit = this.props.limit;
    var totalSize = this.props.totalSize;
    currentPage = e.target.textContent;
    var startwith = (currentPage - 1) * limit;

    this.props.searchClick(maxSize, currentPage, limit, startwith, totalSize);
  },
  clickPrePage(e)
  {
    var maxSize = this.props.maxSize;
    var pre = (this.getPage(currentPage, maxSize) - 2) * maxSize + 1;

    var limit = this.props.limit;
    var totalSize = this.props.totalSize;

    currentPage = pre;
    var startwith = (currentPage - 1) * limit;

    this.props.searchClick(maxSize, currentPage, limit, startwith, totalSize);
  },

  clickNextPage(e)
  {
    var maxSize = this.props.maxSize;
    var next = this.getPage(currentPage, maxSize) * maxSize + 1;

    var maxSize = this.props.maxSize;
    var limit = this.props.limit;
    var totalSize = this.props.totalSize;

    currentPage = next;
    var startwith = (currentPage - 1) * limit;

    this.props.searchClick(maxSize, currentPage, limit, startwith, totalSize);
  },

  getPage(num, size){
    return Math.ceil(num / size);
  },

  render: function () {

    var maxSize = this.props.maxSize;
    var limit = this.props.limit;
    var totalSize = this.props.totalSize;
    currentPage = this.props.currentPage;

    var totalPages = this.getPage(totalSize, limit);
    var totalPageSet = this.getPage(totalPages, maxSize);
    var currentPageSet = this.getPage(currentPage, maxSize);

    if ((currentPageSet > totalPageSet) || (this.props.currentPage > totalPages)) {
      currentPage = totalPages;
      currentPageSet = totalPageSet;
    }
    var pagecomponet = [];
    if (totalPageSet > currentPageSet) {
      if (currentPageSet > 1) {
        pagecomponet.push(<FlatButton style={{minWidth: '0px', margin: '0px 3px' }} hoverColor='pink'
                                      labelStyle={{padding: '0px 5px'}} label='<' onClick={this.clickPrePage}
                                      key={-1}/>);
      }

      for (var i = (currentPageSet - 1) * maxSize + 1; i <= currentPageSet * maxSize; i++) {
        if (i == currentPage) {
          pagecomponet.push(<FlatButton className='pagination-li' style={{minWidth: '0px', margin: '0px 3px' }}
                                        backgroundColor='red' hoverColor='pink' labelStyle={{padding: '0px 5px'}}
                                        label={i} onClick={this.clickSearch} key={i}/>);

        }
        else {
          pagecomponet.push(<FlatButton className='pagination-li' style={{minWidth: '0px', margin: '0px 3px' }}
                                        hoverColor='pink' labelStyle={{padding: '0px 5px'}} label={i}
                                        onClick={this.clickSearch} key={i}/>);

        }
      }

      pagecomponet.push(<FlatButton className='pagination-li' style={{minWidth: '0px', margin: '0px 3px' }}
                                    hoverColor='pink' labelStyle={{padding: '0px 5px'}} label='>'
                                    onClick={this.clickNextPage} key={-2}/>);

    }
    else if (totalPageSet === currentPageSet) {

      if(currentPageSet > 1){
        if (currentPageSet > 1) {
          pagecomponet.push(<RaisedButton className='pagination-li' style={{minWidth: '0px', margin: '0px 3px' }}
           labelStyle={{padding: '0px 5px'}} label='<' onClick={this.clickPrePage} key={0}/>);
        }
        for (var i = (currentPageSet - 1) * maxSize + 1; i <= totalPages; i++) {
          if (i === currentPage) {

            pagecomponet.push(<FlatButton className='pagination-li' style={{minWidth: '0px', margin: '0px 3px' }}
                                          backgroundColor='red' hoverColor='pink' labelStyle={{padding: '0px 5px'}}
                                          label={i} onClick={this.clickSearch} key={i}/>);

          }
          else {
            pagecomponet.push(<FlatButton className='pagination-li' style={{minWidth: '0px', margin: '0px 3px' }}
                                          hoverColor='pink' labelStyle={{padding: '0px 5px'}} label={i}
                                          onClick={this.clickSearch} key={i}/>);

          }
          //pagecomponet.push(<RaisedButton className='pagination-li' label={i} onClick={this.clickSearch} key={i}/>);
        }
      }
      else{
        for (var i = 1; i <= totalPages; i++) {
          if (i === currentPage) {

            pagecomponet.push(<FlatButton className='pagination-li' style={{minWidth: '0px', margin: '0px 3px' }}
                                          backgroundColor='red' hoverColor='pink' labelStyle={{padding: '0px 5px'}}
                                          label={i} onClick={this.clickSearch} key={i}/>);

          }
          else {
            pagecomponet.push(<FlatButton className='pagination-li' style={{minWidth: '0px', margin: '0px 3px' }}
                                          hoverColor='pink' labelStyle={{padding: '0px 5px'}} label={i}
                                          onClick={this.clickSearch} key={i}/>);

          }
          //pagecomponet.push(<RaisedButton className='pagination-li' label={i} onClick={this.clickSearch} key={i}/>);
        }
      }

    }

    return (
      <div className='pagination'>
        {pagecomponet }
      </div>
    );
  }
});

module.exports = CustomPage;
