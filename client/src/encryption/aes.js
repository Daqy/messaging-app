var CryptoJS = require("crypto-js");

var key = "obvwoqcbv21801f19d0zibcoavwpnq";

export const DoEncrypt = (text) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const DoDecrypt = (cipher) => {
  if (cipher == "Say Hello!") return cipher;
  return CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
};
