import { createSmoothTimer } from "../smoothTimer"
import { gotoPage } from "../gotoPage"
Page({
  onInit() {
              //---------------------------------变量部分-------------------------------------
              const globalData = getApp()._options.globalData
              let back = globalData.back
              //---------------------------------控件部分-------------------------------------
              if (back) hmApp.goBack()
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      src: 'backbround.png'
    }).addEventListener(hmUI.event.CLICK_UP, function (info) {
      hmApp.gotoPage({url:'page/GTR3Pro/index'})
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 2,
      y: 180,
      src: 'welcome.png'
    })
new createSmoothTimer(
  1000,
  1000,
  () => {
    gotoPage({url:'page/GTR3Pro/index'})
  })
  }
})