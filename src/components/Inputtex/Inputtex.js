import React from 'react';
import './Inputtex.css';
import Latex from "react-latex";
import 'katex/dist/katex.min.css';
import { FormLayout, FormLayoutGroup, Textarea, Div } from '@vkontakte/vkui';

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
            <div>
            <FormLayout onSubmit={this.handleSubmit}>
                <label>
                    <Textarea value={this.state.value} onChange={this.handleChange} placeholder={"Введите формулу"} />
                </label>
            </FormLayout>
                <Div className="display-linebreak"><Latex>{this.state.value}</Latex></Div>
            </div>
        );
    }
}


export default Inputtex;
