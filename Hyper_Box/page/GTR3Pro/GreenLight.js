import { createSmoothTimer , stopSmoothTimer} from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    hmUI.setLayerScrolling(false)
    let timer1
    const heart = hmSensor.createSensor(hmSensor.id.HEART)
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
      text: '绿光手电'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 110,
      w: 153,
      h: 160,
      color: 0x9E9E9E,
      text_size: 18,
      text_style: hmUI.text_style.WRAP,
      text: '此功能为乐子功能，依托手环传感器进行发光，但手环脱腕后无法进行调用传感器，即无法达到预期效果'
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 30,
      y: 277,
      w: 126,
      h: 65,
      text: '停止',
      color: 0xd8d8d8,
      normal_color: 0x222222,
      press_color: 0x101010,
      text_size: 24.67,
      radius: 32.5,
      click_func: () => {
        stopSmoothTimer(timer1)
      }
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 30,
      y: 351,
      w: 126,
      h: 65,
      text: '开始',
      normal_color: 0x4E87FF,
      press_color: 0x0050F7,
      color: 0xFFFFFF,
      radius: 35,
      text_size: 24.67,
      click_func: () => {
        timer1 = new createSmoothTimer(5000,5000,() => heart.addEventListener(heart.event.CURRENT, () => {}))
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
