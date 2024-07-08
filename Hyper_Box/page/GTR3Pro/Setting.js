import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
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
      text: '设置'
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 12,
      y: 118,
      w: 168,
      h: 74,
      radius: 18,
      normal_color: 0x222222,
      press_color: 0x101010,
      click_func: () => {
        gotoPage({url:`page/GTR3Pro/Box_set`});
      }
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 135,
      w: 288,
      h: 46,
      color: 0xFFFFFF,
      text_size: 26.67,
      text: 'Box设置'
    }).addEventListener(hmUI.event.CLICK_UP, function (a) {
      gotoPage({url:`page/GTR3Pro/Box_set`});
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 164,
      y: 146,
      src: 'go.png'
    }).addEventListener(hmUI.event.CLICK_UP, function (a) {
      gotoPage({url:`page/GTR3Pro/Box_set`});
    })
    //---------------------------------函数部分-------------------------------------
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
