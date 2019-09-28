import React from 'react';
import './Inputtex.css';
import Latex from "react-latex";
import 'katex/dist/katex.min.css';
import { FormLayout, FormLayoutGroup, Textarea, Div } from '@vkontakte/vkui';
import Scrolltex from '../Scrolltex'
import Menutex from '../Menutex'
import html2canvas from 'html2canvas';
import download from 'downloadjs'
import RNFetchBlob from 'rn-fetch-blob'
const myhref = '#'
class Inputtex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '$V^K\\TeX$'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		this.onTex = this.onTex.bind(this);
    }
	
	
	
    handleChange(event) {
        this.setState({value: event.target.value});
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

			download(canvas.toDataURL('image/png'), 'my-node.png');
			
			var base64ImageString = canvas.toDataURL('image/png');

			RNFetchBlob.fetch('POST', 'https://vktex.xyz/img/imgupload.php', {
				'Content-Type' : 'application/octet-stream',  
			  }, base64ImageString)
			  .then((res) => {
				console.log(res.text())
			  })
			  .catch((err) => {
			  })

		  });
		
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
				
					<div id="ImageToDownload"><Div className="display-linebreak"><Latex>{this.state.value}</Latex></Div></div>
					
				<Menutex downloadImage={this.downloadImage}/>
            </div>
        );
    }
}


export default Inputtex;
