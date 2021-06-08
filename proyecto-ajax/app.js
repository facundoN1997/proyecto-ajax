
//CONSUMO DE DATOS CON EL OBJETO XMLHttpRequest
const consumeXMLHttpRequest = (url) => {

   

        
    let xhr;
    let results;

    if(window.XMLHttpRequest)xhr = new XMLHttpRequest();
    else xhr = new ActiveXObject();

    xhr.open("GET",url);

    xhr.addEventListener("load",()=>{

        
        results  = JSON.parse(xhr.response);

        const info = document.createDocumentFragment();
        const record = document.createElement("TR");
        record.innerHTML = "<th>"+"Name"+"</th>"+"<th>"+"Email"+"</th>"+"<th>"+"Company"+"</th>";
        info.appendChild(record);

        for (let row of results){
            
           const record = document.createElement("TR");
           record.innerHTML = "<td>"+row["name"]+"</td>"+"<td>"+row["email"]+"</td>"+"<td>"+row["company"]["name"]+"</td>";
           info.appendChild(record);

        }

        const tablePanel = document.getElementById("table");
        tablePanel.appendChild(info);
        tablePanel.classList.add("table-padding");
        
    }
        
    
    
    )

    xhr.send();

    delete xhr;
    
    document.querySelector(".panel-3 h2").innerHTML="LA SIGUIENTE INFORMACIÓN ESTA SIENDO CARGADA CON EL METODO SELECCIONADO";


}

//CONSUMO DE DATOS CON FETCH
const consumeFetch = (url) => {

    let results = fetch(url)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        const info = document.createDocumentFragment();
        const record = document.createElement("TR");
        record.innerHTML = "<th>"+"Name"+"</th>"+"<th>"+"Email"+"</th>"+"<th>"+"Company"+"</th>";
        info.appendChild(record);

        for (let row of res){
            
            const record = document.createElement("TR");
            record.innerHTML = "<td>"+row["name"]+"</td>"+"<td>"+row["email"]+"</td>"+"<td>"+row["company"]["name"]+"</td>";
            info.appendChild(record);
 
         }
      
         let tablePanel = document.getElementById("table");
         console.log(tablePanel);
         tablePanel.appendChild(info);
         tablePanel.classList.add("table-padding");



        });

        document.querySelector(".panel-3 h2").innerHTML="THIS FOLLOWING INFORMATION IS BEING LOADED WITH THE SELECTED AJAX METHOD";
}

//CONSUMO DE DATOS CON LIBRERIA AXIOS
const consumeAxios = (url) =>{


    axios.get('https://jsonplaceholder.typicode.com/users', {
    responseType: 'json'
  })
  .then((res)=>{
      console.log(res.data);
      const info = document.createDocumentFragment();
      const record = document.createElement("TR");
      record.innerHTML = "<th>"+"Name"+"</th>"+"<th>"+"Email"+"</th>"+"<th>"+"Company"+"</th>";
      info.appendChild(record);

      for(let row of res.data)
      {
          console.log(row["name"]);

          const record = document.createElement("TR");
            record.innerHTML = "<td>"+row["name"]+"</td>"+"<td>"+row["email"]+"</td>"+"<td>"+row["company"]["name"]+"</td>";
            info.appendChild(record);
      }

      let tablePanel = document.getElementById("table");
      console.log(tablePanel);
      tablePanel.appendChild(info);
      tablePanel.classList.add("table-padding");
    })
    .catch((error) => {console.log(error)})

    document.querySelector(".panel-3 h2").innerHTML="THIS FOLLOWING INFORMATION IS BEING LOADED WITH THE SELECTED AJAX METHOD";
}


//FUNCION QUE CARGA LOS ESCUCHADORES DE EVENTOS
const load = () => {

//ESCUCHADOR DE EVENTOS PARA DOTAR DE INTERACCIÓN AL BOTON DE AXIOS
const btnaxml = document.getElementById('btnaxml');
btnaxml.addEventListener("click",()=>{
    //elimino informacion anterior para no repetir
    const info = document.querySelectorAll("#table tr");
    for (let i of info){
        i.firstChild.firstChild.remove();
        i.firstChild.remove();
        i.remove();
    }
    //llamo a la funcion para consumir datos
    consumeXMLHttpRequest("https://jsonplaceholder.typicode.com/users");
    //hago cambios con la info necesaria
    document.getElementById("imgmain").src="img/instructivoxhr.png";
    document.getElementById("titlemain").textContent="Metodo XMLHttpRequest";
    document.getElementById("paragraphmain").textContent="XMLHttpRequest (XHR) objects are used to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing. XMLHttpRequest is used heavily in AJAX programming.";
    document.getElementById("img-without-info").setAttribute("src","");
    document.querySelector(".panel-3 p").style.visibility="hidden";


});

//ESCUCHADOR DE EVENTOS PARA DOTAR DE INTERACCIÓN AL BOTON DE FECTH
const btnfetch = document.getElementById('btnfetch');
btnfetch.addEventListener("click",()=>{
    
    const info = document.querySelectorAll("#table tr");
    for (let i of info){
        i.firstChild.firstChild.remove();
        i.firstChild.remove();
        i.remove();
    }
    consumeFetch("https://jsonplaceholder.typicode.com/users");
    

    document.getElementById("imgmain").src="img/instructivofetch.png";
    document.getElementById("titlemain").textContent="Metodo Fetch";
    document.getElementById("paragraphmain").textContent="Fetch objects are used to interact with servers. You can retrieve data from a URL without having to do a full page refresh. the main difference with XMLHttpRequest is that fetch incorporates the use of javascript's promises what causes that the code to be more cleaner";
    document.getElementById("img-without-info").setAttribute("src","");
    document.querySelector(".panel-3 p").style.visibility="hidden";
   
    

});

//ESCUCHADOR DE EVENTOS PARA DOTAR DE INTERACCIÓN AL BOTON DE AXIOS
const btnaxios = document.getElementById('btnaxios');
btnaxios.addEventListener("click",()=>{
    const info = document.querySelectorAll("#table tr");
    for (let i of info){
        i.firstChild.firstChild.remove();
        i.firstChild.remove();
        i.remove();
    }
    consumeAxios("https://jsonplaceholder.typicode.com/users");
    document.getElementById("imgmain").src="img/instructivoaxios.png";
    document.getElementById("titlemain").textContent="Metodo Axios";
    document.getElementById("paragraphmain").textContent="Axios is a promise-based HTTP client for the browser and Node. js. Axios makes it easy to send asynchronous HTTP requests to REST endpoints and perform CRUD operations. It can be used in plain JavaScript or with a library such as Vue or React.";
    document.getElementById("img-without-info").setAttribute("src","");
    document.querySelector(".panel-3 p").style.visibility="hidden";
   

})


//FUNCION QUE DOTA DE INTERACTIIDAD AL MENU DEL BOTON
document.getElementById("toggle").addEventListener("click",()=>{

    document.getElementById("menu").classList.toggle("visible");
})

//FUNCION QUE DOTA DE INTERACTIVIDAD AL MENU DE INICIO
document.getElementById("identy").addEventListener("click",()=>{
    location.reload();


})

}



window.onload=load;