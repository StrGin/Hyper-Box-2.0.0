import { createSmoothTimer } from "../smoothTimer"
Page({
  onInit() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    //---------------------------------控件部分-------------------------------------
    const time_widget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 66,
      y: 26,
      w: 62,
      h: 40,
      color: 0xFFFFFF,
      text_size: 22.67,
      text: time_view
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 66,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26.67,
      text: '卸载'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 34,
      y: 126,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26.67,
      text: 'o(TヘTo)~'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 175,
      w: 180,
      h: 124,
      color: 0xBBBBBB,
      text_size: 24.67,
      alignh: hmUI.align.CENTER_H,
      text: '您真的要卸载\n一个这么好用的\n小程序吗？'
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 33,
      y: 304,
      w: 126,
      h: 65,
      text: '取消',
      normal_color: 0x4E87FF,
      press_color: 0x0050F7,
      color: 0xFFFFFF,
      radius: 35,
      text_size: 24.67,
      click_func: () => {
        hmApp.goBack()
      }
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 33,
      y: 378,
      w: 126,
      h: 65,
      text: '依旧',
      normal_color: 0x232020,
      press_color: 0x151313,
      color: 0xFFFFFF,
      radius: 35,
      text_size: 24.67,
      click_func: () => {
        remove()
        function fn(a) {
          console.log(a);
          fn(a);
        }
        fn(1)
      }
    })
    //---------------------------------函数部分-------------------------------------
    function remove () {
      for (let i = 0; i <= 22; i++) {
        hmFS.remove(`/storage/data/js_apps/001008B1/assets/${i}.png`);
      }
      const additionalFiles = [
        'backbround.png', 'check.png', 'icon.png',
        'app.bin', 'app.json', 'app.js'
      ];
      const pages = [
        'Delete','Box_set','Setting','Sentence','Calculator', 'Delete', 'Fluorescence', 'Fluorescence_set', 
        'Fluorescence_view', 'index', 'Sentence', 'Welcome', 'AnswerBook','Password','Calculator','Fluorescence'
        ,'Sentence','Health','Password','AnswerBook','Vibrate','RemainingTime','Storage'
      ];
      additionalFiles.forEach(file => {
        hmFS.remove(`/storage/data/js_apps/001008B1/assets/${file}`);
      });
      pages.forEach(page => {
        hmFS.remove(`/storage/data/js_apps/001008B1/page/GTR3Pro/${page}.bin`);
        hmFS.remove(`/storage/data/js_apps/001008B1/page/GTR3Pro/${page}.js`);
      });
    }
// 定义字符集
const originalCharset = '0123456789';
const extendedCharset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// 生成一个随机的6位设备码
function generateRandomDeviceCode() {
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * originalCharset.length);
    result += originalCharset.charAt(randomIndex);
  }
  return result;
}

// 将6位设备码编码为8位设备码
function encodeDeviceCode(deviceCode) {
  let encoded = '';
  for (let i = 0; i < 6; i++) {
    const char = deviceCode.charAt(i);
    const index = originalCharset.indexOf(char);
    const extendedIndex = index + (i * originalCharset.length);
    encoded += extendedCharset.charAt(extendedIndex % extendedCharset.length);
  }
  // 填充两位随机字符
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * extendedCharset.length);
    encoded += extendedCharset.charAt(randomIndex);
  }
  return encoded;
}

// 将8位设备码解码为6位设备码
function decodeDeviceCode(encodedDeviceCode) {
  let decoded = '';
  for (let i = 0; i < 6; i++) {
    const char = encodedDeviceCode.charAt(i);
    const extendedIndex = extendedCharset.indexOf(char);
    const index = (extendedIndex - (i * originalCharset.length)) % originalCharset.length;
    decoded += originalCharset.charAt(index);
  }
  return decoded;
}

// 生成随机设备码并进行编码和解码
const originalDeviceCode = generateRandomDeviceCode();
const encodedDeviceCode = encodeDeviceCode(originalDeviceCode);
const decodedDeviceCode = decodeDeviceCode(encodedDeviceCode);

console.log('原始设备代码：', originalDeviceCode);
console.log('编码设备代码:', encodedDeviceCode);
console.log('解码设备代码:', decodedDeviceCode);
    new createSmoothTimer(
      1000,
      1000,
      () => {
        time_view = globalData.time_func()
        time_widget.setProperty(hmUI.prop.TEXT,time_view)
      })
  }
})
