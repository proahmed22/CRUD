var title = document.getElementById('title')
var price = document.getElementById('price')
var taxes = document.getElementById('taxes')
var ads = document.getElementById('ads')
var discount = document.getElementById('discount')
var total = document.getElementById('total')
var count = document.getElementById('count')
var category = document.getElementById('category')
var submit = document.getElementById('submit')

var mood = 'Create';
var hmo;

function getTotal(){
    if(price.value !=''){
        var result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result ;
        total.style.background = '#040';
    }else{
        total.innerHTML = '' ;
        total.style.background = '#a00d02'
    }
}
var dataPro;

if(localStorage.product !=null){
    dataPro =JSON.parse(localStorage.product)
}else{
     dataPro = [];
}



submit.onclick = function(){
    var newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != ''
    && price.value != ''
    && category.value !=''
    && newPro.count < 100){
        if (mood === 'Create'){
         if (newPro.count > 1){
        for(var i = 0; i < newPro.count;i++ ){
            dataPro.push(newPro);
        }
    }else{
        dataPro.push(newPro); 
    }
    
    }else{
        dataPro[hmo] = newPro;
        mood = 'Create'
        submit.innerHTML='Create'
        count.style.display = 'block'
    }
    clearData()
    }
    


    localStorage.setItem('product', JSON.stringify(dataPro))

    clearData()
    showData()
}

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
   
}

function showData()
{
    var table ='';

    for (var i = 0; i < dataPro.length;i++){
        table += 
        `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title} </td>
            <td>${dataPro[i].price} </td>
            <td>${dataPro[i].taxes} </td>
            <td>${dataPro[i].ads}  </td>
            <td>${dataPro[i].discount}  </td>
            <td>${dataPro[i].total}  </td>
            <td>${dataPro[i].category}  </td>
            <td> <button onclick="update(${i})"      id = "update">update</button></td>
            <td> <button onclick="deleteData(${i})"  id ="delete" >delete</button></ </td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;
    var btnDeleteAll = document.getElementById('deleteAll')

    if (dataPro.length > 0) {

        btnDeleteAll.innerHTML =`<button onclick="deleteAll()" >Delete All (${dataPro.length}) <button>`
    }else{
        btnDeleteAll.innerHTML = ""
    }
    getTotal()
   
}

showData()



function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll(){ 
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

function update(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'update'
    hmo = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
    
}



var searchMood ='title'

function getSearchMood(id)
{
    var search = document.getElementById('search')
    if(id=='searchTitle'){
        searchMood ='title'
       
    }else{
        searchMood ='category'
    }
    search.placeholder ='Search By ' + searchMood;
    search.focus()
    search.value = ""
    showData()

}


function searchData(value)
{
    var table ='';
    for( var i =0; i < dataPro.length ;i++)

   if(searchMood='title')
   {
        if(dataPro[i].title.includes(value.toLowerCase())){
                        table += 
                    `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title} </td>
                        <td>${dataPro[i].price} </td>
                        <td>${dataPro[i].taxes} </td>
                        <td>${dataPro[i].ads}  </td>
                        <td>${dataPro[i].discount}  </td>
                        <td>${dataPro[i].total}  </td>
                        <td>${dataPro[i].category}  </td>
                        <td> <button onclick="update(${i})"      id = "update">update</button></td>
                        <td> <button onclick="deleteData(${i})"  id ="delete" >delete</button></ </td>
                    </tr>
                    `
                    }
    
   }
   else
   {
        if(dataPro[i].category.includes(value.toLowerCase())){
                        table += 
                    `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title} </td>
                        <td>${dataPro[i].price} </td>
                        <td>${dataPro[i].taxes} </td>
                        <td>${dataPro[i].ads}  </td>
                        <td>${dataPro[i].discount}  </td>
                        <td>${dataPro[i].total}  </td>
                        <td>${dataPro[i].category}  </td>
                        <td> <button onclick="update(${i})"      id = "update">update</button></td>
                        <td> <button onclick="deleteData(${i})"  id ="delete" >delete</button></ </td>
                    </tr>
                    `
                    }
    
   }
   document.getElementById('tbody').innerHTML = table;
}