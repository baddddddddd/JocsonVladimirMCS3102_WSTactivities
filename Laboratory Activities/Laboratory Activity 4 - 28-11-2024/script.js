const header = document.querySelector("header");

let stars = document.getElementById("stars");
let moon = document.getElementById("moon");
let mountains = document.getElementById("mountains");
let left_terrain = document.getElementById("left-terrain");
let right_terrain = document.getElementById("right-terrain");
let clouds = document.getElementById("clouds");

let offset = -30;
let x = 0;
let y = 0;

window.onscroll = () => {
  header.classList.toggle("sticky", window.scrollY > 0);

  updateParallax();
};

window.onmousemove = (e) => {
  offset = -30;
  x =
    ((e.clientX - window.innerWidth * 0.5) / (window.innerWidth * 0.5)) *
    offset;
  y =
    ((e.clientY - window.innerHeight * 0.5) / (window.innerHeight * 0.5)) *
    offset;

  updateParallax();
};

function updateParallax() {
  stars.style.top = window.scrollY * 0.9 + y * 0.2 + "px";
  moon.style.top = window.scrollY * 0.85 + y * 0.25 + "px";
  mountains.style.top = window.scrollY * 0.5 + y * 0.55 + "px";
  left_terrain.style.top = window.scrollY * 0.25 + y * 0.85 + "px";
  right_terrain.style.top = window.scrollY * 0.2 + y * 0.95 + "px";
  clouds.style.top = window.scrollY * 0.4 + y * 0.7 + "px";

  clouds.style.left = window.scrollY * 0.2 + x * 1.2 + "px";
  left_terrain.style.left = window.scrollY * -0.05 + x * 0.85 + "px";
  right_terrain.style.left = window.scrollY * 0.1 + x * 0.95 + "px";
  mountains.style.left = window.scrollY * -0.08 + x * 0.55 + "px";
}

let active_index = 0;

let groups = document.getElementsByClassName("card-group");

const handleSwipeLeft = () => {
  const next_index =
    active_index - 1 >= 0 ? active_index - 1 : groups.length - 1;
  const current_group = document.querySelector(
    `[data-index="${active_index}"]`
  );
  const next_group = document.querySelector(`[data-index="${next_index}"]`);

  current_group.dataset.status = "to-right";
  next_group.dataset.status = "from-left";

  const current_part = document.querySelector(
    `[data-about-part="${active_index}"]`
  );
  const next_part = document.querySelector(`[data-about-part="${next_index}"]`);

  setTimeout(() => {
    next_group.dataset.status = "active";
    next_part.dataset.aboutstatus = "active";
    current_part.dataset.aboutstatus = "inactive";

    active_index = next_index;
  }, 100);
};

const handleSwipeRight = () => {
  const next_index = active_index + 1 < groups.length ? active_index + 1 : 0;
  const current_group = document.querySelector(
    `[data-index="${active_index}"]`
  );
  const next_group = document.querySelector(`[data-index="${next_index}"]`);

  current_group.dataset.status = "to-left";
  next_group.dataset.status = "from-right";

  const current_part = document.querySelector(
    `[data-about-part="${active_index}"]`
  );
  const next_part = document.querySelector(`[data-about-part="${next_index}"]`);

  setTimeout(() => {
    next_group.dataset.status = "active";
    next_part.dataset.aboutstatus = "active";
    current_part.dataset.aboutstatus = "inactive";

    active_index = next_index;
  }, 100);
};

let faves = ["anime", "manga", "movies", "music", "website"];

let active_id = 0;
document.getElementById(faves[active_id]).classList.toggle("show");
document.getElementById(`btn-${faves[active_id]}`).classList.toggle("active");

const showAnime = () => {
  updateGrid(0);
};

const showManga = () => {
  updateGrid(1);
};

const showMovies = () => {
  updateGrid(2);
};

const showMusic = () => {
  updateGrid(3);
};

const showWebsite = () => {
  updateGrid(4);
};

function updateGrid(id) {
  let prev_grid = document.getElementById(faves[active_id]);
  prev_grid.classList.toggle("show");

  let prev_button = document.getElementById(`btn-${faves[active_id]}`);
  prev_button.classList.toggle("active");

  active_id = id;
  let next_grid = document.getElementById(faves[active_id]);
  next_grid.classList.toggle("show");

  let next_button = document.getElementById(`btn-${faves[active_id]}`);
  next_button.classList.toggle("active");
}
