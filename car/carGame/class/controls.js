class Controls {
  constructor() {
    this.#addKeyboardListenersAndSetKeys()
    this.keys = {
      'ArrowUp':false,
      'ArrowDown':false,
      'ArrowRight':false,
      'ArrowLeft':false,
      ' ':false
    }
    this.f = new Functions()
  }

  #addKeyboardListenersAndSetKeys() {
    document.onkeydown=e=>this.keys[e.key]=true
    document.onkeyup=e=>this.keys[e.key]=false
  }
}