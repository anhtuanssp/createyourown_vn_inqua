import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '../../commons/appBar';
import SliderInqua from './_partial/sliderCard';
import GridThietkemau from './_partial/thietkemau';
import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


ReactDOM.render(<AppBar />, document.getElementById('header'));
ReactDOM.render(<SliderInqua />, document.getElementById('slider'));
ReactDOM.render(<GridThietkemau />,document.getElementById('thietkemau'))

