// 获取随机数
function getRandom(n, m) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }
  // 获取游戏开始按键
  const go = document.querySelector(".go");
  // 获取游戏主体
  const table = document.querySelector("table");
  // 定时器id
  let timer;
  // 分数
  let score = 0;
  // 游戏开始
  function start() {
    // 游戏开始按钮添加事件
    go.addEventListener("click", () => {
      // 点击后隐藏按钮
      go.style.display = "none";
      // 调用移动函数让table动起来
      move();
    });
  }
  // 执行游戏函数
  start();
  // 移动
  function move() {
    // 清除定时器
    clearInterval(timer);
    // 创建定时器
    timer = setInterval(() => {
      // 获取当前的top值并加上速度值
      table.style.top = parseInt(table.offsetTop) + 5 + "px";
      // 如果回到原位就重新再返回-150px的地方
      if (parseInt(table.offsetTop) >= 0) {
        table.style.top = "-150px";
        // 之后返回顶部后才会创建标签
        createTr();
      }
      // 如果当前容器里面达到6个就删除最后一个
      if (table.children.length >= 6) {
        // 如果要删除的行中有一个没点击的，游戏结束
        if (Array.from(table.lastElementChild.children).some((ele) => +ele.dataset.index == 1)) {
          // 清除定时器
          clearInterval(timer);
          // 弹出游戏结束
          alert(`游戏结束，您的分数是：${score}`);
          // 清空整个table
          table.innerHTML = "";
          // 移除事件委托
          table.removeEventListener("click", clickFk);
          // 重新让开始游戏显示出来
          go.style.display = "block";
        }

        if (table.children.length > 0) {

          table.children[table.children.length - 1].remove();
        }
      }
    }, 20);

    table.addEventListener("click", clickFk);
  }

  function createTr() {

    let tr = document.createElement("tr");

    const random = getRandom(0, 3);

    for (let i = 0; i < 4; i++) {

      let td = document.createElement("td");

      tr.appendChild(td);
    }

    tr.children[random].style.backgroundColor = "black";

    tr.children[random].dataset.index = 1;

    table.insertBefore(tr, table.childNodes[0]);
  }

  function clickFk(e) {

    if (e.target.dataset.index == 1) {

      e.target.style.backgroundColor = "gray";

      e.target.dataset.index = 0;

      score++;
    } else {

      clearInterval(timer);

      alert(`遊戲結束，你ㄉ分数是：${score}`);

      table.innerHTML = "";

      table.removeEventListener("click", clickFk);

      go.style.display = "block";
    }
  }
