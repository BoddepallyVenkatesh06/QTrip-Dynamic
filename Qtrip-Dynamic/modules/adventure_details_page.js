import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id = search.split("=")[1];


  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`).then(x => x.json()).catch(e => console.log(e));
    console.log(res)
    return res;

  } catch (e) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // let element = document.getElementsByClassName("adventure-detail-card");
  let title = document.getElementById("adventure-name");
  title.innerHTML = adventure.name;
  let sub = document.getElementById("adventure-subtitle");
  sub.innerHTML = adventure.subtitle;
  let details = document.getElementById("adventure-content");
  details.innerHTML = adventure.content;
  let div = document.getElementById("photo-gallery");
  adventure.images.forEach(x => {

    let img = document.createElement("img");
    img.src = x;
    img.className = "activity-card-image";
    img.style.display = "none";
    div.appendChild(img);

  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let num = document.getElementsByClassName("carousel-indicators");
  let ele = document.getElementsByClassName("carousel-inner");
  images.forEach((x, i) => {
    if (i === 0) {
      let no = document.createElement("li");
      no.setAttribute("data-target", "#carouselExampleIndicators");
      no.setAttribute("data-slide-to", i + 1);
      no.className = "active";
      num[0].appendChild(no);
      let div = document.createElement("div");
      div.classList.add("carousel-item", "active");
      let img = document.createElement("img");
      img.src = x;
      img.classList.add("d-block", "w-100", "active");
      div.appendChild(img);
      ele[0].appendChild(div);
    } else {
      let no = document.createElement("li");
      no.setAttribute("data-target", "#carouselExampleIndicators");
      no.setAttribute("data-slide-to", i + 1);
      num[0].appendChild(no);
      let div = document.createElement("div");
      div.className = "carousel-item";
      let img = document.createElement("img");
      img.src = x;
      img.classList.add("d-block", "w-100");
      div.appendChild(img);
      ele[0].appendChild(div);
    }

  });


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure['available'] == true) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead

  } else {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
        $("#myForm").submit(function(e) {

        //prevent Default functionality
        e.preventDefault();

        // //get the action-url of the form
        var actionurl = e.currentTarget.action;
        let adventureId = adventure.id;
        let data = $("#myForm").serialize() + '&adventure=' + adventureId;
        //do your own request an handle the results
        $.ajax({
                url: actionurl,
                type: 'post',
                dataType: 'json',
                data: data,
                success: function() {
                    alert("Success!")
                    location.reload();
                },
                error: function(){
                    alert("Failed!")
                    // location.reload();
                }
        });

    });


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved == true){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
