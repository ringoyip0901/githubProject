import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIssues, filterSuccess } from '../actions/actions.js';
import { Display } from '../components/Display';
import * as actions from '../actions/actions.js';

const mapStateToProps = state => ({
    issues: state.issues, 
    backup: state.backup, 
    keyword: state.keyword,
    filterType: state.filterType,
})

const mapDispatchToProps = actions;

class MainContainer extends Component {

  componentDidMount() {
    this.props.fetchIssues();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      return true;
    }
    else {
      return false;
    }
    if (JSON.stringify(this.props.issues) === JSON.stringify(nextProps.issues)) {
      return false;
    }
  }

  componentDidUpdate() {
    if (this.props.keyword && this.props.filterType == "author") {
      this.props.fetchIssues(this.props.keyword, this.props.filterType);
    }
    else if (this.props.keyword && this.props.filterType == "label") {
      this.props.fetchIssues(this.props.keyword, this.props.filterType);
    }
    else if (this.props.keyword && this.props.filterType == "date") {
      this.props.fetchIssues(this.props.keyword, this.props.filterType);
    }
  }

  render() {
    return (
      <div><Display issues={this.props.issues} filterSuccess={this.props.filterSuccess} backup={this.props.backup} /></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
