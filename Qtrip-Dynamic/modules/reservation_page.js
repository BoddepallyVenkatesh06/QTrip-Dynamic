import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = fetch(`${config.backendEndpoint}/reservations/`).then(x => x.json()).catch(e => console.log(e));
    console.log(res)
    return res;

  } catch (e) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations == null || reservations == undefined || reservations == "") {
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  } else {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
    reservations.forEach((x) => {
      let ele = document.getElementById("reservation-table");
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let a = document.createElement("a");
      a.href = `/pages/adventures/detail/?adventure=${x.adventure}`;
      a.innerHTML = "<b>" + x.id + "</b>";
      td1.appendChild(a);
      let td2 = document.createElement("td");
      td2.innerHTML = x.name;
      let td3 = document.createElement("td");
      td3.innerHTML = x.adventureName;
      let td4 = document.createElement("td");
      td4.innerHTML = x.person;
      let td5 = document.createElement("td");
      let date = tDate(x.date);
      td5.innerHTML = date;
      let td6 = document.createElement("td");
      td6.innerHTML = x.price;
      let td7 = document.createElement("td");
      let time = convertDate(x.time);
      td7.innerHTML = time;
      let td8 = document.createElement("td");
      td8.id = x.id;
      td8.classList.add("reservation-visit-button");
      let btn = document.createElement("a");
      btn.href = `/pages/adventures/detail/?adventure=${x.adventure}`;
      btn.innerHTML = "Visit Adventure";
      td8.appendChild(btn);
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      tr.appendChild(td7);
      tr.appendChild(td8);
      ele.appendChild(tr);
    });
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

function convertDate(d){
  var parts = d.split(" ");
  var months = {
   Jan: "January",
   Feb: "February",
   Mar: "March",
   Apr: "April",
   May: "May",
   Jun: "June",
   Jul: "July",
   Aug: "August",
   Sep: "September",
   Oct: "October",
   Nov: "November",
   Dec: "December"
  };
  let day = "";
  if(parts[2].slice(0,1) == 0){
    day = parts[2].slice(1,2);
  }else{
    day = parts[2];
  }
  let time = parts[4].toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [parts[4]];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? ' am' : ' pm'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return day+" "+months[parts[1]]+" "+parts[3]+ ", "+ time.join('');
 }
 

function tDate(date){
  let dat = date.split("-");
  let day = "";
  let month = "";
  if(dat[2].slice(0,1) == 0){
    day = dat[2].slice(1,2);
  }else{
    day = dat[2];
  }
  if(dat[1].slice(0,1) == 0){
    month = dat[1].slice(1,2);
  }else{
    month = dat[1];
  }
  let dateformat = day + '/' + month + '/' + dat[0];

  return dateformat;
}


export { fetchReservations, addReservationToTable };
