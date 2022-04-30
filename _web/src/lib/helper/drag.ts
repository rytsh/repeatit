const moveElement = (move:HTMLElement, Y: boolean, fn: (ch: number)=>void, down: ()=>void) => {
  let pos = 0;
  let posChange = 0;

  move.onmousedown = dragMouseDown;

  function dragMouseDown(e:MouseEvent) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    if (Y) {
      pos = e.clientY;
    } else {
      pos = e.clientX;
    }
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    down();
  }

  function elementDrag(e:MouseEvent) {
    e.preventDefault();
    // calculate the new cursor position:
    if (Y) {
      posChange = pos - e.clientY;
      pos = e.clientY;
    } else {
      posChange = pos - e.clientX;
      pos = e.clientX;
    }
    // set the element's new position:
    fn(posChange);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
};

export { moveElement };
