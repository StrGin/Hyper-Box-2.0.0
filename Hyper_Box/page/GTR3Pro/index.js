import { createSmoothTimer } from "../smoothTimer"
Page({
  build() {
    const globalData = getApp()._options.globalData
    const time = hmSensor.createSensor(hmSensor.id.TIME)
    let time_view = time.hour + ':' + time.minute
    let list = ['Calculator']
    const time_widget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 66,
      y: 26,
      w: 62,
      h: 40,
      color: 0xefefef,
      text_size: 22.67,
      text: time_view
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 34,
      y: 56,
      w: 141,
      h: 44,
      color: 0xd8d8d8,
      text_size: 26.67,
      text: 'Hyper Box'
    })
    for (let i = 0; i < 22; i++) {
      let x = 15 + i % 2 * 87;
      let y = 106 + Math.floor(i / 2) * 87;
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: x,
        y: y,
        w: 74,
        h: 74,
        radius: 18,
        color: 0x222222
      })
      if (i == 9) x = 94
      else if (i == 0) x = - 4
      else if (i == 5) x = 92
      else if (i == 12 || i == 20) x = 10
      else x = i % 2 * 87
      hmUI.createWidget(hmUI.widget.IMG, {
        x: x + 32,
        y: y + 16,
        src: `${i}.png`
      }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        hmApp.gotoPage({url:`page/GTR3Pro/${list[i]}`})
      })
    }
    new createSmoothTimer(
      1000,
      1000,
      () => {
        globalData.time_func()
        time_widget.setProperty(hmUI.prop.TEXT,time_view)
      })
  }
})
