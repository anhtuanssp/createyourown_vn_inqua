import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';

export default class AppBarInqua extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle () { 
  	this.setState({open: !this.state.open}) 
  };

  handleClose () { 
  	this.setState({open: false}) 
  };

  render() {
    return (
      <div>
        <AppBar
		    title="Create Your Own"
		    iconClassNameRight="muidocs-icon-navigation-expand-more"
		    onLeftIconButtonTouchTap = {this.handleToggle.bind(this)}
        iconElementRight = {< FlatButton label="Trang chủ"/>}
		      style={{
			    'backgroundColor': '#677077'
			  }}
		/>
		
        <LeftNav
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >

          <MenuItem onTouchTap={this.handleClose.bind(this)}>Trang chủ</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Danh mục sản phẩm</MenuItem>
          <MenuItem onTouchTap={this.handleClose.bind(this)}>Thiết kế mẫu</MenuItem>

        </LeftNav>
      </div>



    );
  }
}

