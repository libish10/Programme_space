display_launch_space();

function display_launch_space() {
    //document.getElementsByClassName("clear_filter").style.display = "none";
    fetch("https://api.spacexdata.com/v3/launches?limit=100&")
        .then((response) => response.json())
        .then(json => display_launch_space_list(json))
        .catch((err) => console.log("Error : " + err))
}

function display_launch_space_list(data) {

    if (data) {
        var Result = "";
        data.map((user, index) => {
            let mission_image = user.links.mission_patch_small
            let mission_name = user.mission_name;
            let mission_id = user.mission_id;
            let launch_year = user.launch_year;
            let launch_success = user.launch_success;
            let land_success = user.rocket.first_stage.cores[0].landing_intent

            Result += `<div class='grid-item'>
            <img src=${mission_image} alt=${mission_name} class='mission-image'>
            <h2 class='mission-name'>${mission_name} #${index+1}</h2>
            <ul class='list-container'>
                    <li class='mission-detail'>Mission Ids : 
                        <span class='mission-detail-value'>${mission_id}</span>
                    </li>
                    <li class='mission-detail'>Launch Year :
                        <span  class='mission-detail-value'> ${launch_year}</span>
                    </li>
                    <li class='mission-detail'>Successful Launch :
                        <span  class='mission-detail-value'> ${launch_success}</span>
                        </li>
                    <li class='mission-detail'>Successful Land : 
                    <span  class='mission-detail-value'>${land_success}</span>
                    </li>
            </ul>
            </div>`
        })
        document.getElementById("space_launch_result").innerHTML = Result;
    }


}

function display_year(year, idValue) {

    // var button_active = document.getElementById(idValue);
    // button_active.style.backgroundColor = "rgb(0,255,50)";
    document.getElementById("clear_filter_1").style.display = "block";

    fetch(`https://api.spacexdata.com/v3/launches?limit=100&&launch_year=${year}`)
        .then((response) => response.json())
        .then(json => display_launch_space_list(json))
        .catch((err) => console.log("Error : " + err))
}

function display_launch_success(success_failure) {
    fetch(`https://api.spacexdata.com/v3/launches?limit=100&&launch_success=${success_failure}`)
        .then((response) => response.json())
        .then(json => display_launch_space_list(json))
        .catch((err) => console.log("Error : " + err))
    document.getElementById("clear_filter_2").style.display = "block";

}


function display_land_success(success_failure) {
    fetch(`https://api.spacexdata.com/v3/launches?limit=100&&land_success=${success_failure}`)
        .then((response) => response.json())
        .then(json => display_launch_space_list(json))
        .catch((err) => console.log("Error : " + err))
    document.getElementById("clear_filter_3").style.display = "block";

}


function hide_clear_filter(idValue) {
    var button_sel = document.getElementById(idValue);

    button_sel.style.display = "none";
    display_launch_space();
}