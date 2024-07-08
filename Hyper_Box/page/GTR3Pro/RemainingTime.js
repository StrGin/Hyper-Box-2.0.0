import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit } from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
        //---------------------------------变量部分-------------------------------------
        const globalData = getApp()._options.globalData
        let time_view = globalData.time_func()
        let timeRemain = JSON.parse(readFileSync('time.txt'))
        let widgetList = []
        console.log(timeRemain)
        const now = new Date()
        const time = {
          second: now.getSeconds(),
          minute: now.getMinutes(),
          hour: now.getHours(),
          day: now.getDate(),
          week: hmSensor.createSensor(hmSensor.id.TIME).week,
          month: now.getMonth() + 1,
          year: now.getFullYear()
        }
        const residueSecond = 60 - time.second
        const residueMinute = 60 - time.minute
        const residueHour = 24 - time.hour
        const residueWeek = 7 - time.week
        const residueMonth = 12 - time.month
        let age = 30
        const thisLife = 80 - age
        let daysInMonth = 31
        if (time.month === 2 && leapYear(time.year)) {
          daysInMonth = 29
        } else if (time.month === 2) {
          daysInMonth = 28
        } else if ([4, 6, 9, 11].includes(time.month)) {
          daysInMonth = 30
        }
        let yOffset = 129
        let yOffset_ = 402
        let list = [
          {
            title: "此分还剩",
            value: residueSecond + '秒'
          },
          {
            title: "此时还剩",
            value: residueMinute + '分'
          },
          {
            title: "此周还剩",
            value: residueWeek + '天'
          },
          {
            title: "此月还剩",
            value: daysInMonth - time.day + '天'
          },
          {
            title: "今日还剩",
            value: residueHour + '时'
          },
          {
            title: "今年还剩",
            value:residueMonth + '月'
          },

          {
            title: "今生还剩",
            value: thisLife + '年'
          }]
          console.log(typeof timeRemain)
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
          w: 288,
          h: 46,
          color: 0x7FA3FF,
          text_size: 26.67,
          text: "剩余时间"
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 19,
          y: 106,
          w: 288,
          h: 46,
          color: 0x9E9E9E,
          text_size: 16.67,
          text: "常规时间"
        })
        for (let i = 0; i < 7; i++) {
            hmUI.createWidget(hmUI.widget.TEXT, {
                x: 19,
                y: yOffset,
                w: 83,
                h: 30,
                color: 0xFFFFFF,
                text_size: 20.67,
                text: list[i].title
            })
            widgetList[i] = hmUI.createWidget(hmUI.widget.TEXT, {
                x: 131,
                y: yOffset,
                w: 50,
                h: 31,
                color: 0xFFFFFF,
                align_h: hmUI.align.RIGHT,
                text_size: 20.67,
                text: list[i].value
            })
            yOffset += 35
        }
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 19,
          y: 373,
          w: 288,
          h: 46,
          color: 0x9E9E9E,
          text_size: 16.67,
          text: "自定义时间"
        })
        for (let i = 0; i < timeRemain.length; i++) {
            hmUI.createWidget(hmUI.widget.TEXT, {
                x: 19,
                y: yOffset_,
                w: 103,
                h: 30,
                color: 0xFFFFFF,
                text_size: 20.67,
                text: timeRemain[i].thing
            })
            hmUI.createWidget(hmUI.widget.TEXT, {
                x: 131,
                y: yOffset_,
                w: 55,
                h: 81,
                color: 0xFFFFFF,
                align_h: hmUI.align.RIGHT,
                text_size: 20.67,
                text: daysUntil(timeRemain[i].time) + '天'
            })
            yOffset_ += 35
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
        function leapYear(year) {
          return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
        }
        function daysUntil(dateString) {
          const today = new Date()
          const currentYear = today.getFullYear()
          const currentMonth = today.getMonth()
          const currentDate = today.getDate()
          const parts = dateString.split('/')
          const year = parseInt(parts[0], 10)
          const month = parseInt(parts[1], 10) - 1
          const day = parseInt(parts[2], 10)
          let targetDate
          if (year === 0 && month === -1) {
            targetDate = new Date(currentYear, currentMonth, day)
            if (targetDate <= today) {
              targetDate.setMonth(currentMonth + 1)
            }
          } else if (year === 0 && month >= 0) {
            targetDate = new Date(currentYear, month, day)
            if (targetDate < today || (targetDate.getDate() === currentDate && targetDate.getMonth() === currentMonth)) {
              targetDate.setFullYear(currentYear + 1)
            }
          } else {
            targetDate = new Date(year, month, day)
          }
          const diffTime = targetDate - today
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          return diffDays
        }
        new createSmoothTimer(
          1000,
          1000,
          () => {
            time_view = globalData.time_func()
            time_widget.setProperty(hmUI.prop.TEXT, time_view)
            widgetList[0].setProperty(hmUI.prop.TEXT, residueSecond + '秒')
          })
      }
    })
  }
})