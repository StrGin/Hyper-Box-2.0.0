import { createSmoothTimer } from "../smoothTimer"
import { pageInit, gotoPage} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    hmUI.setLayerScrolling(false)
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    let fps = globalData.fps
    let brightness = hmSetting.getBrightness()
    let color = ['69FF84','FFFFFF','7700FF','FF0000','FFFB00','003BFF','FFFFFF','00FF04','FF8C00']
    let color_choose = []
    let check = []
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
      text: '荧光棒'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 110,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20.67,
      text: '帧率：' + fps
    }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        gotoPage({url: 'page/GTR3Pro/Fluorescence_set'})
    })


    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 145,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20.67,
      text: '亮度：' + brightness
    }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
      gotoPage({url: 'page/GTR3Pro/Fluorescence_set'})
  })

          //---------------------------------选色部分----------------------------
          for (let i = 0; i < color.length; i++) {
            let x = 13 + i % 3 * 57;
            let y = 188 + Math.floor(i / 3) * 60;
            let color_view = hmUI.createWidget(hmUI.widget.FILL_RECT, {
              x: x,
              y: y,
              w: 51,
              h: 51,
              radius: 100,
              color: `0x${color[i]}`
            })
            check[i] = hmUI.createWidget(hmUI.widget.IMG, {
              x: x-4,
              y: y-4,
              src: 'check.png'
            })
            check[i].setProperty(hmUI.prop.VISIBLE,false)
              check[i].addEventListener(hmUI.event.CLICK_UP, function (info) {
              check[i].setProperty(hmUI.prop.VISIBLE,false)
              color_choose = removeElementFromArray(color_choose,color[i])     
          })
            color_view.addEventListener(hmUI.event.CLICK_UP, function (info) {
                if (!containsElement(color_choose,color[i])) {
                  check[i].setProperty(hmUI.prop.VISIBLE,true)
                  color_choose.push(color[i])
                }
                else {
                  check[i].setProperty(hmUI.prop.VISIBLE,false)
                  color_choose = removeElementFromArray(color_choose,color[i])     
                }
          })
          }
          //---------------------------------生成按钮----------------------------
          hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 33,
            y: 372,
            w: 126,
            h: 65,
            text: '启动',
            normal_color: 0x4E87FF,
            press_color: 0x0050F7,
            color: 0xD8D8D8,
            radius: 35,
            text_size: 24.67,
            click_func: () => {
              hmApp.gotoPage({
                url: 'page/GTR3Pro/Fluorescence_view',
                param: JSON.stringify({
                  fps: fps,
                  color: color_choose
              })})
            }
          })
    //---------------------------------函数部分-------------------------------------
    function containsElement(array, elementToFind) {
      return array.includes(elementToFind)
    }
    function removeElementFromArray(array, elementToRemove) {
      return array.filter(item => item !== elementToRemove)
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