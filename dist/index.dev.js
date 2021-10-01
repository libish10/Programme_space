"use strict";

display_launch_space();

function display_launch_space() {
  //document.getElementsByClassName("clear_filter").style.display = "none";
  fetch("https://api.spacexdata.com/v3/launches?limit=100&").then(function (response) {
    return response.json();
  }).then(function (json) {
    return display_launch_space_list(json);
  })["catch"](function (err) {
    return console.log("Error : " + err);
  });
}

function display_launch_space_list(data) {
  if (data) {
    var Result = "";
    data.map(function (user, index) {
      var mission_image = user.links.mission_patch_small;
      var mission_name = user.mission_name;
      var mission_id = user.mission_id;
      var launch_year = user.launch_year;
      var launch_success = user.launch_success;
      var land_success = user.rocket.first_stage.cores[0].landing_intent;
      Result += "<div class='grid-item'>\n            <img src=".concat(mission_image, " alt=").concat(mission_name, " class='mission-image'>\n            <h2 class='mission-name'>").concat(mission_name, " #").concat(index + 1, "</h2>\n            <ul class='list-container'>\n                    <li class='mission-detail'>Mission Ids : \n                        <span class='mission-detail-value'>").concat(mission_id, "</span>\n                    </li>\n                    <li class='mission-detail'>Launch Year :\n                        <span  class='mission-detail-value'> ").concat(launch_year, "</span>\n                    </li>\n                    <li class='mission-detail'>Successful Launch :\n                        <span  class='mission-detail-value'> ").concat(launch_success, "</span>\n                        </li>\n                    <li class='mission-detail'>Successful Land : \n                    <span  class='mission-detail-value'>").concat(land_success, "</span>\n                    </li>\n            </ul>\n            </div>");
    });
    document.getElementById("space_launch_result").innerHTML = Result;
  }
}

function display_year(year, idValue) {
  // var button_active = document.getElementById(idValue);
  // button_active.style.backgroundColor = "rgb(0,255,50)";
  document.getElementById("clear_filter_1").style.display = "block";
  fetch("https://api.spacexdata.com/v3/launches?limit=100&&launch_year=".concat(year)).then(function (response) {
    return response.json();
  }).then(function (json) {
    return display_launch_space_list(json);
  })["catch"](function (err) {
    return console.log("Error : " + err);
  });
}

function display_launch_success(success_failure) {
  fetch("https://api.spacexdata.com/v3/launches?limit=100&&launch_success=".concat(success_failure)).then(function (response) {
    return response.json();
  }).then(function (json) {
    return display_launch_space_list(json);
  })["catch"](function (err) {
    return console.log("Error : " + err);
  });
  document.getElementById("clear_filter_2").style.display = "block";
}

function display_land_success(success_failure) {
  fetch("https://api.spacexdata.com/v3/launches?limit=100&&land_success=".concat(success_failure)).then(function (response) {
    return response.json();
  }).then(function (json) {
    return display_launch_space_list(json);
  })["catch"](function (err) {
    return console.log("Error : " + err);
  });
  document.getElementById("clear_filter_3").style.display = "block";
}

function hide_clear_filter(idValue) {
  var button_sel = document.getElementById(idValue);
  button_sel.style.display = "none";
  display_launch_space();
}