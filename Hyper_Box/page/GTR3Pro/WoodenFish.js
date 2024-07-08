import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
import { LocalStorage } from "../zeppOSApiBridge"
import { Fx } from "../fx"
          //---------------------------------变量部分-------------------------------------
          const globalData = getApp()._options.globalData
          let time_view = globalData.time_func()
          hmUI.setLayerScrolling(false)
          const localStorage = new LocalStorage()
          let merit = localStorage.getItem('merit', 0)
Page({
  onInit() {
    pageInit({
      onStop() {
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
          text: "电子木鱼"
        })  
        const meritView = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 46,
          y: 114,
          w: 113,
          h: 1000,
          color: 0xFFFFFF,
          text_size: 22.67,
          text: `总功德 ${merit}`
        })  
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 23,
          y: 198,
          src: 'fish.png'
        })
        const stick = hmUI.createWidget(hmUI.widget.IMG, {
          x: 108,
          y: 175,
          center_x: 45,
          center_y: 53,
          w: 1009,
          h: 1000,
          src: 'stick.png'
        })
        const tip = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 34,
          y: 158,
          w: 113,
          h: 1000,
          color: 0xd0d0d0,
          text_size: 14.67,
          text: '功德+1'
        })  
        tip.setProperty(hmUI.prop.VISIBLE, false)
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 19,
          y: 298,
          w: 166,
          h: 52,
          radius: 15,
          normal_color: 0x222222,
          press_color: 0x101010,
          text: '开始超度',
          text_size: 20.67,
          click_func: () => {
            merit++
            meritView.setProperty(hmUI.prop.TEXT, `总功德 ${merit}`)
            tip.setProperty(hmUI.prop.VISIBLE, true)
            fx2.restart()
            fx.restart()
          }
        })
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 19,
          y: 355,
          w: 166,
          h: 52,
          radius: 15,
          normal_color: 0x222222,
          press_color: 0x101010,
          text: '佛祖代打',
          text_size: 20.67,
          click_func: () => {
            let meritTimer = new createSmoothTimer(
              1000,
              1000,
              () => {
                merit++
                meritView.setProperty(hmUI.prop.TEXT, `总功德 ${merit}`)
                tip.setProperty(hmUI.prop.VISIBLE, true)
                fx2.restart()
                fx.restart()
              })
          }
        })
      //---------------------------------函数部分-------------------------------------
      let fx = new Fx({
        begin: 0,
        end: -10,
        fps: 240,
        time: 0.5,
         style: Fx.Styles.EASE_IN_OUT_QUAD,
         onStop() {
           console.log("anim stop");
         },
          func: (result) => stick.setProperty(hmUI.prop.ANGLE,result)
    })
    let fx2 = new Fx({
      begin: 174,
      end: 158,
      fps: 240,
      time: 0.5,
       style: Fx.Styles.EASE_IN_OUT_QUAD,
       onStop() {
         console.log("anim stop");
       },
        func: (result) => tip.setProperty(hmUI.prop.Y,result)
  })
    new createSmoothTimer(
      1000,
      1000,
      () => {
        time_view = globalData.time_func()
        time_widget.setProperty(hmUI.prop.TEXT,time_view)
      })
    }
  })
  },
  onDestroy() {
    localStorage.setItem('merit', merit)
  }
})
