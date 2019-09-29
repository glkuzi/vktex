import React from 'react';
import './Inputtex.css';
import Latex from "react-latex";
import 'katex/dist/katex.min.css';
import connect from '@vkontakte/vk-connect'
import { FormLayout, FormLayoutGroup, Textarea, Div } from '@vkontakte/vkui';
import Scrolltex from '../Scrolltex'
import Menutex from '../Menutex'
import html2canvas from 'html2canvas';

const maxHash = 1000000;
const appLink = "https://vk.com/app7150582";

class Inputtex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '$V^K\\TeX$'
        };

        this.hash = {
        	value: 0
		};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		this.onTex = this.onTex.bind(this);
		this.shareApp = this.shareApp.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.hash.value = Math.floor(Math.random() * maxHash)
		connect.send("VKWebAppSetLocation", {"location": this.hash.value.toString()});
    }

    handleSubmit(event) {
        // alert('Сочинение отправлено: ' + this.state.value);
        event.preventDefault();
    }
	
	InsertInCursor(elem) {
		var CurrText = this.state.value;
		
		var myElement = document.getElementById("MainArea");
		var startPosition = myElement.selectionStart;
        var endPosition = myElement.selectionEnd;
		if(startPosition == endPosition){
            var Part1 = CurrText.slice(0,startPosition);
			var Part2 =CurrText.slice(startPosition);
        }else{
			var Part1 = CurrText.slice(0,startPosition);
			var Part2 =CurrText.slice(endPosition);
        }
		return Part1 + elem + Part2
	}
	
	onTex(elem) {
        this.setState({value: this.InsertInCursor(elem)});
    }
	
	downloadImage() {
		
		
		const input = document.getElementById('ImageToDownload');
		html2canvas(input).then((canvas) => {
			var mylink = document.createElement('a');
			mylink.href = canvas.toDataURL('image/png');
			mylink.download = 'vktex.png';
			mylink.style.display = 'none';
			document.body.appendChild(mylink);
			mylink.click();
			mylink.parentNode.removeChild(mylink);
		  });
		
	}

	shareApp(){
    	connect.send("VKWebAppShare", {"link": appLink + "#" + this.hash.value.toString()});
    	//console.log(appLink + "#" + this.hash.value.toString());
	}
	
    render() {
        return (
            <div>
				<Scrolltex onTex={this.onTex}/>
				<FormLayout onSubmit={this.handleSubmit}>
					<label>
						<Textarea id="MainArea" value={this.state.value} onChange={this.handleChange} placeholder={"Введите формулу"} />
					</label>
				</FormLayout>
				
					<Div id="ImageToDownload"><Div className="display-linebreak"><Latex displayMode={true}>{this.state.value}</Latex></Div></Div>
				<Menutex shareApp={this.shareApp} downloadImage={this.downloadImage}/>
            </div>
        );
    }
}


export default Inputtex;
