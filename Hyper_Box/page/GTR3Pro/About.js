import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
Page({
  onInit() {
    pageInit({
      onStop() {
    //---------------------------------变量部分-------------------------------------
    const globalData = getApp()._options.globalData
    let time_view = globalData.time_func()
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
      x: 8,
      y: 66,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26.67,
      text: 'Hyper Box'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 104,
      w: 141,
      h: 44,
      color: 0x808080,
      text_size: 14,
      text: 'For'
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 37,
      y: 110,
      src: 'zeppos.png'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 123,
      w: 141,
      h: 44,
      color: 0x767895,
      text_size: 14,
      text: 'v2.0.2'
    })
    // hmUI.createWidget(hmUI.widget.IMG, {
    //   x: 52,
    //   y: 128,
    //   src: 'beta.png'
    // })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 164,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26,
      text: '开发人员'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 210,
      w: 141,
      h: 44,
      color: 0x808080,
      text_size: 16,
      text: '主开发&大体UI设计'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 228,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20,
      text: 'Struggle'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 264,
      w: 141,
      h: 44,
      color: 0x808080,
      text_size: 16,
      text: 'BUG修复&代码优化'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 283,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20,
      text: '淘汰郎'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 323,
      w: 141,
      h: 44,
      color: 0x808080,
      text_size: 16,
      text: '部分UI设计'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 341,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20,
      text: 'wuhaiqi'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 402,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26,
      text: '公测Q群'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 440,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20,
      text: '915358919'
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 11,
      y: 478,
      src: 'qrcode.png'
    })

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 695,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26,
      text: '特别鸣谢'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 749,
      w: 141,
      h: 44,
      color: 0x808080,
      text_size: 16,
      text: '旧版应用图标提供'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 773,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20,
      text: '敲木鱼的三文鱼'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 816,
      w: 141,
      h: 44,
      color: 0x808080,
      text_size: 16,
      text: '宣传'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 844,
      w: 141,
      h: 44,
      color: 0xFFFFFF,
      text_size: 20,
      text: '手写的从前'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 890,
      w: 141,
      h: 44,
      color: 0x808080,
      text_size: 16,
      text: '图标提供'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 8,
      y: 920,
      w: 192,
      h: 160,
      color: 0xFFFFFF,
      text_size: 20,
      text: `阿里巴巴矢量图标库
&& 
MasterGo图标库
&&
自主设计`
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 44,
      y: 1141,
      w: 183,
      h: 160,
      color: 0xFFFFFF,
      text_size: 26,
      text: `以及——`
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 1171,
      src: 'about.png'
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 75,
      y: 1243,
      w: 40,
      h: 50,
      color: 0xFFFFFF,
      text_size: 40,
      text: `你`
    })
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