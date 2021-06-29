const input = document.querySelector('input');
const addBtn = document.querySelector('.add-btn');
const tabBtn = document.querySelectorAll('.tab-btn');
const tabGroup = document.querySelector('.tab-group');
const todoList = document.querySelector('.list');
const removeDoneBtn = document.querySelector('.remove-done');
const undoneNumber = document.querySelector('.undone-number');
// 未渲染的 ul 內部待辦資料
let todoAry = [];
// tab 預設狀態
let currentTab = 'all';
// 代辦項目原型
function todoItem(content, done) {
  this.content = content;
  this.done = done;
}

// 初始化：將 todoAry 渲染成網頁版本，要修改 li 基本架構這邊修改
const iniList = function() {
  // ul 的內容定義為 innerUl
  let innerUl = '';
  // 待完成項目計算
  let undoneNum = 0;
  // 渲染符合條件的 todoItem 實例成網頁版本
  todoAry.forEach(function(item, index) {
    if (item.done == true) {
      if (currentTab == 'all' || currentTab == 'done' ) {
        innerUl += `
        <li class="list-item line-through" data-index="${index}">
          <input type="checkbox" name="done" class="checkbox" data-index="${index}" checked>
          ${item.content}
          <button class="remove-btn">
          <span class="material-icons "data-index="${index}">close</span>
          </button>
        </li>`;
      }
    } else if (item.done == false) {
      undoneNum++;
      if(currentTab == 'all' || currentTab == 'undone') {
        innerUl += `
        <li class="list-item " data-index="${index}">
          <input type="checkbox" name="done" class="checkbox" data-index="${index}">
          ${item.content}
          <button class="remove-btn">
          <span class="material-icons" data-index="${index}">close</span>
          </button>
        </li>`;
      }
    }    
  })
  todoList.innerHTML = innerUl;
  undoneNumber.textContent = undoneNum;
}

// 按下 addBtn 的行為：新增物件實體，並將他 push 到 todoAry
addBtn.addEventListener('click', function() {
  let todoItemIns = new todoItem(input.value, false);
  todoAry.push(todoItemIns);
  iniList();     
});

// 按下待辦項目內 checkbox 及 remove 的行為
todoList.addEventListener('click', function(e) {
  let currentIndex = e.target.getAttribute('data-index');
  if (e.target.nodeName == 'BUTTON' || e.target.nodeName == 'SPAN') {
    todoAry.splice(currentIndex, 1);
  } else if (e.target.checked) {
    todoAry[currentIndex].done = true;
  } else if (!(e.target.checked)){
    todoAry[currentIndex].done = false;
  }
  iniList();
})

// 按下「清除已完成項目」的行為
removeDoneBtn.addEventListener('click', function(e) {
  let undoneAry = [];
  todoAry.forEach(function(item) {
    if(item.done == false) {
      undoneAry.push(item);
    }
  })
  todoAry = undoneAry;
  iniList();
})
tabGroup.addEventListener('click', function(e) {
  let tabName = e.target.textContent;
  tabBtn.forEach(function(item) {
    item.disabled = false;
  })
  if (tabName == '全部') {
    currentTab = 'all';
    tabBtn[0].disabled = true;         
  }  else if (tabName == '待完成') {
    currentTab = 'undone';
    tabBtn[1].disabled = true;
  }  else if (tabName == '已完成') { 
    currentTab = 'done';
    tabBtn[2].disabled = true;
  }
  iniList();
})

iniList();

