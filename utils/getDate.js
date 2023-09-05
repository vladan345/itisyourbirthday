var year;
var end;

export let name = "";

var counter = 0;
//IF COUNTER IS EQUALS TO NUMBER OF BIRTHDAYS, THAT MEANS
//THERE ARE NO BIRTHDAYS LEFT THIS YEAR.
//IN THAT CASE WE NEED TO CHANGE CURRENT YEAR SO THE PROGRAM
//CAN CHECK NEXT BIRTHDAY IN THE BEGGINING OF THE NEXT YEAR.
export function getBirthday(array) {
  year = new Date().getFullYear();
  loopDates(array);
  //THIS IS IF THERE ARE NO MORE BIRTHDAYS THIS YEAR
  if (counter === array.length) {
    year++;
    let newArray = changeYear([...array]);
    loopDates(newArray);
  }
}

//THIS FUNCTION MAKES NEW ARRAY WITH ALL DATES WITH NEW YEAR.
function changeYear(oldArray) {
  for (let i in oldArray) {
    var newDate = year + oldArray[i].date.slice(-15);
    oldArray[i].date = newDate;
    oldArray[i].year = year;
  }
  return oldArray;
}

//THIS CHECKS IF BIRTHAY HAS PASSED, IF YES, IT ADDS 1 TO COUNTER
//IF NOT, IT MEANS THAT BIRTHDAY IS NEXT UP.
function loopDates(dateArray) {
  var today = new Date();
  for (let i = 0; i < dateArray.length; i++) {
    var checkDate = new Date(dateArray[i].date);
    var choosenName = dateArray[i].name;
    if (checkDate > today) {
      //MUSTN'T BE NULL
      end = new Date(checkDate);
      name = choosenName;
      break;
    } else {
      counter++;
    }
  }
}

var second = 1000;
var minute = second * 60;
var hour = minute * 60;
var day = hour * 24;

export function showRemaining() {
  if (end !== undefined) {
    var now = new Date();
    var distance = end - now;

    var days = Math.floor(distance / day);
    var hours = Math.floor((distance % day) / hour);
    var minutes = Math.floor((distance % hour) / minute);
    var seconds = Math.floor((distance % minute) / second);

    let timeArr = [days, hours, minutes, seconds];

    for (let i in timeArr) {
      if (timeArr[i] < 10) {
        timeArr[i] = "0" + timeArr[i];
      }
    }
    return timeArr;
  }
}
