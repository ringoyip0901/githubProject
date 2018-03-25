import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { styles, FormateDate, Label, Assign, Author, Row, cellClicked, LabelMenu, sortMenu } from './Functions.js'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import logo from './logo.png';
import chatbox from './chatbox.png';

export const Frame = (props) => {
  const Row = () => {
    const rows = [];
    for (let i = 0; i < props.issues.length; i++) {
      rows.push(
        <TableRow key={i}>
          <TableRowColumn style={styles.tableRow}>
            <img id='openLogo' src={logo} />
          </TableRowColumn>
          <TableRowColumn>
          <div id='container-left'>
            <div className='float-left'>
              <a id='title' href={props.issues[i].html_url}>{props.issues[i].title}</a>
              <span id='label'>{Label(props.issues[i].labels)}</span>
              <div id='status'>#{props.issues[i].number} opened on {FormateDate(props.issues[i].created_at)} by {props.issues[i].user.login}</div>
            </div>
            </div>
            <div id='container-right'>
              <div className='float-right'>
                {Assign(props.issues[i].assignees)}
                <span id='comments'>{props.issues[i].comments}</span><img className='chatbox' src={chatbox}></img>
              </div>
            </div>
          </TableRowColumn>
        </TableRow>
      );
    }
    return rows;
  };

  const cellClicked = rowNumber => window.location.href = props.issues[rowNumber].html_url;

  const handleChangeAuthor = (event, index, value) => props.filterSuccess(value, "author");

  const  handleChangeLabel = (event, index, value) => props.filterSuccess(value, "label");

  const handleSortDates = (event, index, value) => props.filterSuccess(value, "sort");

  return (
    <div id='table'>
      <Table onCellClick={cellClicked}>
        <TableHeader>
          <TableRow>
            <div id='displayLeft' className="displayHeader">
              <TableHeaderColumn>
                <a className='open'>Open</a>
                <a className='closed'>Closed</a>
              </TableHeaderColumn>
            </div>
            <div id='displayRight' className="displayHeader">
              <TableHeaderColumn id="author">
                <span>Author                  
                  <DropDownMenu style={styles.dropdownmenu} menuStyle={{width: '300px'}} menuItemStyle ={styles.menuitemstyle} maxHeight={300} value="Author" onChange={handleChangeAuthor}>
                    <div style={styles.item}>Filter by Author</div>
                    {Author(props.backup)}
                  </DropDownMenu>
                </span>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span>Labels
                  <DropDownMenu style={styles.dropdownmenu} menuStyle={{width: '300px'}} menuItemStyle={styles.menuitemstyle} maxHeight={300} value="Label" onChange={handleChangeLabel}>
                    {LabelMenu(props.backup)}
                  </DropDownMenu>
                </span>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span>Milestones
                  <DropDownMenu style={styles.dropdownmenu} disabled='false'></DropDownMenu>
                </span>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span>Assignee
                  <DropDownMenu style={styles.dropdownmenu} disabled='false'></DropDownMenu>
                </span>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span>Sort
                  <DropDownMenu style={styles.dropdownmenu} menuStyle={{width: '300px'}} menuItemStyle={styles.menuitemstyle} maxHeight={300} value="Sort" onChange={handleSortDates}>
                    {sortMenu()}
                  </DropDownMenu>
                </span>
              </TableHeaderColumn>
            </div>
          </TableRow>
        </TableHeader>
        <TableBody>{Row()}</TableBody>
      </Table>
    </div>
  );
};

export default Frame;