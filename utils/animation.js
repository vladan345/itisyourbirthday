let prevDate = {
  second: 0,
  minute: 0,
  hour: 0,
  day: 0,
};

export function updateDisplay(value, unit) {
  if (value !== prevDate[unit]) {
    animate(prevDate[unit], value, unit);
  } else {
    document.querySelector(`#${unit} .topFront span`).innerHTML = value;
    document.querySelector(`#${unit} .bottomFront span`).innerHTML = value;
    document.querySelector(`#${unit} .topBack span`).innerHTML = value;
    document.querySelector(`#${unit} .bottomBack span`).innerHTML = value;
  }

  prevDate[unit] = value;
}

export function animate(prev, value, unit) {
  document.querySelector(`#${unit} .topFront span`).innerHTML = prev;
  document.querySelector(`#${unit} .bottomFront span`).innerHTML = prev;
  document.querySelector(`#${unit} .topBack span`).innerHTML = value;
  document.querySelector(`#${unit} .bottomBack span`).innerHTML = value;
  var topFront = document.querySelector(`#${unit} .topFront`);
  var bottomBack = document.querySelector(`#${unit} .bottomBack`);
  topFront.classList.add("flipped-top");
  bottomBack.classList.add("flipped-bottom");

  bottomBack.ontransitionend = () => {
    topFront.classList.remove("flipped-top");
    bottomBack.classList.remove("flipped-bottom");
    document.querySelector(`#${unit} .topFront span`).innerHTML = value;
    document.querySelector(`#${unit} .bottomFront span`).innerHTML = value;
  };
}
