/**
 * 解析歌词字符串
 * 得到一个歌词对象数组
 * @params {time} 开始时间
 * @params {words} 歌词内容
 * @returns
 */
function parseLrc(lrc) {
  var lines = lrc.split("\n");
  var result = [];
  for (var i = 0; i < lines.length; i++) {
    var str = lines[i];
    var parts = str.split("]");
    var timeStr = parts[0].substring(1);
    var obj = {
      time: parseTime(timeStr),
      words: parts[1],
    };
    result.push(obj);
  }
  return result;
}

/**
 * 将一个时间字符串解析成数字 (秒)
 * @params {timeStr} 时间字符串
 * @returns
 */
function parseTime(timeStr) {
  var parts = timeStr.split(":");
  return +parts[0] * 60 + +parts[1];
}

/**
 * 计算出，在当前播放器播放到第几秒抢矿下
 * lrcData 数组中，应该高亮显示的歌词下标
 * 如果没有任何一句歌词需要纤细，则得到 -1
 */
function findIndex() {
  // 播放器当前时间
  var curTime = doms.audio.currentTime;
  for (var i = 0; i < lrcData.length; i++) {
    if (curTime < lrcData[i].time) {
      return i - 1;
    }
  }
  // 找遍了都没找到 (说明播放器到了最后一句)
  return lrcData.length - 1;
}

/**
 * 创建歌词元素 li
 */
function createLrcElements() {
  var frag = document.createDocumentFragment();
  for (var i = 0; i < lrcData.length; i++) {
    var li = document.createElement("li");
    li.textContent = lrcData[i].words;
    frag.appendChild(li);
  }
  doms.ul.appendChild(frag);
}

// 获取需要的 dom
var doms = {
  audio: document.querySelector("audio"),
  ul: document.querySelector(".container ul"),
  container: document.querySelector(".container"),
};

// 歌词数据
var lrcData = parseLrc(lrc);

// 创建歌词元素 li
createLrcElements();

// 容器高度
var containerHeight = doms.container.clientHeight;
var liHeight = doms.ul.children[0].clientHeight;
// 最大偏移量
var maxOffset = doms.ul.clientHeight - containerHeight;

/**
 * 设置 ul 元素的偏移量
 */
function setOffset() {
  var index = findIndex();
  var offset = liHeight * index + liHeight / 2 - containerHeight / 2;
  if (offset < 0) {
    offset = 0;
  }
  if (offset > maxOffset) {
    offset = maxOffset;
  }
  doms.ul.style.transform = `translateY(-${offset}px)`;
  var li = doms.ul.querySelector(".active");
  if (li) {
    li.classList.remove("active");
  }
  li = doms.ul.children[index];
  if (li) {
    li.classList.add("active");
  }
  console.log(offset);
}

doms.audio.addEventListener("timeupdate", setOffset);
