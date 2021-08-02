const draggableList = document.querySelector('.draggable-list');
const checkBtn = document.querySelector('.check-btn');



const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
  ];

  const listItems = [];

  let dragStartIndex


  createList();
//   Create a List
  function createList(){
  [...richestPeople].map(a => ({ value : a, sort: Math.random()}))
  .sort((a,b) => a.sort - b.sort)
  .map(a => a.value)
  .forEach((person, index) => {

  const listItem = document.createElement('li');
  listItem.setAttribute('data-index', index);

  listItem.innerHTML = `
  <span class = "number"> ${index + 1} </span>
  <div class = "draggable" draggable = "true">
    <p class = "person-name"> ${person} </p>
    <i class="fas fa-grip-lines"></i>
  </div>
  `;
   listItems.push(listItem);
  draggableList.appendChild(listItem)
  });
  addEventListeners();
}


// create functions for the drag and drop events
function dragStart(){
 dragStartIndex = this.closest('li').getAttribute('data-index');
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(){
    this.classList.add('over');
}
function dragLeave(){
    this.classList.remove('over')
}

function dragDrop(){
    const dragDropIndex = this.closest('li').getAttribute('data-index');
    swapItems(dragStartIndex, dragDropIndex);
    this.classList.remove('over');
}


// Swap items that are being dragged and dropped
function swapItems(fromIndex, toIndex){
    console.log('hello');
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);

}

function check(){
    listItems.forEach((listItem, index) => {

    const personName = listItem.querySelector('.draggable').innerText.trim();
    if (richestPeople[index] === personName)
    {
       listItem.classList.add('right')
    }
    else {
        listItem.classList.remove('right');
        listItem.classList.add('wrong');
    }}
    )
    
}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const draggableListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    });

    draggableListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('drop', dragDrop);
    })


    checkBtn.addEventListener('click', check)
}
