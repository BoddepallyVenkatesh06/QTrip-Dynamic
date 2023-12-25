
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let cityId = search.split("=")[1];
  return cityId;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const res = fetch(`${config.backendEndpoint}/adventures?city=${city}`).then(x=>x.json()).catch(e=>console.log(e));
    console.log(res)
    return res;

  }catch(e){
    return null;
  }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {    
      var element = document.getElementById("data");
      element.classList.add("d-flex");
      var add = document.createElement("div");
      add.classList.add("col-12","col-lg-3","col-md-4","col-sm-6","mb-4","mt-3");
      var cat = document.createElement("div");
      cat.classList.add("category-banner");
      cat.innerText = key.category;
      
      var anchor = document.createElement("a");
      anchor.id = key.id;
      anchor.href = "detail/?adventure="+key.id;
      
      var card = document.createElement("div");
      card.classList.add("card","activity-card");
      
      var image = document.createElement("img");
      image.classList.add("card-img-top");
      image.src = key.image;
      
      var cardbody = document.createElement("div");
      cardbody.classList.add("card-body","mt-0","mb-0","pb-0");
      var cardbody2 = document.createElement("div");
      cardbody2.classList.add("card-body","mt-0","mb-0","pt-0","pb-0");
      
      var h = document.createElement("h5");
      h.classList.add("card-title","float-left");
      h.innerHTML = key.name;
      var p = document.createElement("p");
      p.classList.add("card-text","float-right");
      p.innerHTML = "&#x20B9;"+key.costPerHead;
      var h1 = document.createElement("h5");
      h1.classList.add("card-title","float-left");
      h1.innerHTML = "Duration";
      var p1 = document.createElement("p");
      p1.classList.add("card-text","float-right");
      p1.innerHTML = key.duration + " HOURS";
      element.appendChild(add);
      add.appendChild(cat);
      add.appendChild(anchor);
      anchor.appendChild(card);
      card.appendChild(image);
      card.appendChild(cardbody);
      card.appendChild(cardbody2);
      cardbody.appendChild(h);
      cardbody.appendChild(p);
      cardbody2.appendChild(h1);
      cardbody2.appendChild(p1); 

  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const l = list.filter((x) => {
    return (x.duration >= low) && (x.duration <= high);
  })
  return l;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const l = list.filter((x) => {
    for (let i = 0;i<categoryList.length; i++) {
      if (x.category == categoryList[i]) {
        return x;
      }      
    }
    })
  return l;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log(filters)
   if((filters['category'].length == 0) && (filters['duration'].length != "")){
     let low = filters['duration'].split("-")[0];
     let high = filters['duration'].split("-")[1];
     return filterByDuration(list,low,high)
   }else if((filters['category'].length != 0) && (filters['duration'].length == "")){
     return filterByCategory(list,filters['category'])
   }else if((filters['category'].length != 0) && (filters['duration'].length != "")){
      let low = filters['duration'].split("-")[0];
      let high = filters['duration'].split("-")[1];
      let filDur =  filterByDuration(list,low,high)
      return filterByCategory(filDur,filters['category'])
   }else{
     return list;
   }

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  return JSON.parse(localStorage.getItem('filters'));

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
    
  filters.category.forEach(x=>{
    let element  = document.getElementById("category-list");
    let data = document.createElement("div");
    data.classList.add("category-filter");
    data.innerText =  x;
    let cross =  document.createElement("span");
    cross.classList.add("close");
    cross.innerHTML = "&times;";
    cross.id = x;
    // cross.onclick = function(event) { 
    //   deleteCategory(event);
    // };
    data.appendChild(cross);
    element.appendChild(data);
  })
 

}




export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,

};
