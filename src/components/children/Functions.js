import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export const styles = {
  chip: {
    margin: 1,
  },
  tableRow: {
    width: 30,
  },
  dropdownmenu: {
    width: 50,
    top: 22
  },
  item: {
    fontWeight:600,
    color: "#24292e",
    paddingLeft: 27,
    paddingBottom: 13,
    lineHeight: 2,
    fontSize: 12,
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
  },
  items: {
    fontWeight:100,
    color: "#24292e",
    paddingLeft: 0,
    lineHeight: 2,
    fontSize: 12,
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
  },
  menuitemstyle: {
    borderTop: "0.25px solid lightgray",
  }
};

export function FormateDate(date) {
  let dateString = new Date(date).toString()
  let slicedDate = dateString.split(" ").slice(1,4)
  let openDate = slicedDate.join(" ");
  return openDate;
}

export function Label(labels) {
  const chips = [];
  if (!labels.length) {
    return;
  }
  else {
    for (let i = 0; i < labels.length; i++) {
      let color = "#" + labels[i].color
      chips.push(<a className="chip" style={{backgroundColor: color}}>{labels[i].name}</a>)
    }
  }
  return chips;
};

export function Assign(assignees) {
  const avatars = [];
  if (!assignees.length) {
    avatars.push(<div id='emptyAvatar'></div>)
  }
  else {
    for (let i = 0; i < assignees.length; i++) {
      avatars.push(<Avatar src={assignees[i].avatar_url} />)
    }
  }
  return avatars;
}

export function Author(menu=[true]) {
  const items = [];
  const names = [];
  if (!menu.length) {
    return;
  }
  else {
    menu.forEach((element, i) => {
      if (names.indexOf(element.user.login) === -1) {
        items.push(<MenuItem style={styles.items} value={element.user.login} key={i}>
          <div id="authors">
            <Avatar id="authorPic" src={element.user.avatar_url} />
            <span>{element.user.login}</span>
          </div>
        </MenuItem>)
      }
      names.push(element.user.login);
    })
  }
  return items;
}

export function LabelMenu(menu) {
  const items = [];
  const labels = [];
  items.push(<div style={styles.item}>Filter by Label</div>)
  if (!menu.length) {
    return;
  }
  else {
    for (let i = 0; i < menu.length; i++) {
      if (!menu[i].labels.length) {
        continue;
      }
      else {
        menu[i].labels.forEach((element, index) => {
          let color = element.color;
          if (labels.indexOf(element.name) === -1) {
            items.push(<MenuItem style={styles.items} value={element.name}><div id='labelColor' style={{border: `6px solid #${color}`}}></div>{element.name}</MenuItem>)
          }
          labels.push(element.name)
        })
      }
    }
  }
  return items;
}
