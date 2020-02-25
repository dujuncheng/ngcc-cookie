import React, {Component} from 'react';
import { Button, Select, message } from "antd";
const { Option } = Select;
const axios = require('axios');
import {PROJECT_LIST} from '../constant.js'

class Ngcc extends Component {
	constructor() {
		super();
		this.handleSelect = this.handleSelect.bind(this)
		this.startCopy = this.startCopy.bind(this)
		this.getCookies = this.getCookies.bind(this)
		this.handleInvalid = this.handleInvalid.bind(this)
		this.state = {
			children: PROJECT_LIST,
			selectArr: [],
			// 0默认 1 成功 2 失败
			result: {
				type: '1',
				message: ''
			},
			ngcc_sid: '',
		}
	}
	componentDidMount() {
		this.getMessage()
	}
	
	getCookies(domain, name, callback) {
		chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
			if(callback) {
				callback(cookie && cookie.value || '');
			}
		});
	}
	
	handleError() {
		message.error('请求失败');
	}
	
	// 发送请求
	getMessage() {
		let that = this;
		//  先检查登录状态
		axios({
			method: 'get',
			url: 'https://www.baidu.com',
		}).then(function (res) {
			// 登录状态有效
			if (res && res.status == 200 && res.data) {
			
			} else {
				that.handleInvalid()
			}
		}).catch(function (e) {
			that.handleInvalid()
		})
	}
	
	handleSelect(list) {
		let { children } = this.state
		let obj = []
		for (let i = 0; i < list.length; i++) {
			let item = list[i]
			obj.push(children[item])
		}
		this.setState({
			selectArr: obj
		})
	}
	
	startCopy(e) {
		let { selectArr, ngcc_sid } = this.state;
		let { setCookie } = this.props;
		console.log('selectArr', selectArr)
		for (let i = 0; i < selectArr.length; i++) {
			setCookie(selectArr[i], ngcc_sid)
		}
	}
	
	render() {
		let { children, selectArr, result} = this.state;
		
		return (
			<div className="App">
			
			</div>
		);
	}
}

export default Ngcc;
