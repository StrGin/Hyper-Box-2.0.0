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
          let num = 0
      //---------------------------------控件部分-------------------------------------

      const img = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 192,
        h: 490,
        color: 0xFF0000
      });
          img.addEventListener(hmUI.event.CLICK_DOWN, function (a) {
                num++
                if ((num%2)===0&&(num%1)===0)img.setProperty(hmUI.prop.COLOR, 0xffffff)
                else img.setProperty(hmUI.prop.COLOR, 0xff0000)
          })
            const time_widget = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 66,
        y: 26,
        w: 62,
        h: 40,
        color: 0xFFFFFF,
        text_size: 22.67,
        text: time_view
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
