Page({
  build() {
    const time = hmSensor.createSensor(hmSensor.id.TIME)
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 50,
      y: 36,
      w: 62,
      h: 40,
      color: 0xefefef,
      text_size: 22.67,
      text: time.hour + ':' + time.minute
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 24,
      y: 66,
      w: 141,
      h: 44,
      color: 0xd8d8d8,
      text_size: 26.67,
      text: 'Hyper Box'
    })
const numberOfColumns = 2; // 按照你的需求设置列数
const numberOfRows = 11;
const buttonWidth = 74;
const buttonHeight = 74;
const spaceBetweenButtonsX = 87; // 按钮之间的X轴方向上的间距
const spaceBetweenRowsY = 87; // 行之间的Y轴方向上的间距

for (let row = 0; row < numberOfRows; row++) {
  for (let col = 0; col < numberOfColumns; col++) {
    let x = col * spaceBetweenButtonsX;
    let y = 112 + row * spaceBetweenRowsY;
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: x,
      y: y,
      w: buttonWidth,
      h: buttonHeight,
      radius: 18,
      color:  0x222222,
    });

    let imgSrc = `${row}_${col}.png`;; // 根据列和行生成不同的图片名称
    if (imgSrc == '6_0.png' || imgSrc == '10_0.png') {
      x=10
    }
    else if (imgSrc == '4_1.png') {
      x=96
    }
    else {
      x = col * spaceBetweenButtonsX;
    }
    hmUI.createWidget(hmUI.widget.IMG, {
      x: x + 16,
      y: y + 16,
      src: imgSrc // 使用动态生成的图片资源
    });
  }
}

  }
})