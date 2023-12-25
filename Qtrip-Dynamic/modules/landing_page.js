import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try{
  const res =  await fetch(`${config.backendEndpoint}/cities`).then(x=>x.json()).catch(y=>console.log(y));
  return res;
}catch(e){
  return null;

}
 
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  var element = document.getElementById("data");
  element.classList.add("d-flex","flex-wrap","justify-content-center");
  var add = document.createElement("div");
  // add.id = id;
  add.classList.add("col-12", "col-lg-3", "col-md-4","col-sm-6","tile","text-center","mx-0","my-4");
  var link = document.createElement("a");
  link.id = id;
  link.href = "pages/adventures/?city="+id;
  add.appendChild(link);
  var division = document.createElement("div");
  division.className = "tile-text";
  var img = document.createElement("img");
  img.classList.add("img-thumbnail");
  img.src = image;
  
  var title = document.createElement("h5");
  title.innerText = city;
  var des = document.createElement("p");
  des.innerText = description;
  link.appendChild(img);
  division.appendChild(title);
  division.appendChild(des);
  link.appendChild(division);
  //  var text = document.createTextNode("Tutorix is the best e-learning platform");
  //  add.appendChild(text);
  
  element.appendChild(add);

}

export { init, fetchCities, addCityToDOM };
