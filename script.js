let currentDate = document.getElementById("date-today");
let currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
let saveBtn = document.getElementsByClassName("btn");
let inputGroup = document.getElementsByClassName("input-group");
console.log(inputGroup);

//function to set the current date and day at the top.
const setTime = () => {
  let today = moment();
  $("#currentDay").text(today.format("MMM Do, YYYY"));
};

// function to color the timeblocks according to the time of the day.
// gray if the time has pased, green if the time is the current hour, and blue for future.
const colorBlocks = () => {
  $(".input-group").each(function (i, element) {
    var timeBlock = parseInt($(this).attr("id").replace("hour-", ""));
    var time = parseInt(moment().format("H"));
    $(this).removeClass("done will doing");
    if (timeBlock < time) {
      $(this).addClass("done");
    } else if (timeBlock > time) {
      $(this).addClass("will");
    } else {
      $(this).addClass("doing");
    }
  });
};

//saving data to local storage
function saveTasks(event) {
  var time = $(this).parent().attr("id");
  console.log(time);
  localStorage.setItem(
    moment().format("DDDYYYY") + time,
    $("#" + time + " textarea").val()
  );
  console.log("hello");
}

// update and load local storage data to web pages
const localStorageData = () => {
  $(".input-group").each(function () {
    var blockId = $(this).attr("id");
    // load saved data from local storage
    $("#" + blockId + " textarea").text(
      localStorage.getItem(moment().format("DDDYYYY") + blockId)
    );
  });
};

// function to run the application
const init = () => {
  setTime();

  colorBlocks();

  localStorageData();

  $(saveBtn).on("click", saveTasks);
};

// function call to run the whole application
$(init);
