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
      x: 19,
      y: 66,
      w: 141,
      h: 44,
      color: 0x7FA3FF,
      text_size: 26.67,
      text: '性能测试'
    })
    hmUI.createWidget(hmUI.widget.TEXT,{
      x: 19,
      y: 165,
      w: 165,
      h: 210,
      color: 0x9E9E9E,
      text_style: hmUI.text_style.WRAP,
      text_size: 17,
      text:
` 本程序将会进行 简单循环测试、数学运算测试、对象访问测试等共十项测试，测试过程中有小概率导致手环受损，请你确认愿意承担风险后进行测试。
`
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 110,
      w: 160,
      h: 44,
      color: 0xFFFFFF,
      text_size: 18,
      text: '标准分数：34480'
    })
    const widget = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 19,
      y: 134,
      w: 160,
      h: 44,
      color: 0xFFFFFF,
      text_size: 18,
      text: '测试分数：待测试'
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 33,
      y: 377,
      w: 126,
      h: 65,
      text: '开始',
      normal_color: 0x4E87FF,
      press_color: 0x0050F7,
      color: 0xFFFFFF,
      radius: 35,
      text_size: 24.67,
      click_func: () => {
        widget.setProperty(hmUI.prop.TEXT, '测试分数：' + performanceTest())
      }
    })
    // 获取当前时间戳
function getTimestamp() {
  return new Date().getTime();
}

// 测试函数：循环和数学运算
function performanceTest() {
  const iterations = 1000; // 迭代次数
  let startTime, endTime, elapsedTime;
  let totalTime = 0;
  let testCount = 0;

  // 测试1：简单循环
  startTime = getTimestamp();
  for (let i = 0; i < iterations; i++) {
    // 空循环
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`Simple loop: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 测试2：数学运算
  startTime = getTimestamp();
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    sum += Math.sqrt(i);
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`Math operations: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 测试3：对象访问
  startTime = getTimestamp();
  let obj = {};
  for (let i = 0; i < iterations; i++) {
    obj[i] = i;
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`Object access: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 测试4：字符串操作
  startTime = getTimestamp();
  let str = '';
  for (let i = 0; i < iterations; i++) {
    str += 'a';
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`String operations: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 测试5：数组操作
  startTime = getTimestamp();
  let arr = [];
  for (let i = 0; i < iterations; i++) {
    arr.push(i);
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`Array operations: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 测试6：函数调用
  function dummyFunction() {
    // 空函数
  }
  startTime = getTimestamp();
  for (let i = 0; i < iterations; i++) {
    dummyFunction();
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`Function calls: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 测试7：复杂数学运算
  startTime = getTimestamp();
  let result = 0;
  for (let i = 0; i < iterations; i++) {
    result += Math.sin(i) * Math.cos(i) + Math.tan(i);
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`Complex math operations: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 测试8：复杂对象操作
  startTime = getTimestamp();
  let complexObj = {};
  for (let i = 0; i < iterations; i++) {
    complexObj[`key${i}`] = { value: i, nested: { deep: i * 2 } };
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`Complex object operations: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 测试9：复杂数组操作
  startTime = getTimestamp();
  let complexArr = [];
  for (let i = 0; i < iterations; i++) {
    complexArr.push({ id: i, data: new Array(10).fill(i) });
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`Complex array operations: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 测试10：递归函数调用
  function recursiveFunction(n) {
    if (n <= 0) return 1;
    return recursiveFunction(n - 1) + recursiveFunction(n - 2);
  }
  startTime = getTimestamp();
  for (let i = 0; i < 20; i++) {
    recursiveFunction(i);
  }
  endTime = getTimestamp();
  elapsedTime = endTime - startTime;
  console.log(`Recursive function calls: ${elapsedTime} ms`);
  totalTime += elapsedTime;
  testCount++;

  // 计算综合性能分数
  const averageTime = totalTime / testCount;
  const performanceScore = 1000 / averageTime; // 分数越高，性能越好
  return performanceScore.toFixed(2) * 1000
}

// 运行性能测试
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
