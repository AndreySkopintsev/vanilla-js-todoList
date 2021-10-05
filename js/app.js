const itemForm = document.getElementById('itemForm')
const itemContainer = document.querySelector('.my-5')
const itemInput = document.getElementById('itemInput')
const alertMessage = document.querySelector('.alert')
const clearAll = document.getElementById('clear-list')

// Functions
function addBtns(item){
    item.querySelector('.complete-item').addEventListener('click',(e)=>{
        item.classList.toggle('completed')
    })
    item.querySelector('.edit-item').addEventListener('click',(e)=>{
        itemInput.value = item.querySelector('h5').textContent
        itemInput.focus()
        itemContainer.removeChild(item)
    })
    item.querySelector('.delete-item').addEventListener('click',(e)=>{
        itemContainer.removeChild(item)
    })
}

// Event listeners
itemForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(!itemInput.value){
        alertMessage.classList.add('showItem')
        setTimeout(()=>{
            alertMessage.classList.remove('showItem')
        },2000)
    }else{
        let div = document.createElement('div')
        div.classList.add('item','my-3')
        div.innerHTML = `
            <h5 class="item-name text-capitalize">${itemInput.value}</h5>
            <div class="item-icons">
                <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
                <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
                <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
            </div>
        `
        div.setAttribute('data-text',itemInput.value)
        addBtns(div)
        itemContainer.appendChild(div)
        itemInput.value = ''
    }
})

clearAll.addEventListener('click',()=>{
    itemContainer.innerHTML = ''
})