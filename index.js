

async function getData() {
    const response = await axios.get('http://localhost:3000/admin/');
    return response;
  }
  
  async function postData(data) {
  const response = await axios.post('http://localhost:3000/admin/add',data);
  return response.data;
  }
  
  async function deleteTask(id) {
  const response = await axios.post(`http://localhost:3000/delete/${id}`);
  return response;
  }
  
  
  document.addEventListener("DOMContentLoaded",async ()=>{
    const form = document.getElementById('form');
    const list = document.getElementById('products');
    const total = document.getElementsByClassName('total');
    let t = 0;
  
    await loadContent();
    const submit = form.querySelector('#submit')
    submit.addEventListener('click',event=>handleSubmit(event,form));
    list.addEventListener('click',handleList);
    
    async function loadContent(){
        try{
            const response = await getData();
            renderHtml(response.data);
        }catch(e){
            console.log(e);
        }
    }
    async function renderHtml(res){
        for (const product of res) {
  
            createList(product);
            t += product.price;
          }
          total.innerHTML = t;
    }
    function createList(product){
        const listItem = document.createElement('li');
            listItem.innerHTML = `
              <span>${product.name}</span>
              <span>${product.price}</span>
              <button class="edit-button" data-id="${product.id}">Edit</button>
              <button class="delete-button" data-id="${product.id}">Delete</button>
            `;
            list.appendChild(listItem);
    }
    async function handleSubmit(event,form){
        event.preventDefault();
        const nameSpan = form.querySelector('#name');
        const priceSpan = form.querySelector('#price');
        const name = nameSpan.value;
        const price = priceSpan.value
        
        if (!name || !price ) {
          alert('Please enter all the details');
          return;
        }
        try{
            const obj ={name,price}
            const res = await postData(obj);
            const newProduct = res;
            nameSpan.value ='';
            priceSpan.value ='';
            
            createList(newProduct);
        }catch(e){
            console.log(e);
        }
    }
    async function handleList(event) {
        // Handle clicks on the delete button
        if (event.target.classList.contains('delete-button')) {
          event.preventDefault();
          const id = event.target.dataset.id;
          try {
            await deleteTask(id);
            const listItem = event.target.parentElement;
            listItem.remove();
          } catch (error) {
            console.error(error);
          }
        }
      }
      
  })