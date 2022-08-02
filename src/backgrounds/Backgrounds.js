
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

}