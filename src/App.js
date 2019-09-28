import React from 'react';
import ReactDOM from 'react-dom';
import { View, Panel, PanelHeader, Group, List, Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Scrolltex from './components/Scrolltex'
import Inputtex from './components/Inputtex'
import Outputtex from './components/Outputtex'
import Menutex from './components/Menutex'
import Latex from "react-latex";
import 'katex/dist/katex.min.css';
function App () {
  return (
    <View activePanel="main">
      <Panel id="main">
        <PanelHeader><Latex>$V^K\TeX$</Latex></PanelHeader>
		
		<Scrolltex/>
		<Inputtex/>
		<Menutex/>
      </Panel>
    </View>
  );
}

export default App;
