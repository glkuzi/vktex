import React from 'react';
import './Outputtex.css';
import Latex from "react-latex";

/*
class Inputtex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        // alert('Сочинение отправлено: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Отправить" />
            </form>
    );
    }
    }


class Outputtex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: ''
        };
    }
    renderInput() {
        return <Inputtex value={this.state.txt} />;
    }
   render() {
     return (
         <div>
         <div className="Inp">
             {this.renderInput()}
         </div>
         <div>
             {this.state.txt}
         </div>
    </div>
     );
   }
}
*/

class Outputtex extends React.Component {
    render() {
        return <div>This is a component called Outputtex.</div>;
    }
}

export default Outputtex;
