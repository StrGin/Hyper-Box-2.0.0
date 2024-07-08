import { createSmoothTimer ,stopSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
import { LocalStorage } from "../zeppOSApiBridge"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const localStorage = new LocalStorage()
    const globalData = getApp()._options.globalData
    hmUI.setLayerScrolling(false)
    let time_view = globalData.time_func()
    let loadVibrate = localStorage.getItem('loadVibrate', 5)
    let modelAdd = 0, intensityAdd = 0
    const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
    const VibrationPatterns = {
      23: { intensity: '轻微', duration: '1/20ms' },
      24: { intensity: '中等', duration: '1/20ms' },
      25: { intensity: '强烈', duration: '1/20ms' },
      27: { intensity: '强烈', duration: '1/1000ms' },
      28: { intensity: '强烈', duration: '1/600ms' },
      1: { intensity: '强烈', duration: '持续振动 (2)' },
      5: { intensity: '强烈', duration: '持续振动 (1)' },
      9: { intensity: '强烈', duration: '4/1200ms' }
    };    
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
      text: '振动器'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 123,
      w: 73,
      h: 26,
      color: 0x9E9E9E,
      text_size: 16.67,
      text: '当前模式'
    })
    const model = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 142,
      w: 155,
      h: 40,
      color: 0xFFFFFF,
      text_size: 26.67,
      text: VibrationPatterns[loadVibrate].duration
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 188,
      w: 73,
      h: 26,
      color: 0x9E9E9E,
      text_size: 16.67,
      text: '当前振幅'
    })
    let intensity = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 207,
      w: 155,
      h: 40,
      color: 0xFFFFFF,
      text_size: 26.67,
      text: VibrationPatterns[loadVibrate].intensity
    })
    model.addEventListener(hmUI.event.CLICK_UP, function (a) {
      modelAdd ++
      if (loadVibrate == 25 || loadVibrate == 27 || loadVibrate == 28 || loadVibrate == 1 || loadVibrate == 5 || loadVibrate == 9) {
        let num = findIndexByValue(loadVibrate)
          num ++ 
          if (num == 8) num = 0;
          loadVibrate = getValueByIndex(num)
          intensity.setProperty(hmUI.prop.TEXT, VibrationPatterns[loadVibrate].intensity)
          model.setProperty(hmUI.prop.TEXT, VibrationPatterns[loadVibrate].duration)
      }
      else {
        hmUI.showToast({
          text: '不可切换'
        })
      }
  })

    intensity.addEventListener(hmUI.event.CLICK_UP, function (a) {
      intensityAdd ++
        if (loadVibrate == 23 || loadVibrate == 24 || loadVibrate == 25) {
          let num = findIndexByValue(loadVibrate)
          num ++ 
          if (num == 8) num = 0;
          loadVibrate = getValueByIndex(num)
          intensity.setProperty(hmUI.prop.TEXT, VibrationPatterns[loadVibrate].intensity)
        }
        else {
          hmUI.showToast({
            text: '不可切换'
          })
        }
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
        vibrate.stop()
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
        vibrate.stop()
        vibrate.scene = loadVibrate
        vibrate.start()
      }
    })
    //---------------------------------函数部分-------------------------------------
    function getValueByIndex(index) {
      const values = [23, 24, 25, 27, 28, 1, 5, 9];
      if(index >= 0 && index < values.length) {
          return values[index];
      } else {
          return null;
      }
  }
    function findIndexByValue(input) {
      const values = [23, 24, 25, 27, 28, 1, 5, 9];
      for(let i = 0; i < values.length; i++) {
          if(values[i] === input) {
              return i;
          }
      }
      return -1;
  }
    new createSmoothTimer(
      1000,
      1000,
      () => {
        time_view = globalData.time_func()
        time_widget.setProperty(hmUI.prop.TEXT,time_view)
        localStorage.setItem('loadVibrate', loadVibrate)
      })
    }
  })
  },
  onDestroy() {
    localStorage.setItem('loadVibrate', loadVibrate)
    vibrate && vibrate.stop()
  }
})
