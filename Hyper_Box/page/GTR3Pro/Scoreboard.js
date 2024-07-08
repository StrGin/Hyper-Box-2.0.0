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
    let redNum = 0
    let blueNum = 0
    let zt = false
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
      text: '记分牌'
    })
    let view = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 47,
      y: 108,
      w: 141,
      h: 44,
      color: 0xDCDCDC,
      text_size: 26,
      text: '00:00:00'
    })
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 22,
      y: 157,
      w: 89,
      h: 87,
      radius: 20,
      color: 0xFF0000
    })
    let redView = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 52,
      y: 163,
      w: 141,
      h: 67,
      color: 0xFFFFFF,
      text_size: 46,
      text: redNum.toString()
    })
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 22,
      y: 259,
      w: 89,
      h: 87,
      radius: 20,
      color: 0x0073FF
    })
    let blueView = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 52,
      y: 265,
      w: 141,
      h: 67,
      color: 0xFFFFFF,
      text_size: 46,
      text: blueNum.toString()
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 133,
      y: 167,
      src: 'redtop.png'
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      redNum ++
      redView.setProperty(hmUI.prop.TEXT,redNum.toString())
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 133,
      y: 212,
      angle: 180,
      center_x: 20,
      center_y: 14,
      src: 'redtop.png'
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      redNum --
      redView.setProperty(hmUI.prop.TEXT,redNum.toString())
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 133,
      y: 268,
      src: 'bluetop.png'
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      blueNum ++
      blueView.setProperty(hmUI.prop.TEXT,blueNum.toString())
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 133,
      y: 313,
      angle: 180,
      center_x: 20,
      center_y: 14,
      src: 'bluetop.png'
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      blueNum --
      blueView.setProperty(hmUI.prop.TEXT,blueNum.toString())
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 33,
      y: 369,
      w: 126,
      h: 65,
      normal_color: 0x4E87FF,
      press_color: 0x0050F7,
      radius: 32.5,
      click_func: () => {
        zt = !zt
      }
    })
    const img = hmUI.createWidget(hmUI.widget.IMG,{
      x: 33,
      y: 369,
      w: 126,
      h: 65,
      pos_x: 48,
      pos_y: 18,
      src: zt ? 'start.png' : 'stop.png'
    })
    img.addEventListener(hmUI.event.CLICK_DOWN, () => {
      zt = !zt
      img.setProperty(hmUI.prop.SRC, zt ? 'start.png' : 'stop.png')
    })

    //---------------------------------函数部分-------------------------------------
// Initialize the time to 00:00:00
let hours = 0;
let minutes = 0;
let seconds = 0;

// Function to format the time as HH:MM:SS
function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to update the time
function updateTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
            if (hours === 24) {
                hours = 0;
            }
        }
    }
    return formatTime(hours, minutes, seconds);
}
    new createSmoothTimer(
      1000,
      1000,
      () => {
        time_view = globalData.time_func()
        time_widget.setProperty(hmUI.prop.TEXT,time_view)
        if(zt) {
          view.setProperty(hmUI.prop.TEXT,updateTime())
        }
      })
    }
  })
  }
})
