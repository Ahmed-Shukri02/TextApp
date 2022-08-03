
export default class Backgrounds{ // returns all backgrounds as base 64 encoded url links

  static urlEncode(svg){
    let encoded = window.btoa(svg)
    console.log(encoded)
    return "url(data:image/svg+xml;base64," +encoded+ ")"
  }

  static LoginBackground(){
    return this.urlEncode(
      '<svg id="visual" viewBox="0 0 960 540" width="960" height="540" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="960" height="540" fill="#fff"></rect><path d="M432 540L444.5 517.5C457 495 482 450 484.8 405C487.7 360 468.3 315 448.3 270C428.3 225 407.7 180 406.8 135C406 90 425 45 434.5 22.5L444 0L960 0L960 22.5C960 45 960 90 960 135C960 180 960 225 960 270C960 315 960 360 960 405C960 450 960 495 960 517.5L960 540Z" fill="#1b74e4"></path><path d="M594 540L589.3 517.5C584.7 495 575.3 450 571.7 405C568 360 570 315 575.7 270C581.3 225 590.7 180 606.3 135C622 90 644 45 655 22.5L666 0L960 0L960 22.5C960 45 960 90 960 135C960 180 960 225 960 270C960 315 960 360 960 405C960 450 960 495 960 517.5L960 540Z" fill="#1767c9"></path><path d="M804 540L789.5 517.5C775 495 746 450 732.7 405C719.3 360 721.7 315 725.7 270C729.7 225 735.3 180 745.7 135C756 90 771 45 778.5 22.5L786 0L960 0L960 22.5C960 45 960 90 960 135C960 180 960 225 960 270C960 315 960 360 960 405C960 450 960 495 960 517.5L960 540Z" fill="#165baf"></path></svg>'
    )
  }

  static LoginBackgroundMobile(){
    return this.urlEncode(
      '<svg id="visual" viewBox="0 0 540 960" width="540" height="960" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="540" height="960" fill="#fff"></rect><defs><linearGradient id="grad1_0" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="30%" stop-color="#ffffff" stop-opacity="1"></stop><stop offset="70%" stop-color="#ffffff" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_0" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="30%" stop-color="#ffffff" stop-opacity="1"></stop><stop offset="70%" stop-color="#ffffff" stop-opacity="1"></stop></linearGradient></defs><g transform="translate(540, 960)"><path d="M-378 0C-369.1 -67.7 -360.1 -135.5 -327.4 -189C-294.6 -242.5 -238 -281.8 -179.5 -310.9C-121 -340 -60.5 -359 0 -378L0 0Z" fill="#1B74E4"></path></g><g transform="translate(0, 0)"><path d="M378 0C359.5 60.8 341 121.5 311.8 180C282.6 238.5 242.7 294.7 189 327.4C135.3 360 67.6 369 0 378L0 0Z" fill="#1B74E4"></path></g></svg>'
    )
  }

}