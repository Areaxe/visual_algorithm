let Sort = function (canvas, {interval, pipeNum}) {
  this.pipeList = [];
  this.timer = null;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.interval = interval || 150;
  this.isSorting = false;
  this.pipeNum = pipeNum || 30;
  this.initData(this.pipeNum);
  this.render();
}

Sort.prototype.initData = function (pipeNum) {
  let colors = ['lightblue', 'pink', 'lightcoral', 'lightseagreen', 'lightsteelblue'];
  for (let i = 0; i < pipeNum; i++) {
    let height = parseInt(Math.random() * 250 + 50);
    let y = 500 - height;
    let color = colors[parseInt(Math.random() * (colors.length))];
    let pipe = new Pipe(this.ctx, {
      height,
      x: i*35,
      color,
      y
    });
    this.pipeList.push(pipe);
  }
}

Sort.prototype.changeInterval = function (interval) {
  if(this.isSorting){
    clearInterval(this.timer);
    this.interval = interval;
    this.isSorting = false;
    this.sort();
  }else{
    this.interval = interval;
  }
}

Sort.prototype.resetPipe = function () {
  if (this.isSorting) {
    alert("排序正在进行中，请稍后再试");
    return;
  }
  this.pipeList = [];
  this.initData(this.pipeNum);
  this.render();
}

Sort.prototype.run = function (type) {
  if (this.isSorting) {
    alert("排序正在进行中，请稍后再试");
    return;
  }
  this.type = type;
  clearInterval(this.timer);
  switch (type) {
    case 'bubbing':
      this.initIndex(0,0)
      this.sort = this.bubbing;
      break;
    case 'insert':
      initIndex(1,1);
      this.sort = this.insert;
      break;
    default:
      initIndex(1,1);
      this.sort = this.insert;
  }
  this.sort();
}

Sort.prototype.render = function () {
  let {ctx, canvas, pipeList, pointIndex} = this;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pipeList.forEach((item, index) => {
    item.x = index * 35;
    if (index === pointIndex) {
      item.focus();
    } else {
      item.unfocus();
    }
    item.render();
  });
}

Sort.prototype.initIndex = function(pointIndex,currentIndex){
  this.pointIndex = pointIndex;
  this.currentIndex = currentIndex;
}

Sort.prototype.insert = function () {
  if (!this.isSorting) {
    this.isSorting = true;
    this.timer = setInterval(() => {
      let {pointIndex, pipeList, currentIndex} = this;
      let pointPipe = pipeList[pointIndex]; // 当前指针指向的柱子
      let pointPrevPipe = pipeList[pointIndex - 1]; // 当前指针指向的柱子的前一根

      if (pointIndex >= 1 && pointPipe.height < pointPrevPipe.height) {
        pointPipe.moveout();
        let temp = pipeList[pointIndex];
        pipeList[pointIndex] = pipeList[pointIndex - 1];
        pipeList[pointIndex - 1] = temp;
        this.pointIndex--;
      } else {
        pointPipe.movein();
        this.currentIndex++;
        this.pointIndex = currentIndex; //
        if (this.currentIndex > pipeList.length) {
          this.isSorting = false;
          clearInterval(this.timer);
        }
      }
      this.render();
    }, this.interval);
  }
}

Sort.prototype.bubbing = function () {
  let len = this.pipeList.length;

  if (!this.isSorting) {
    this.isSorting = true;
    this.timer = setInterval(() => {
      let {pointIndex, pipeList, currentIndex} = this;
      if (this.currentIndex >= pipeList.length - 1) {
        this.isSorting = false;
        clearInterval(this.timer);
        return;
      }
      if (pointIndex < len - currentIndex - 1) {
        let currentPipe = pipeList[pointIndex];
        let nextPipe = pipeList[pointIndex + 1];
        if (currentPipe.height > nextPipe.height) {
          let temp = nextPipe;
          pipeList[pointIndex + 1] = currentPipe;
          pipeList[pointIndex] = temp;
        }
        this.pointIndex++;
      } else {
        this.currentIndex++; // 结束一轮循环
        this.pointIndex = 0;
      }
      this.render();
    }, this.interval);
  }
}
