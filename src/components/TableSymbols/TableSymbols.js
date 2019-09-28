import React from 'react';
import './TableSymbols.css';
import Latex from "react-latex";

import { Button} from '@vkontakte/vkui';

class TableSymbols extends React.Component  {
  
  render() {
	    
        return (
            <div className="Content">
                
                <div class="TableSymbolsContainer">
                    {
                      this.props.data.map(elem=>{
                        return (
							<Button onClick={this.props.onTex.bind(this, elem[1])}> 
							
								<Latex>{elem[0]}</Latex>
							</Button>)
                          })
                    }
                </div>
            </div>
        );
    }
}

export default TableSymbols;
