import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    let historicalEvents = JSON.parse(readFileSync('history.txt'))
    const time = hmSensor.createSensor(hmSensor.id.TIME)
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
      w: 166,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26.67,
      text: '历史上的今天'
    })
    const date = `${time.month}月${time.day}日`;

    function getDayOfYear(date) {
        const monthDays = {
            "1月": 31, "2月": 28, "3月": 31, "4月": 30, "5月": 31, "6月": 30,
            "7月": 31, "8月": 31, "9月": 30, "10月": 31, "11月": 30, "12月": 31
        };
    
        const dateArr = date.split("月");
        const month = parseInt(dateArr[0]);
        const day = parseInt(dateArr[1].replace("日", ""));
    
        let dayOfYear = 0;
        for (let i = 1; i < month; i++) {
            dayOfYear += monthDays[i + "月"];
        }
        dayOfYear += day;
    
        return dayOfYear;
    }
    
    const events = historicalEvents[getDayOfYear(date)-1] || [[9191,'7月1日-12月31日没做捏']];
          


for (let i = 0; i < events.length; i++) {
  hmUI.createWidget(hmUI.widget.STROKE_RECT, {
    x: 9,
    y: 115 + i * 140, // Adjust the y position based on index
    w: 175,
    h: 125,
    radius: 20,
    color: 0x7FA3FF,
    line_width: 5,
  })
hmUI.createWidget(hmUI.widget.TEXT, {
x: 27,
y: 149 + i * 140,
w: 139,
h: 87,
color: 0xFFFFFF,
text_size: 17,
text_style: hmUI.text_style.WRAP,
text: events[i][1]
});

hmUI.createWidget(hmUI.widget.TEXT, {
x: 27,
y: 128 + i * 140,
w: 162,
h: 90,
color: 0xDDDDDD,
text_size: 16,
text_style: hmUI.text_style.WRAP,
text: events[i][0] + '年' // Display the year of the historical event
});
}
    //---------------------------------函数部分-------------------------------------
    
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
