import React from 'react';
import ReactDOM from 'react-dom';
import { View, Panel, PanelHeader, Group, List, Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Scrolltex from './components/Scrolltex'
import Inputtex from './components/Inputtex'
import Outputtex from './components/Outputtex'
import Menutex from './components/Menutex'
function App () {
  return (
    <View activePanel="main">
      <Panel id="main">
        <PanelHeader>VKUI</PanelHeader>
		
		<Scrolltex/>
		<Inputtex/>
		<Outputtex/>
		<Menutex/>
      </Panel>
    </View>
  );
}

export default App;
