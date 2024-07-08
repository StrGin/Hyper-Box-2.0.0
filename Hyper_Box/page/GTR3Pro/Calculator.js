import { createSmoothTimer } from "../smoothTimer"
import { Fx } from "../fx"
import { pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    let view_text = 0
    let super_now = false
    let button_array = []
    let isSysbol = false
    let button_number = [7,8,9,4,5,6,1,2,3]
    let symbol = {
       '÷': '/',
       '×': '*',
       '－': '-',
       '＋': '+',
       'π': 'Math.PI',
       'sin': 'Math.sin(',
       'log': 'Math.log(',
       '(': '(',
       ')': ')',
       '←': '←'
      }
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
    const view = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 14,
      y: 96,
      w: 175,
      h: 98,
      color: 0xFFFFFF,
      text_size: 22.67,
      align_v: hmUI.align.BOTTOM,
      align_h: hmUI.align.RIGHT,
      text_style: hmUI.text_style.WRAP,
      text: view_text
    })
    const super_view = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 14,
      y: 96,
      w: 175,
      h: 98,
      color: 0x727171,
      text_size: 16.67,
      align_v: hmUI.align.BOTTOM,
      align_h: hmUI.align.RIGHT,
      text_style: hmUI.text_style.WRAP,
      text: cal(view_text)
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 66,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26.67,
      text: '计算器'
    }).addEventListener(hmUI.event.CLICK_DOWN, function (info) {
        view_text = '0'
        view.setProperty(hmUI.prop.TEXT, view_text)
        super_view.setProperty(hmUI.prop.TEXT, view_text)
        animation(1)
    })
    super_view.setProperty(hmUI.prop.VISIBLE,super_now)
    for (let i = 1; i < 10; i++) {
      let x = 5 + (i-1) % 3 * 63;
      let y = 207 + Math.floor((i-1) / 3) * 63;
      button_array[i-1] = hmUI.createWidget(hmUI.widget.BUTTON, {
        x: x,
        y: y,
        w: 60,
        h: 60,
        normal_color: 0x222222,
        press_color: 0x101010,
        text_size: 26.67,
        color: 0xFFFFFF,
        text: button_number[i-1],
        radius: 18,
        click_func: () => {
          if (!isSysbol) {
            if (view_text == 0)  view_text = button_number[(i-1)].toString(); 
            else view_text += button_number[(i-1)].toString();
          } else {
            if (view_text == 0) view_text = symbol[Object.keys(symbol)[i-1]];
            else view_text += symbol[Object.keys(symbol)[i-1]];
          }
          view.setProperty(hmUI.prop.TEXT, view_text);
          super_view.setProperty(hmUI.prop.TEXT, cal(view_text));
          animation(0);
        }
      })
    }
    button_array[9] = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 30,
      y: 398,
      w: 60,
      h: 60,
      normal_color: 0x222222,
      press_color: 0x101010,
      text_size: 26.67,
      color: 0xFFFFFF,
      text: 0,
      radius: 18,
      click_func: () => {
        if (!isSysbol) view_text += '0';
        else {
            if (view_text.length > 1) {
              view_text = view_text.substr(0, view_text.length - 1)
              animation(0);
            } 
            else {
              view_text = "0"
              animation(1)
            }
        }
        view.setProperty(hmUI.prop.TEXT, view_text);
        super_view.setProperty(hmUI.prop.TEXT, cal(view_text));
      }
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 99,
      y: 398,
      w: 60,
      h: 60,
      normal_color: 0x406FE7,
      press_color: 0x0D4FF6,
      text_size: 39.67,
      color: 0xFFFFFF,
      text: '=',
      radius: 18,
      click_func: () => {
        animation(1)
      }
    })

    //---------------------------------函数部分-------------------------------------
    hmApp.registerGestureEvent(function (event) {
      if (event == hmApp.gesture.UP) {
        for (let i = 0; i < 9; i++) {
              button_array[i].setProperty(hmUI.prop.TEXT,Object.keys(symbol)[i])
              isSysbol = true
        }
      button_array[9].setProperty(hmUI.prop.TEXT,'←')
      }
      if (event == hmApp.gesture.DOWN) {
        for (let i = 1; i < 10; i++) {
              button_array[i-1].setProperty(hmUI.prop.TEXT,button_number[i-1].toString())
              isSysbol = false
        }
      button_array[9].setProperty(hmUI.prop.TEXT,'0')
      }
    })

    let fx = new Fx({
      begin: 66,
      end: 96,
      fps: 60,
      time: 0.1,
      style: Fx.Styles.EASE_IN_OUT_QUAD,
      onStop() {
        console.log("anim stop");
      },
        func: (result) => view.setProperty(hmUI.prop.Y,162-result)
  })
  let fx_ = new Fx({
    begin: 66,
    end: 96,
    fps: 60,
    time: 0.1,
    style: Fx.Styles.EASE_IN_OUT_QUAD,
    onStop() {
      console.log("anim stop");
    },
      func: (result) => view.setProperty(hmUI.prop.Y,result)
})
    function animation(param){
      if (param) {
        if(super_now == true) {
        fx_.restart()
        super_now = false
        view.setProperty(hmUI.prop.TEXT,cal(view_text))
      }
      super_view.setProperty(hmUI.prop.VISIBLE,super_now)
      }
      else {
        if(super_now == false) {
          fx.restart()
          super_now = true
      }
        super_view.setProperty(hmUI.prop.VISIBLE,super_now)
      }
    }
    function cal() {
      try {
        const calcFunc = new (() => {}).__proto__.constructor('return ' + view_text)()
        return String(calcFunc)
      } catch (e) {
        return "错误"
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