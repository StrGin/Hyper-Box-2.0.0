import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    hmUI.setLayerScrolling(false)
    let maxNum = 0
    let minNum = 0
    let currentSet = true 
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
      text: '随机数'
    })
    const currentView = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 38,
      y: 194,
      w: 141,
      h: 44,
      color: 0xBFC3C8,
      text_size: 16.67,
      text: '当前调整 最大值'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 116,
      w: 141,
      h: 44,
      color: 0xBFC3C8,
      text_size: 20,
      text: '最大值'
    }).addEventListener(hmUI.event.CLICK_DOWN, function(info) {
      currentView.setProperty(hmUI.prop.TEXT, '当前调整 最大值')
      currentSet = true
    })
    let maxView = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 106,
      y: 116,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20,
      text: maxNum
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 147,
      w: 141,
      h: 44,
      color: 0xBFC3C8,
      text_size: 20,
      text: '最小值'
    }).addEventListener(hmUI.event.CLICK_DOWN, function(info) {
      currentView.setProperty(hmUI.prop.TEXT, '当前调整 最小值')
      currentSet = false
    })
    let minView = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 106,
      y: 147,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20,
      text: minNum
    })

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 24,
      y: 224,
      w: 69,
      h: 44,
      normal_color: 0x222222,
      press_color: 0x101010,
      radius: 22,
      click_func: () => {
        if (currentSet) {
          maxNum --
          maxView.setProperty(hmUI.prop.TEXT, `${maxNum}`)
        }
        else {
          minNum --
          minView.setProperty(hmUI.prop.TEXT, `${minNum}`)
        }
      }
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 45,
      y: 242,
      src: 'reduce.png'
    }).addEventListener(hmUI.event.CLICK_UP, function (info) {
      if (currentSet) {
        maxNum --
        maxView.setProperty(hmUI.prop.TEXT, `${maxNum}`)
      }
      else {
        minNum --
        minView.setProperty(hmUI.prop.TEXT, `${minNum}`)
      }
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 103,
      y: 224,
      w: 69,
      h: 44,
      normal_color: 0x222222,
      press_color: 0x101010,
      radius: 22,
      click_func: () => {
        if (currentSet) {
          maxNum ++
          maxView.setProperty(hmUI.prop.TEXT, `${maxNum}`)
        }
        else {
          minNum ++
          minView.setProperty(hmUI.prop.TEXT, `${minNum}`)
        }
      }
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 125,
      y: 233,
      src: 'plus.png'
    }).addEventListener(hmUI.event.CLICK_UP, function (info) {
      if (currentSet) {
        maxNum ++
        maxView.setProperty(hmUI.prop.TEXT, `${maxNum}`)
      }
      else {
        minNum ++
        minView.setProperty(hmUI.prop.TEXT, `${minNum}`)
      }
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 33,
      y: 277,
      w: 126,
      h: 65,
      text: '重置',
      normal_color: 0x222222,
      press_color: 0x101010,
      color: 0xD8D8D8,
      radius: 35,
      text_size: 24.67,
      click_func: () => {
          maxNum = 0
          minNum = 0
          maxView.setProperty(hmUI.prop.TEXT, `${maxNum}`)
          minView.setProperty(hmUI.prop.TEXT, `${minNum}`)
      }
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 33,
      y: 351,
      w: 126,
      h: 65,
      text: '生成',
      normal_color: 0x4E87FF,
      press_color: 0x0050F7,
      color: 0xFFFFFF,
      radius: 35,
      text_size: 24.67,
      click_func: () => {
        hmUI.showToast({text: getRandomNumber(minNum, maxNum).toString()})
        console.log(getRandomNumber(minNum, maxNum));
      }
    })
    //---------------------------------函数部分-------------------------------------
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
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
