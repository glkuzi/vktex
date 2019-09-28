import React from 'react';
import './Menutex.css';
import Icon24ShareExternal from '@vkontakte/icons/dist/24/share_external';
import { Tabbar,  TabbarItem} from '@vkontakte/vkui';
import Icon24Download from '@vkontakte/icons/dist/24/download';
class Menutex extends React.Component {
   render() {
     return (
	 <Tabbar>
          <TabbarItem
            text="Экспорт"
          ><Icon24ShareExternal /></TabbarItem>
          <TabbarItem
            text="Скачать" onClick={this.props.downloadImage.bind(this)}
          ><Icon24Download /></TabbarItem>
        </Tabbar>
	 )
   }
}


export default Menutex;
