import axios from 'axios';
import { useState } from 'react';
var CryptoJS = require("crypto-js");

const key = process.env.REACT_APP_FERNET_KEY


const encryptText = (text) => {

    const keyBytes = CryptoJS.enc.Utf8.parse(key)
    const message = CryptoJS.enc.Utf8.parse(text)

    return CryptoJS.AES.encrypt(message, keyBytes, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: keyBytes

    }).toString();

};

export { encryptText }