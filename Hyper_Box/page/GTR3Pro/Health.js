import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    hmUI.setLayerScrolling(false)
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    let distance = hmSensor.createSensor(hmSensor.id.DISTANCE)
		let step = hmSensor.createSensor(hmSensor.id.STEP)
    let calorie = hmSensor.createSensor(hmSensor.id.CALORIE)
    let fatburn = Math.round(calorie.current / 9)
    let stand = hmSensor.createSensor(hmSensor.id.STAND)
    let weight = hmSetting.getUserData().weight
    let height = hmSetting.getUserData().height
    let bmi = weight / (height * height)
    let titleList = ['卡路里','步数','里程','燃脂','站立','体重','身高','BMI','BMI评价','综合评价']
    let contentList = [calorie.current + 'KJ',step.current + '步',distance.current/1000 + 'km',fatburn + 'g',stand.current,returnFloat(weight) + 'kg',returnFloat(height),bmi,getBMIStatus(bmi),calculateHealthStatus(calorie.current)]
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
      text: '身体健康'
  })
  hmUI.createWidget(hmUI.widget.IMG, {
    x: 72,
    y: 415,
    src: 'chatgpt.png'
  }).addEventListener(hmUI.event.CLICK_UP, function (a) {
    hmFS.SysProSetChars('hyper_health', `卡路里${calorie.current}KJ 步数${step.current}步 里程${distance.current/1000}km 燃脂${fatburn}g 站立${stand.current}次 体重${weight}kg 身高${height} bmi${bmi}`)
    hmApp.startApp({appid: 114567, url: 'pages/index'})
  })
    //---------------------------------函数部分-------------------------------------
    function returnFloat(value) {
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
          value = value.toString() + ".00";
          return value;
      }
      if (xsd.length > 1) {
          if (xsd[1].length < 2) {
              value = value.toString() + "0";
          } else {
              value = value.toString().substr(0, value.toString().indexOf(".") + 3);
          }
          return value;
      }
  }
    function generateWidgets() {
      const leftX = 19
      const rightX = 110
      let baseY = 110
      const incrementY = 59
      for (let i = 0; i < 5; i++) {
        createWidgetGroup(leftX, baseY, titleList[i], contentList[i])
        baseY += incrementY
      }
      baseY = 110;
      for (let i = 5; i < 10; i++) {
          createWidgetGroup(rightX, baseY, titleList[i], contentList[i])
          baseY += incrementY
      }
  }
  
  function createWidgetGroup(x, y, title, content) {
      hmUI.createWidget(hmUI.widget.TEXT, {
          x: x,
          y: y,
          w: 74,
          h: 32,
          color: 0x9E9E9E,
          text_size: 18.67,
          text: title
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
          x: x,
          y: y + 25,
          w: 150,
          h: 32,
          color: 0xFFFFFF,
          text_size: 22.67,
          text: content
      })
  }
  generateWidgets()
    function calculateHealthStatus(caloriesBurnedPerDay) {
      if (caloriesBurnedPerDay < 700) {
          return "劣"
      }
      else {
          return '优'
      }
  }
  
  function getBMIStatus(bmi) {
      if (bmi < 18.5) {
          return '过低'
      } else if (bmi >= 18.5 && bmi <= 24.9) {
          return '正常'
      } else if (bmi >= 25 && bmi <= 29.9) {
          return '超重'
      } else {
          return '肥胖'
      }
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
