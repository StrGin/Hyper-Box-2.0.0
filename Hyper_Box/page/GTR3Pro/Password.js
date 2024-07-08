import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
              //---------------------------------变量部分-------------------------------------
      const globalData = getApp()._options.globalData
      let time_view = globalData.time_func()
      let length = 1
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
          text: "密码生成"
        })  
        const view = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 30,
          y: 122,
          w: 136,
          h: 86,
          color: 0xFFFFFF,
          text_size: 26.67,
          text_style: hmUI.text_style.WRAP,
          text: ''
        })  
        const length_view = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 70,
          y: 189,
          w: 68,
          h: 46,
          color: 0xB0B8C5,
          text_size: 16.67,
          text_style: hmUI.text_style.WRAP,
          text: `长度：${length}`
        })  
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 24,
          y: 221,
          w: 69,
          h: 44,
          normal_color: 0x222222,
          press_color: 0x101010,
          radius: 22,
          click_func: () => {
            length--
            length_view.setProperty(hmUI.prop.TEXT, `长度：${length}`)
          }
        })
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 45,
          y: 240,
          src: 'reduce.png'
        }).addEventListener(hmUI.event.CLICK_UP, function (info) {
          length--
          length_view.setProperty(hmUI.prop.TEXT, `长度：${length}`)
        })

        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 103,
          y: 221,
          w: 69,
          h: 44,
          normal_color: 0x222222,
          press_color: 0x101010,
          radius: 22,
          click_func: () => {
            length++
            length_view.setProperty(hmUI.prop.TEXT, `长度：${length}`)
          }
        })
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 125,
          y: 230,
          src: 'plus.png'
        }).addEventListener(hmUI.event.CLICK_UP, function (info) {
          length++
          length_view.setProperty(hmUI.prop.TEXT, `长度：${length}`)
        })
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 30,
          y: 277,
          w: 126,
          h: 65,
          text: '生成',
          color: 0xd8d8d8,
          normal_color: 0x222222,
          press_color: 0x101010,
          text_size: 24.67,
          radius: 32.5,
          click_func: () => {
            view.setProperty(hmUI.prop.TEXT,randomWord(length))
          }
        })
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 33,
          y: 351,
          w: 126,
          h: 65,
          text: '收藏',
          normal_color: 0x4E87FF,
          press_color: 0x0050F7,
          color: 0xFFFFFF,
          radius: 35,
          text_size: 24.67,
          click_func: () => {
            hmUI.showToast({text: '暂未开放（发）'})
          }
        })
      //---------------------------------函数部分-------------------------------------
        function randomWord (num) {
          let code = ''
          for (var i = 0; i < num; i++) {
            var type = getRandom(1, 3)
            switch (type) {
              case 1:
                code += String.fromCharCode(getRandom(48, 57))// 数字
                break
              case 2:
                code += String.fromCharCode(getRandom(65, 90))// 大写字母
                break
              case 3:
                code += String.fromCharCode(getRandom(97, 122))// 小写字母
                break
            }
          }
          return code
        }
        function getRandom(min, max) {
          return Math.round(Math.random() * (max - min) + min)
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
