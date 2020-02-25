'use strict';

import './popup.css';
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import {Button, message} from 'antd';

import Ngcc from './components/ngcc.js';


(function() {
  
  function jumpPage (url) {
    setTimeout(function() {
      chrome.tabs.create({ url });
    }, 1000)
  }
  
  // 调用 chrome.cookies api 设置cookie
  function setCookie(item, value) {
    let host = item.value
    let path = item.path
    chrome.cookies.set({
      url: host,
      name: 'NGCC_SID',
      value,
    }, function(res) {
      if (res) {
        message.success(`${host} 域名已经拷贝成功`)
        let url = path ? `${host}/${path}` : host
        jumpPage(url)
      }
    });
  }
  
  ReactDOM.render(
    <Ngcc setCookie={setCookie}></Ngcc>,
    document.getElementById("root")
  );
  
})();
