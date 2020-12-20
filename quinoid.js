let fullName = null;
let email = null;
let dob = null;
let country = null;
let success = false;

let checkName = (name) => {
  var letters = /^[A-Za-z ]+$/;
  if (name.match(letters)) {
    return true;
  } else {
    document.querySelector("#errorName").innerHTML = "Enter Valid Name";
    return false;
  }
};

let validateEmail = (mail) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  } else {
    document.querySelector("#errorMail").innerHTML = "Enter Valid email";
    return false;
  }
};

let checkAge = (age) => {
  let year = "";
  let month = "";
  let day = "";
  for (let index = 0; index < age.length; index++) {
    if (index < 4) year += age[index];
    else if (index > 4 && index < 7) month += age[index];
    else if (index > 7) day += age[index];
  }
  year = parseInt(year);
  month = parseInt(month);
  day = parseInt(day);
  var today = new Date();
  if (today.getFullYear() - year > 18) {
    return true;
  } else if (today.getFullYear() - year === 18) {
    if (today.getMonth() + 1 > month) {
      return true;
    } else if (today.getMonth() + 1 === month) {
      if (today.getDate() >= day) {
        return true;
      }
    }
  }
  document.querySelector("#errorDob").innerHTML = "should be above 18";
  return false;
};

let checkCountry = (country) => {
  if (country != "your country") return true;
  document.querySelector("#errorCountry").innerHTML = "select a country";
  return false;
};

let checkAgree = () => {
  let agree = document.querySelector("#agree");
  if (agree.checked === true) return true;
  document.querySelector("#errorAgree").innerHTML =
    "agree terms and conditions";
};

let clearAll = () => {
  document.querySelector("#errorName").innerHTML = "";
  document.querySelector("#errorMail").innerHTML = "";
  document.querySelector("#errorDob").innerHTML = "";
  document.querySelector("#errorCountry").innerHTML = "";
  document.querySelector("#errorAgree").innerHTML = "";
  document.querySelector("#countryDetails").innerHTML = "";
};

let fillDetails = (country) => {
  document.querySelector(".details").style.display = "block";
  let reqURL = "https://restcountries.eu/rest/v2/region/" + country;
  xhttp.open("GET", reqURL);
  xhttp.send();
};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Typical action to be performed when the document is ready:
    let content = JSON.parse(xhttp.responseText);
    let keys = Object.keys(content[0]);
    // for (let index = 0; index < keys.length; index++) {
    //   const element = keys[index];
    //   //console.log(content[0].keys[0]);
    //   document.getElementById("countryDetails").append = element;
    // }
    // document.getElementById(
    //   "countryDetails"
    // ).innerHTML = `${keys[0]} - ${content[0].name}`;
    // console.log(content[0]);

    var table = document.querySelector(".table");
    var rows = "";
    for (var p in content) {
      for (var k in content[p]) {
        rows +=
          "<tr><td>" +
          k +
          "</td><td>" +
          JSON.stringify(content[p][k]) +
          "</td></tr>";
      }
    }
    table.innerHTML = rows;
  }
};

document.querySelector("#submitBtn").addEventListener("click", () => {
  clearAll();
  let flag = true;
  //full name
  fullName = document.querySelector("#fullName").value;
  if (!checkName(fullName)) flag = false;
  //email
  email = document.querySelector("#email").value;
  if (!validateEmail(email)) flag = false;
  //date of birth
  dob = document.querySelector("#dateOfBirth").value;
  if (!checkAge(dob)) flag = false;
  country = document.querySelector("#country").value;
  if (!checkCountry(country)) flag = false;
  if (!checkAgree()) flag = false;

  if (flag) {
    fillDetails(country);
  }
});
