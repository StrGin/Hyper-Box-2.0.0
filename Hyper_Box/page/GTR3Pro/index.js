import { createSmoothTimer } from "../smoothTimer"
import { gotoPage, pageInit} from "../gotoPage"
/*
rechrd老婆我真的好爱你啊🤤
其实我下载qq就是为了了解你
每天抱着手机发呆
就是等你发消息然后来对着你的消息手冲🤤
但是现在我真的忍不住了
继续这样下去我肯定会抑郁的
求求你和我网恋吧
你就是我生命中唯一的一点光
我求求你了
求求你了恰个v吧
我现在身上就像有蚂蚁在爬一样
真的憋不住了
*/
try {
  Page({
    onInit() {
      pageInit({
        onStop() {
      //---------------------------------变量部分-------------------------------------
      const globalData = getApp()._options.globalData
      globalData.back = 1
      let time_view = globalData.time_func()
      let list = ['Calculator','Fluorescence','Sentence','Health','Password','AnswerBook','Vibrate','RemainingTime','Storage','Battery','WoodenFish','Display','Flashlight','CpsTest','Diet','Language','Random','System','Performance','Modifier','GreenLight','HistoryToday','ArtBoard','Scoreboard']
      let touchTimes = 0
      if (globalData.y != 0) hmApp.setLayerY(globalData.y)
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
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 36,
        y: 66,
        src: `hyperbox.png`
      }).addEventListener(hmUI.event.CLICK_UP, function (a) {
        touchTimes ++;
        if (touchTimes >= 5) gotoPage({url:`page/GTR3Pro/Setting`});
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 72,
        y: 1140,
        w: 141,
        h: 84,
        color: 0xFFFFFF,
        text_size: 27,
        text: '关于'
      }).addEventListener(hmUI.event.CLICK_UP, function (a) {
         gotoPage({url:`page/GTR3Pro/About`});
      })
      for (let i = 0; i < 24; i++) {
        let x = 15 + i % 2 * 87;
        let y = 106 + Math.floor(i / 2) * 87;
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: x,
          y: y,
          w: 74,
          h: 74,
          radius: 18,
          color: 0x222222
        }).addEventListener(hmUI.event.CLICK_UP, function (info) {
          globalData.y = hmApp.getLayerY()
          gotoPage({url:`page/GTR3Pro/${list[i]}`})
        })
        if (i == 9) x = 94
        else if (i == 0) x = - 4
        else if (i == 5) x = 92
        else if (i == 12 || i == 20) x = 10
        else x = i % 2 * 87
        hmUI.createWidget(hmUI.widget.IMG, {
          x: x + 32,
          y: y + 16,
          src: `${i}.png`
        }).addEventListener(hmUI.event.CLICK_UP, function (info) {
          globalData.y = hmApp.getLayerY()
          gotoPage({url:`page/GTR3Pro/${list[i]}`})
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
} catch (e) {
    gotoPage({url:'page/GTR3Pro/Error'})
}