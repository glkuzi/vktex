import React from 'react';
import './Scrolltex.css';
import { HorizontalScroll,  Group, Header} from '@vkontakte/vkui';

const itemStyle = {
    
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection:
    'column',
    alignItems: 'center',
    fontSize: 24,
	backgroundColor: 'grey',
	margin: 4,
	padding: 2
  };

class Scrolltex extends React.Component {
   render() {
     return  <Group style={{ paddingBottom: 8 }}> 
	 <Header level="secondary">Инструменты</Header><HorizontalScroll>
          <div style={{ display: 'flex' }}>
            <div style={{ ...itemStyle, paddingLeft: 4 }}>
              F
            </div>
            <div style={itemStyle}>
              Z
            </div>
            <div style={itemStyle}>
              X
            </div>
            <div style={itemStyle}>
              Th
            </div>
			<div style={itemStyle}>
              A
            </div>
            <div style={itemStyle}>
              Z
            </div>
            <div style={itemStyle}>
              X
            </div>
            <div style={itemStyle}>
              Th
            </div>
          </div>
        </HorizontalScroll> </Group>;
   }
}


export default Scrolltex;
