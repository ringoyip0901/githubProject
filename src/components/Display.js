import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Frame from './children/Table.js'
import "../css/index.css";

export const Display = (props) => {
  const issues = props.issues;
  const backup = props.backup; 
  return (
    <MuiThemeProvider>
      <div id="display">
        <Frame issues={issues} filterSuccess={props.filterSuccess} backup={backup} />
      </div>
    </MuiThemeProvider>
  )
}