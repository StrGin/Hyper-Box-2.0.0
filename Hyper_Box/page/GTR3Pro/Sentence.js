import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    let sentence = JSON.parse(readFileSync('sentence.txt'))
    hmUI.setLayerScrolling(false)
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
      text: '每日一言'
    })
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 8,
        y: 126,
        w: 178,
        h: 142,
        radius: 20,
        color: 0x101010
      })
      const sentenceView = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 19,
        y: 139,
        w: 157,
        h: 106,
        color: 0xFFFFFF,
        text_size: 18.67,
        text_style: hmUI.text_style.WRAP,
        text: sentence[randomNum(0,sentence.length)]
      })
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 33,
        y: 304,
        w: 126,
        h: 65,
        text: '收藏',
        normal_color: 0x222222,
        press_color: 0x101010,
        color: 0xD8D8D8,
        radius: 35,
        text_size: 24.67,
        click_func: () => {
            hmUI.showToast({text: '暂未开放（发）'})
        }
      })
      hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 33,
        y: 378,
        w: 126,
        h: 65,
        text: '换一个',
        normal_color: 0x4E87FF,
        press_color: 0x0050F7,
        color: 0xFFFFFF,
        radius: 35,
        text_size: 24.67,
        click_func: () => {
          sentenceView.setProperty(hmUI.prop.TEXT, sentence[randomNum(0,sentence.length)])
        }
      })
    //---------------------------------函数部分-------------------------------------
    function randomNum(minNum,maxNum){ 
        switch(arguments.length){ 
            case 1: 
                return parseInt(Math.random()*minNum+1,10); 
            break; 
            case 2: 
                return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
                default: 
                    return 0; 
                break; 
        } 
    } 
    function statSyncAsset(filename) {
      const [fs_stat, err] = hmFS.stat_asset(filename);
      if (err == 0) {
          return fs_stat;
      } else {
          return null;
      }
  }                
  function stringToUTF8Array(str) {
    if (!str)
        return false;
    let result = [];
    for (let i = 0, j = str.length; i < j; i++) {
        let code = str.charCodeAt(i);
        if (code <= 0x7f) {
            result.push(code);
        } else if (code <= 0x7ff) {
            result.push((0xC0 | (0x1F & (code >> 6))));
            result.push((0x80 | (0x3F & code)));
        } else if (code <= 0xffff) {
            result.push((0xE0 | (0x0F & (code >> 12))));
            result.push((0x80 | (0x3F & (code >> 6))));
            result.push((0x80 | (0x3F & code)));
        } else {
            return false;
        }
    }
    return Uint8Array.from(result);
}
function utf8ArrayToString(array) {
    if (!array)
        return false;
    let result = "";
    for (let i = 0, j = array.length; i < j; i++) {
        let code = array[i];
        if (code >= 0 && code <= 0x7f) {
            code = (0x7f & code);
        } else if (code <= 0xdf) {
            code = ((0x1F & array[i]) << 6) | (0x3f & array[i + 1]);
            i += 1;
        } else if (code <= 0xef) {
            code = ((0x0f & array[i]) << 12) | ((0x3f & array[i + 1]) << 6) | (0x3f & array[i + 2]);
            i += 2;
        } else {
            return false;
        }
        let char = String.fromCharCode(code);
        result += char;
    }
    return result;
}
function readFileSync(filename) {
    const fs_stat = statSyncAsset(filename);
    if (!fs_stat) return 'notfile';
    var size2 = fs_stat.size;
    var e = '';
    var test_buf = new Uint8Array(size2);
    var file = hmFS.open_asset(filename, hmFS.O_RDONLY);
    hmFS.read(file, test_buf.buffer, 0, test_buf.length);
    hmFS.close(file);
    e = utf8ArrayToString(test_buf);
    return e;
}
    new createSmoothTimer(
      1000,
      1000,
      () => {
        time_view = globalData.time_func()
        time_widget.setProperty(hmUI.prop.TEXT,time_view)
      })
    }
  })
  }
})
