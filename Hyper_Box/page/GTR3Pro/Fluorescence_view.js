import { createSmoothTimer } from "../smoothTimer"
Page({
  onInit(param) {
    //---------------------------------变量部分-------------------------------------
    let tem = 0
    const paramsObj = JSON.parse(param)
    const { fps,color } = paramsObj
    //---------------------------------控件部分-------------------------------------
    let fill = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 192,
      h: 490,
      color: '0x' + color[tem]
    })
    //---------------------------------函数部分-------------------------------------
    new createSmoothTimer(
      Math.round(1000 / fps),
      Math.round(1000 / fps),
      () => {
        if (tem < color.length) {
          tem++
          fill.setProperty(hmUI.prop.MORE, {
            x: 0,
            y: 0,
            w: 192,
            h: 490,
            color: '0x' + color[tem]
          })
      } else {
          tem = 0
          fill.setProperty(hmUI.prop.MORE, {
            x: 0,
            y: 0,
            w: 192,
            h: 490,
            color: '0x' + color[tem]
          })
      }          
      })
  }
})