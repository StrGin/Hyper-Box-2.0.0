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
    let bird = globalData.bird
    let hardBird = globalData.hardBird
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
      text: '金手指'
    })
    const group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 9,
      y: 118,
      w: 175,
      h: 75
    })
    group.createWidget(hmUI.widget.STROKE_RECT, {
      x: 0,
      y: 0,
      w: 175,
      h: 75,
      radius: 20,
      line_width: 3,
      color: 0x7FA3FF
    })
    group.createWidget(hmUI.widget.TEXT, {
      x: 10,
      y: 7,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 16,
      text: '普通模式得分：'
    })
    group.createWidget(hmUI.widget.TEXT, {
      x: 10,
      y: 30,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26,
      text: bird
    })
    group.addEventListener(hmUI.event.CLICK_DOWN, function(info) {
      gotoPage({
        url: 'page/GTR3Pro/ScoreEditor',
        param: JSON.stringify({
          id: 'bird',
          type: 'BIRD_SCORE'
        })
      })
    })
    const group2 = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 9,
      y: 209,
      w: 175,
      h: 75
    })
    group2.createWidget(hmUI.widget.STROKE_RECT, {
      x: 0,
      y: 0,
      w: 175,
      h: 75,
      radius: 20,
      line_width: 3,
      color: 0x7FA3FF
    })
    group2.createWidget(hmUI.widget.TEXT, {
      x: 10,
      y: 7,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 16,
      text: '地狱模式得分：'
    })
    group2.createWidget(hmUI.widget.TEXT, {
      x: 10,
      y: 30,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26,
      text: hardBird
    })
    group2.addEventListener(hmUI.event.CLICK_DOWN, function(info) {
      gotoPage({
        url: 'page/GTR3Pro/ScoreEditor',
        param: JSON.stringify({
          id: 'hardBird',
          type: 'HARD_BIRD_SCORE'
        })
      })
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 30,
      y: 351,
      w: 126,
      h: 65,
      text: '保存',
      normal_color: 0x4E87FF,
      press_color: 0x0050F7,
      color: 0xFFFFFF,
      radius: 35,
      text_size: 24.67,
      click_func: () => {
        hmFS.SysProSetInt64("BIRD_SCORE", bird)
        hmFS.SysProSetInt64("HARD_BIRD_SCORE", hardBird)
        hmApp.goBack()
      }
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
