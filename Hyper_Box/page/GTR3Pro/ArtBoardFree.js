import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
    let group3State = false
    let group4State = false
    let color = [
      "0xFFFFFF", // 白色
      "0x000000", // 黑色
      "0xFF0000", // 红色
      "0x00FF00", // 绿色
      "0x0000FF", // 蓝色
      "0xFFFF00", // 黄色
      "0x00FFFF", // 青色
      "0xFF00FF", // 洋红色
      "0x808080", // 灰色
      "0xC0C0C0", // 银色
      "0x800000", // 栗色
      "0x808000", // 橄榄色
      "0x008000", // 深绿色
      "0x800080", // 紫色
      "0x000080", // 深蓝色
      "0xFFA500", // 橙色
      "0xFFC0CB", // 粉色
      "0x87CEEB"  // 天蓝色
  ]
    let pen_color = 0x000000;
    let pen_size = 5;
    hmUI.setLayerScrolling(false);
    let check = []
    //---------------------------------控件部分-------------------------------------
    let bg = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 192,
      h: hmSetting.getDeviceInfo().height,
      color: 0xffffff
    });
    const time_widget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 65,
      y: 0,
      w: 62,
      h: 40,
      color: 0x000000,
      text_size: 22.67,
      text: time_view
    })


    bg.addEventListener(hmUI.event.MOVE, (info) => {
      const { x, y } = info;
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: x,
          y: y,
          w: pen_size,
          h: pen_size,
          color: pen_color,
          radius: 255
        })
    })
    const group3 = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 0,
      y: 81,
      w: 192,
      h: 500
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
    const group4 = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 0,
      y: 81,
      w: 192,
      h: 500
    })
    group4.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 192,
      h: 69,
      radius: 15,
      color: 0x222222,
    })
    group4.createWidget(hmUI.widget.TEXT, {
      x: 67,
      y: 7,
      w: 63,
      h: 44,
      color: 0x9E9E9E,
      text_size: 14,
      text: '笔画粗细'
    })  
    const sizeView = group4.createWidget(hmUI.widget.TEXT, {
      x: 90,
      y: 26,
      w: 63,
      h: 44,
      color: 0xFFFFFF,
      text_size: 26.67,
      text: pen_size.toString()
    })  
    group4.createWidget(hmUI.widget.IMG, {
      x: 29,
      y: 45,
      src: 'reduce.png'
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
        pen_size--
        sizeView.setProperty(hmUI.prop.TEXT, pen_size.toString())
    })
    group4.createWidget(hmUI.widget.IMG, {
      x: 151,
      y: 34,
      src: 'plus.png'
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      pen_size++
        sizeView.setProperty(hmUI.prop.TEXT, pen_size.toString())
    })
    group4.setProperty(hmUI.prop.VISIBLE, false)
    const group = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 27,
      y: 33,
      w: 175,
      h: 96
    })
    group.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 48,
      h: 48,
      color: 0x222222,
      radius: 100
    })
    group.createWidget(hmUI.widget.IMG, {
      x: 7,
      y: 7,
      src: 'artboard.png'
    })
    group.addEventListener(hmUI.event.CLICK_DOWN, () => {
      if (group3State) {
        group3.setProperty(hmUI.prop.VISIBLE, false)
      }
      else {
        group3.setProperty(hmUI.prop.VISIBLE, true)
      }
      group3State = !group3State
    })
    const group2 = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 117,
      y: 33,
      w: 175,
      h: 96
    })
    group2.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 48,
      h: 48,
      color: 0x222222,
      radius: 100
    })
    group2.createWidget(hmUI.widget.IMG, {
      x: 9,
      y: 13,
      src: 'set.png'
    })      
    group2.addEventListener(hmUI.event.CLICK_DOWN, () => {
      if (group4State) {
        group4.setProperty(hmUI.prop.VISIBLE, false)
      }
      else {
        group4.setProperty(hmUI.prop.VISIBLE, true)
      }
      group4State = !group4State
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
  }
})
// ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
// █ ▄▄▄▄▄ █▄▀ ▀ ▄▀█▄  ▄ ▄█ ▀█▄█ █ ▄▄▄▄▄ █
// █ █   █ █   █▀▄   ▀▄█▄█▀▀▀   ▄█ █   █ █
// █ █▄▄▄█ █▄█▀ ▄█▄▄ █▄ ▀▄██▄██▄▄█ █▄▄▄█ █
// █▄▄▄▄▄▄▄█▄█ █ █▄█▄▀ █ █▄▀ █▄▀ █▄▄▄▄▄▄▄█
// █▄▄▄ ▀█▄█ █ ▄ ▄▄▀▀▄ ▀ ▄▄▀██ ▄▄▄█▀▄  ▀▄█
// █▄ ▄▄█▀▄▄▄▀█▄▄ ▄███ ▀▀▄▄▄ ▀██▄ ▀▄ █  ██
// ██▄ █▀ ▄█▀▀█▀ ▀▄ ▀▄█▀██▄▄▄  ▀▀  █   █ █
// █▀█▀ █▄▄█  ▄ █▄█▀ █▄ ▄▀██▀█ █▀▄▄ █ ██▀█
// █▄▀███▄▄▄▀█ █▄▄███▄ ▄     ▄█ █ ▀▄█▀▄█▀█
// █  ▀▄▀▀▄▄▀▄ ▀██▄ █ ▄█▀█ ▀▄█▄ ▄█ ▄█▀▄▄ █
// █ ▄  █▀▄▀▄▀▀███ ▄▀█▄█▀ ▀▀▄▀██ ██ ▄▀██▄█
// █   █▀▄▄ ██ ▀▀▀ █▀█▀▀ ▄▄▄▄ ▀▀██ ██ ▀███
// ██ ▄▀▄▀▄▄▄▀█ ██▄▀▀ ▀▀▄▀▄█ ▄▄▀█▄ ▀ █▄█ █
// █▀▄▀ ▄ ▄▄▄█▄█ █▀███    █▀▄▄▄▀▄█▄█▀█▄▄██
// █████▄█▄█▀▄ ▄▀▀█▀██ ▄▄  ▀█▄█▀ ▄▄▄ █▄  █
// █ ▄▄▄▄▄ ██▀▄▄ █▄ ▀▀ ██▄▄██▄▄▀ █▄█ ██  █
// █ █   █ █▀██▄  ██ ▀  ▀▄█▀▄▀▄▀▄  ▄ █▀  █
// █ █▄▄▄█ █  ▄▄▄▄██▀▄▄▀█▄▄▄▀ ▀▀█ ▄▄▄ ▀███
// █▄▄▄▄▄▄▄█▄███▄█▄██▄████▄▄▄▄▄██▄▄▄▄▄▄▄▄█