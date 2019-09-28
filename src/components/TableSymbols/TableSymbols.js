import React from 'react';
import './TableSymbols.css';
import Latex from "react-latex";


class TableSymbols extends React.Component  {
  
  render() {
	    
        return (
            <div className="Content">
                <span> Table </span>
                <div class="TableSymbolsContainer">
                    {
                      this.props.data.map(elem=>{
                        return (
							<button onClick={this.props.onTex.bind(this, elem[1])}> 
							
								<Latex>{elem[0]}</Latex>
							</button>)
                          })
                    }
                </div>
            </div>
        );
    }
}

export default TableSymbols;
