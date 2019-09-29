import React from 'react';
import './Inputtex.css';
import Latex from "react-latex";
import 'katex/dist/katex.min.css';
import connect from '@vkontakte/vk-connect'
import { FormLayout, FormLayoutGroup, Textarea, Div } from '@vkontakte/vkui';
import Scrolltex from '../Scrolltex'
import Menutex from '../Menutex'
import html2canvas from 'html2canvas';
import download from 'downloadjs'
import axios from 'axios';
import uuid from 'react-uuid';
const myhref = '#';
const maxHash = 1000000;
const appLink = "https://vk.com/app7150582";


class Inputtex extends React.Component {
	constructor(props) {
		//newconsole = document.getElementById('root').;
		super(props);
		
		this.url = document.location.hash
		this.testing = this.url.slice(1)
		if (typeof this.testing === 'undefined'){
			this.currentKey = '';
		}
		else{
			this.currentKey = this.testing;
		}

		//this.currentKey = url.replace(appLink + '#', '');
		console.log(this.currentKey);
		console.log(this.testing);
		this.restoredValue = '$V^K\\TeX$';
		if (this.currentKey == ''){
			this.state = {
				value: '$V^K\\TeX$'
			};
			console.log('empty');
		}
		else{
			this.currentKey
			connect.subscribe((el) => this.parseHash(el));
			console.log(this.currentKey);
			connect.send("VKWebAppStorageGet", {"keys": [this.currentKey.toString()], "global": true});
			this.state = {
				value: this.restoredValue
			};
		}

		this.hash = {
			value: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onTex = this.onTex.bind(this);
		this.shareApp = this.shareApp.bind(this);
		this.parseHash = this.parseHash.bind(this);
	}



	handleChange(event) {
		this.setState({value: event.target.value});
		this.hash.value = Math.floor(Math.random() * maxHash);
		this.hashStr = this.state.value;
		connect.send("VKWebAppSetLocation", {"location": this.hash.value.toString()});
		// for debug
		connect.send("VKWebAppStorageSet", {"key": this.hash.value.toString(), "value": this.hashStr, "global": true});
		//connect.send("VKWebAppSetLocation", {"location": this.hashStr});
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

	shareApp(){
		//connect.send("VKWebAppShare", {"link": appLink + "#" + this.hash.value.toString()});
		connect.send("VKWebAppShare", {"link": appLink + '#' + this.hash.value.toString()});
		connect.send("VKWebAppStorageSet", {"key": this.hash.value.toString(), "value": this.hashStr, "global": true});
		//console.log(appLink + '#' + this.hashStr.replace(/ /g, '%20'));
		//var url = window.location.href;
		//var url = appLink + '#' + this.hashStr.replace(/ /g, '%20');
		//var currentKey = url.replace(appLink + '#', '');
		//console.log(url.replace(appLink + '#', ''));
		//console.log(this.currentKey);
	}

	parseHash(e){
		console.log(e.detail.type);
		if (e.detail.type == "VKWebAppStorageGetResult"){
			this.restoredKeys = e.data.keys;
			for (let x in this.restoredKeys){
				if (x.key == this.currentKey){
					this.restoredValue = x.value;
				}
			}
		}
		if (e.type == "VKWebAppStorageGetFailed"){
			console.log(e.data.error_type)
			console.log(e.data)
		}
	}
	
    render() {
        return (
            <div>
			<p id="testP"></p>
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
