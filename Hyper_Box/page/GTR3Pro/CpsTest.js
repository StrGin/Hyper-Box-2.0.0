import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
      //---------------------------------变量部分-------------------------------------
      const globalData = getApp()._options.globalData
      let time_view = globalData.time_func()
      let buttonText = '开始'
      let ti = 0
      let remainingTime = 10
      let status = false
      let remainingTimeTwo = 5
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
          text: "手速测试"
        })  
        let currentTime = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 19,
          y: 110,
          w: 73,
          h: 26,
          color: 0x9e9e9e,
          text_size: 16.67,
          text: "剩余秒数"
        })  
        let timeView = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 19,
          y: 129,
          w: 155,
          h: 40,
          color: 0xFFFFFF,
          text_size: 26.67,
          text: remainingTime
        })  
        let currentCps = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 107,
          y: 110,
          w: 73,
          h: 26,
          color: 0x9e9e9e,
          text_size: 16.67,
          text: "当前CPS"
        })  
        let cpsView = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 107,
          y: 129,
          w: 155,
          h: 40,
          color: 0xFFFFFF,
          text_size: 26.67,
          text: "0"
        })  
        const button = hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 16,
          y: 179,
          w: 162,
          h: 235,
          radius: 15,
          normal_color: 0x222222,
          press_color: 0x101010,
          text: buttonText,
          color: 0xFFFFFF,
          text_size: 25,
          text_style: hmUI.text_style.WRAP,
          click_func: (button) => {
            if (buttonText == '开始'/*  || buttonText == 'Restart' */) {
              ti = 0
              button.setProperty(hmUI.prop.TEXT, '快点') 
              status = true
              buttonText = '快点'
              currentCps.setProperty(hmUI.prop.TEXT, '当前CPS')
              currentTime.setProperty(hmUI.prop.TEXT, '剩余秒数')
              timeView.setProperty(hmUI.prop.TEXT, remainingTime)
            }
            else if (status == true && remainingTime > 0) { 
              console.log(ti);
              ti ++
              cpsView.setProperty(hmUI.prop.TEXT, ti.toString())
          }
          else { 
            hmUI.showToast('已结束')
            status = false
            remainingTime = 10
            button.setProperty(hmUI.prop.TEXT, `${remainingTimeTwo}s后单击
再试一次`)
            buttonText = '5s后单击再试一次'
            currentCps.setProperty(hmUI.prop.TEXT, 'CPS')
            currentTime.setProperty(hmUI.prop.TEXT, '评价')
            timeView.setProperty(hmUI.prop.TEXT, cpsAnimal(ti / 10))
          }
        }
        })
      //---------------------------------函数部分-------------------------------------
      function cpsAnimal(value) {
        if (value < 6) return "树懒"
        else if (value < 6.5) return "海龟"
        else if (value < 7) return "袋熊"
        else if (value < 7.5) return "马"
        else if (value < 8) return "长耳野兔"
        else if (value < 8.5) return "狮子"
        else if (value < 9) return "跳羚"
        else if (value < 9.5) return "猎豹"
        else if (value < 10) return "黑枪鱼"
        else if (value < 10.5) return "秃鹫"
        else if (value < 11) return "金雕"
        return "游隼"
    }
    new createSmoothTimer(
      1000,
      1000,
      () => {
        time_view = globalData.time_func()
        time_widget.setProperty(hmUI.prop.TEXT,time_view)
        if (status == true && remainingTime > 0){
          remainingTime --
          timeView.setProperty(hmUI.prop.TEXT, remainingTime.toString())
        }
        if (buttonText == '5s后单击再试一次') {
          remainingTimeTwo --
          button.setProperty(hmUI.prop.TEXT, `${remainingTimeTwo}s后单击
再试一次`)
          if (remainingTimeTwo == 0) {
            remainingTimeTwo = 5
            buttonText = '开始'
            button.setProperty(hmUI.prop.TEXT, '开始')
          }
        }
      })
    }
  })
  }
})
