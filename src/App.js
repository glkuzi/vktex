import React from 'react';
import ReactDOM from 'react-dom';
import { View, Panel, PanelHeader, Group, List, Cell } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Inputtex from './components/Inputtex'
import Latex from "react-latex";
import 'katex/dist/katex.min.css';
function App () {
  return (
    <View activePanel="main">
      <Panel id="main">
        <PanelHeader><Latex>$V^K\TeX Dev$</Latex></PanelHeader>
		
		<Inputtex/>
		
      </Panel>
    </View>
  );
}

export default App;
