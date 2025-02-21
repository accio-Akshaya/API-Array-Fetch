function fetchDataWithDelay(url,delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            fetch(url)
               .then(res => res.json())
               .then(data =>{
                   displayData(data,url);
                   resolve(true);
               })
               .catch(error =>{
                   console.error("Error fetching date:",error);
                   reject(error);
               });
        },delay);
    });
}

function displayData(data,url){
    const table = document.getElementById("dataTable");
    const section = document.createElement("tr");
    section.innerHTML = `<td colspan ='3'><strong>Data form ${url}</stron></td>`;
    table.appendChild(section);

    if(data.posts){
        data.posts.forEach(item => addRowToTable(item.id, item.title, item.body));

    }else if(data.products){
        data.products.forEach(item => addRowToTable(item.id, item.title, item.description));
    }else if(data.todos){
        data.todos.forEach(item => addRowToTable(item.id, item.todo, item.completed));
    }
}

function addRowToTable(id,col1,col2){
    const table = document.getElementById("dataTable");
    const row = document.createElement("tr");
    row.innerHTML = `<td>${id}</td><td>${col1}</td><td>${col2}</td>`;
    table.appendChild(row);
}

function fetchAllData(){
    document.getElementById("dataTable").innerHTML ="<tr><th>ID</th><th>Title</th><th>Details</th>";

    fetchDataWithDelay("https://dummyjson.com/posts",1000)
        .then(()=> fetchDataWithDelay("https://dummyjson.com/products",2000))
        .then(()=> fetchDataWithDelay("https://dummyjson.com/todos",3000))
        .catch(error => console.error("Error in fetching APIs:",error));
}

document.body.innerHTML =`<button id="fetchDataBtn">Fetch API Data</button>

             <table border="1" id="dataTable"></table>`;

document.getElementById("fetchDataBtn").addEventListener("click",fetchAllData);             
