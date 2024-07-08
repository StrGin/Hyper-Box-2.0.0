import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
import { LocalStorage } from "../zeppOSApiBridge"
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    let group3State = false
    let color = [
      0xFFFFFF, // 白色
      0x000000, // 黑色
      0xFF0000, // 红色
      0x00FF00, // 绿色
      0x0000FF, // 蓝色
      0xFFFF00, // 黄色
      0x00FFFF, // 青色
      0xFF00FF, // 洋红色
      0x808080, // 灰色
      0xC0C0C0, // 银色
      0x800000, // 栗色
      0x808000, // 橄榄色
      0x008000, // 深绿色
      0x800080, // 紫色
      0x000080, // 深蓝色
      0xFFA500, // 橙色
      0xFFC0CB, // 粉色
      0x87CEEB  // 天蓝色
  ]
    let pen_color = 0x000000;
    hmUI.setLayerScrolling(false);
    let check = []
    console.log();
    let button_x = []
    let button_y = []
    const localStorage = new LocalStorage()
    let button_i = localStorage.getItem('button_i', [])
    let button_ii = localStorage.getItem('button_ii', [])
    let button_iii = localStorage.getItem('button_iii', [])
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
        var colors = ["0xFFFFFF", "0xD8D8D8"];
        var x = 0;
        var y = 0;
        for (let i = 0; i < 32; i++) {
          let color = colors[(i % 8 < 4) ? (i % 2) : (1 - i % 2)];
          button_x[i] = x
          button_y[i] = y + 96
          button_i[i] = hmUI.createWidget(hmUI.widget.BUTTON, {
            x: x,
            y: y + 96,
            w: 48,
            h: 48,
            normal_color: color,
            press_color: color,
            click_func: (button_widget) => {
              button_widget.setProperty(hmUI.prop.MORE, {
                x: button_x[i],
                y: button_y[i],
                w: 48,
                h: 48,
                normal_color: pen_color,
                press_color: pen_color,
              })
              button_ii[i] = pen_color
              button_iii[i] = i
            }
          })
          x += 48;
          if ((i + 1) % 4 === 0) {
            x = 0;
            y += 48;
          }
        }
        for (let i = 0; i < button_i.length; i++) {
          button_i[i].setProperty(hmUI.prop.MORE, {
            x: button_x[button_iii[i]],
            y: button_y[button_iii[i]],
            w: 48,
            h: 48,
            normal_color: button_ii[i],
            press_color: button_ii[i],
          })
    }

    const group3 = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 0,
      y: 81,
      w: 192,
      h: 20
    })
    group3.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 192,
      h: 399,
      radius: 15,
      color: 0x222222,
    })
    group3.setProperty(hmUI.prop.VISIBLE, false)
    const group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 13,
      y: 56,
      w: 175,
      h: 96
    })
    group.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'artboard.png'
    })
    group.addEventListener(hmUI.event.CLICK_DOWN, () => {
      if (group3State) group3.setProperty(hmUI.prop.VISIBLE, false)
      else group3.setProperty(hmUI.prop.VISIBLE, true);
      group3State = !group3State
    })

    for (let i = 0; i < color.length; i++) {
      let x = 13 + i % 3 * 57;
      let y = 20 + Math.floor(i / 3) * 60;
      let color_view = group3.createWidget(hmUI.widget.FILL_RECT, {
        x: x,
        y: y,
        w: 51,
        h: 51,
        radius: 100,
        color: color[i]
      })
      check[i] = group3.createWidget(hmUI.widget.IMG, {
        x: x-4,
        y: y-4,
        src: 'check.png'
      })
      check[i].setProperty(hmUI.prop.VISIBLE,false)
        check[i].addEventListener(hmUI.event.CLICK_UP, function (info) {
        check[i].setProperty(hmUI.prop.VISIBLE,false)
    })
      color_view.addEventListener(hmUI.event.CLICK_UP, function (info) {
            check[i].setProperty(hmUI.prop.VISIBLE,true)
            group3.setProperty(hmUI.prop.VISIBLE,false)
            pen_color = color[i]
    })
    }

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
  },
  onDestroy() {
    localStorage.setItem('button_i', button_i)
    localStorage.setItem('button_ii', button_ii)
    localStorage.setItem('button_iii', button_iii)
  }
})
