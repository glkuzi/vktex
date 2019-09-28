import React from 'react';
import './TableSymbols.css';
import Latex from "react-latex";


class TableSymbols extends React.Component  {
	handleClickTex(elem) {
      console.log('объект:', elem);
    }
  render() {
	    
        return (
            <div className="Content">
                <span> Table </span>
                <div class="TableSymbolsContainer">
                    {
                      this.props.data.map(elem=>{
                        return (
							<button onClick={this.handleClickTex.bind(this, elem)}> 
							
								<Latex>{elem}</Latex>
							</button>)
                          })
                    }
                </div>
            </div>
        );
    }
}

export default TableSymbols;
