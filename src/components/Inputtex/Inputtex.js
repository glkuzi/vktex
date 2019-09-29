import React from 'react';
import './Inputtex.css';
import Latex from "react-latex";
import 'katex/dist/katex.min.css';
import { FormLayout, FormLayoutGroup, Textarea, Div } from '@vkontakte/vkui';
import Scrolltex from '../Scrolltex'
import Menutex from '../Menutex'
import html2canvas from 'html2canvas';
import download from 'downloadjs'
import axios from 'axios';
import uuid from 'react-uuid'
import connect from '@vkontakte/vk-connect'
const myhref = '#'

function dataURLtoFile(dataurl, filename){
	const arr = dataurl.split(',')
	const mime = arr[0].match(/:(.*?);/)[1]
	const bstr = atob(arr[1])
	let n = bstr.length
	const u8arr = new Uint8Array(n)
	while (n) {
	  u8arr[n] = bstr.charCodeAt(n)
	  n -= 1 // to make eslint happy
	}
	return new File([u8arr], filename, { type: mime })
}


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

			var isMobileApp = connect.isWebView()

			if (isMobileApp){
				
				let data = new FormData()

				canvas.toBlob(function (blob){
					data.append('img', blob, uuid() + '.png')

					const config = {
						headers: { 
							'Content-Type': 'multipart/form-data'
						}
					}

					const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

					axios.post(PROXY_URL + 'https://vktex.xyz/img/imgupload.php', data, config).
					then(response => {
						if(response.status == 200){
							connect.send("VKWebAppShowImages", { 
								images: [
									response.data['url']
								]
							})
							
						} else {
							console.log(response.status)
						}
						}).catch(error => {
							console.log(error)
						})
					});

			} else{
				download(canvas.toDataURL('image/png'), 'my-node.png');
			}
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
