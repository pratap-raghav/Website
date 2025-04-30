// Make the window draggable
const windowEl = document.getElementById("projectWindow");
const headerEl = document.getElementById("windowHeader");

let offsetX = 0, offsetY = 0, isDragging = false;

headerEl.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - windowEl.offsetLeft;
  offsetY = e.clientY - windowEl.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  windowEl.style.left = `${e.clientX - offsetX}px`;
  windowEl.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
