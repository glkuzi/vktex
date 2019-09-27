import React from 'react';
import './Menutex.css';
import Icon24ShareExternal from '@vkontakte/icons/dist/24/share_external';
import { Tabbar,  TabbarItem} from '@vkontakte/vkui';

class Menutex extends React.Component {
   render() {
     return (
	 <Tabbar>
          <TabbarItem
            text="Экспорт"
          ><Icon24ShareExternal /></TabbarItem>
          
        </Tabbar>
	 )
   }
}


export default Menutex;
