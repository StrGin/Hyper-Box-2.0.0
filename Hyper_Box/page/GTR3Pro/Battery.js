import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
      //---------------------------------变量部分-------------------------------------
      const globalData = getApp()._options.globalData
      let time_view = globalData.time_func()
      const battery = hmSensor.createSensor(hmSensor.id.BATTERY).current
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
          w: 288,
          h: 46,
          color: 0x7FA3FF,
          text_size: 26.67,
          text: "电池管家"
        })  
        hmUI.createWidget(hmUI.widget.ARC, {
          x: 29,
          y: 117,
          w: 135,
          h: 135,
          start_angle: -203,
          end_angle: 23,
          color: 0x222222,
          line_width: 12
        })
        hmUI.createWidget(hmUI.widget.ARC, {
          x: 29,
          y: 117,
          w: 135,
          h: 135,
          start_angle: -203,
          end_angle: battery * 2.26 - 203,
          color: 0x7FA3FF,
          line_width: 12
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 74,
          y: 156,
          w: 56,
          h: 44,
          color: 0xD0D0D0,
          text_size: 24.67,
          text: `${battery}%`
        })  
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 72,
          y: 188,
          w: 63,
          h: 44,
          color: 0x9E9E9E,
          text_size: 14.67,
          text: `${Math.round(battery * 1.8)}/180`
        })  
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 19,
          y: 235,
          src: 'sun.png'
        })
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 19,
          y: 286,
          src: 'moon.png'
        })
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 19,
          y: 330,
          src: 'suon.png'
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 72,
          y: 236,
          w: 73,
          h: 44,
          color: 0xFFFFFF,
          text_size: 22.67,
          text: calculateTime(battery, 30)
        })  
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 72,
          y: 283,
          w: 73,
          h: 44,
          color: 0xFFFFFF,
          text_size: 22.67,
          text: calculateTime(battery, 359)
        })  
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 72,
          y: 330,
          w: 73,
          h: 44,
          color: 0xFFFFFF,
          text_size: 22.67,
          text: calculateTime(battery, 280)
        })  
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 74,
          y: 427,
          src: 'tip.png'
        }).addEventListener(hmUI.event.CLICK_UP, function (a) {
          hmUI.showToast({text: '此功能暂时只对内测开放\n其实就是没做（'})
        })
      //---------------------------------函数部分-------------------------------------
      function calculateTime(p, multiplier) {
        let t = p / 100 * multiplier;
        if (t < 0.17) return '未知';
        if (t <= 1) {
            let seconds = Math.floor(t * 60);
            return `${seconds}秒`;
        }
        if (t <= 24) {
            let hours = Math.floor(t);
            if (hours < 1) {
                let minutes = Math.round(t * 60);
                return `${minutes}分钟`;
            }
            return `${hours}小时`;
        }
        let d = Math.floor(t / 24);
        if (d < 1) {
            let hours = Math.floor(t);
            return `${hours}小时`;
        }
        return `${d}天`;
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
