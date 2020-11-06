const input = document.getElementById('itemInput')
const alertBox = document.querySelector('.feedback')
const addBtn = document.getElementById('submitBtn')
const clearBtn = document.getElementById('clear-list')
const itemList = document.querySelector('.item-list')
const clearList = document.getElementById('clear-list')
let itemArray = []

//Event listeners

addBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let itemName = input.value
    if(itemName){
        itemArray = [...itemArray,itemName]
        localStorage.setItem('items',JSON.stringify(itemArray))
        refreshItemList(itemArray)
        input.value = ''
    }else{
        alertBox.classList.add('showItem')
        setTimeout(()=>{
            alertBox.classList.remove('showItem')
        },2000)
    }
    
})

clearList.addEventListener('click',()=>{
    localStorage.removeItem('items')
    itemArray = []
    refreshItemList(itemArray)
})

//Functions

function retirieveLocalStorage(){
    const todoStorage = localStorage.getItem('items')
    if(todoStorage === 'undefined' || todoStorage === null){
        itemArray = []
    }else{
        itemArray = JSON.parse(todoStorage)
        refreshItemList(itemArray)
    }
}

function refreshItemList(array){
    itemList.innerHTML = ''
    array.forEach(item => {
        appendItem(item)
    })
}



function appendItem(item){
    let newItem = document.createElement('div')
    newItem.classList.add('item','my-3')
    newItem.innerHTML = `
    <h5 class="item-name text-capitalize">${item}</h5>
    <div class="item-icons">
    <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle" ></i></a>
    <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit" '></i></a>
    <a href="#" class="delete-item item-icon"><i class="far fa-times-circle" ></i></a>
    </div>
    `
    newItem.querySelectorAll('i').forEach(icon =>{
        icon.addEventListener('click',(e)=>{
            if(icon.classList.contains('fa-check-circle')){
                newItem.querySelector('.item-name').classList.toggle('completed')
            }else if(icon.classList.contains('fa-edit')){
                let itemName = newItem.querySelector('.item-name').textContent
                input.value = itemName
                input.focus()
                itemArray = itemArray.filter(item => item != itemName)
                localStorage.setItem('items',JSON.stringify(itemArray))
                refreshItemList(itemArray)
            }else{
                let itemName = newItem.querySelector('.item-name').textContent
                itemArray = itemArray.filter(item => item != itemName)
                localStorage.setItem('items',JSON.stringify(itemArray))
                refreshItemList(itemArray)
            }
        })
    })
    itemList.appendChild(newItem)
}

retirieveLocalStorage()