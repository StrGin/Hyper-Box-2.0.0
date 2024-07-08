import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
import { Fx } from "../fx"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    let eat = JSON.parse(readFileSync('eat.txt'))
    let drink = JSON.parse(readFileSync('drink.txt'))
    hmUI.setLayerScrolling(false)
    const time = hmSensor.createSensor(hmSensor.id.TIME)
    let dietTime = getMealTime(time)
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
      text: dietTime
    })
    const group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 10,
      y: 126,
      w: 175,
      h: 96
    })
    group.createWidget(hmUI.widget.TEXT, {
      x: 17,
      y: 13.71,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 18,
      text: '食物'
    })
    const eatView = group.createWidget(hmUI.widget.TEXT, {
      x: 17,
      y: 43.43,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 22,
      text: '单击以抽取'
    })
    group.createWidget(hmUI.widget.STROKE_RECT, {
      x: 0,
      y: 0,
      w: 175,
      h: 96,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    group.addEventListener(hmUI.event.CLICK_UP, function (a) {
      fx.restart()
    })
    const group2 = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 10,
      y: 240,
      w: 175,
      h: 96
    })
    group2.createWidget(hmUI.widget.TEXT, {
      x: 17,
      y: 13.71,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 18,
      text: '饮品'
    })
    const drinkView = group2.createWidget(hmUI.widget.TEXT, {
      x: 17,
      y: 43.43,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 22,
      text: '单击以抽取'
    })
    group2.createWidget(hmUI.widget.STROKE_RECT, {
      x: 0,
      y: 0,
      w: 175,
      h: 96,
      radius: 20,
      line_width: 5,
      color: 0x7FA3FF
    })
    group2.addEventListener(hmUI.event.CLICK_UP, function (a) {
      fx2.restart()
    })
    //---------------------------------函数部分-------------------------------------
    let fx = new Fx({
      begin: 0,
      end: 2,
      fps: 10,
      time: 2,
       style: Fx.Styles.EASE_OUT_CIRC,
       onStop() {
         console.log("anim stop");
       },
        func: (result) => eatView.setProperty(hmUI.prop.TEXT, eat[getRandomNumber(0, eat.length)])
  })
  let fx2 = new Fx({
    begin: 0,
    end: 2,
    fps: 10,
    time: 2,
     style: Fx.Styles.EASE_OUT_CIRC,
     onStop() {
       console.log("anim stop");
     },
      func: (result) => drinkView.setProperty(hmUI.prop.TEXT, drink[getRandomNumber(0, drink.length)])
})
    function getMealTime(time) {
      const hour = time.hour;
    
      if (hour >= 6 && hour < 10) {
        return "早餐饮食";
      } else if (hour >= 11 && hour < 14) {
        return "午餐饮食";
      } else if (hour >= 17 && hour < 20) {
        return "晚餐饮食";
      } else if ((hour >= 22 && hour < 24) || (hour >= 0 && hour < 2)) {
        return "夜宵饮食";
      } else {
        return "非用餐时间";
      }
    }
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
    function statSyncAsset(filename) {
      const [fs_stat, err] = hmFS.stat_asset(filename);
      if (err == 0) {
          return fs_stat;
      } else {
          return null;
      }
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
