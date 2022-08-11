import React from "react";

export default class IconComponents{

  // arrow redo outline
  static ArrowIcon(){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Arrow Redo</title><path d="M448 256L272 88v96C103.57 184 64 304.77 64 424c48.61-62.24 91.6-96 208-96v96z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }

  // checkmark circle outline
  static Checkmark(){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon checkmark" viewBox="0 0 512 512"><title>Checkmark Circle</title><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="whie" strokeMiterlimit="10" strokeWidth="32"/><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M352 176L217.6 336 160 272"/></svg>
    )
  }

  // chevron down outline
  static ExpandDownIcon(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Chevron Down</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/></svg>
    )
  }

  // close circle outline
  static CircleCrossIcon(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Close Circle</title><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 320L192 192M192 320l128-128"/></svg>
    )
  }

  // cube outline
  static Cube(){

    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="cube-icon" viewBox="0 0 512 512"><title>Cube</title><path d="M448 341.37V170.61A32 32 0 00432.11 143l-152-88.46a47.94 47.94 0 00-48.24 0L79.89 143A32 32 0 0064 170.61v170.76A32 32 0 0079.89 369l152 88.46a48 48 0 0048.24 0l152-88.46A32 32 0 00448 341.37z" fill="white" stroke="#1B74E4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path fill="none" stroke="#1B74E4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M69 153.99l187 110 187-110M256 463.99v-200"/></svg>
    )
  }

  // elipsis horizontal outline
  static DotsIcon(){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Ellipsis Horizontal</title><circle cx="256" cy="256" r="32" fill="black" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><circle cx="416" cy="256" r="32" fill="black" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><circle cx="96" cy="256" r="32" fill="black" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/></svg>
    )
  }

  // folder outline
  static FolderIcon(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Folder</title><path d="M440 432H72a40 40 0 01-40-40V120a40 40 0 0140-40h75.89a40 40 0 0122.19 6.72l27.84 18.56a40 40 0 0022.19 6.72H440a40 40 0 0140 40v240a40 40 0 01-40 40zM32 192h448" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }

  // globe outline
  static GlobeIcon(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Globe</title><path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32" d="M256 48v416M464 256H48"/></svg>
    )
  }

  // info circle outline
  static InfoIcon(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Information Circle</title><path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M220 220h32v116"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M208 340h88"/><path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"/></svg>
    )
  }

  // open outline
  static OpenOutline(){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className="open-icon" viewBox="0 0 512 512"><title>Open</title><path d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48M336 64h112v112M224 288L440 72" fill="none" stroke="lightslategray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }
  

  // thumbs up outline
  static ThumbUpIcon({fill = "none", stroke="currentColor"}){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Thumbs Up</title><path d="M320 458.16S304 464 256 464s-74-16-96-32H96a64 64 0 01-64-64v-48a64 64 0 0164-64h30a32.34 32.34 0 0027.37-15.4S162 221.81 188 176.78 264 64 272 48c29 0 43 22 34 47.71-10.28 29.39-23.71 54.38-27.46 87.09-.54 4.78 3.14 12 7.95 12L416 205" fill={fill} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M416 271l-80-2c-20-1.84-32-12.4-32-30h0c0-17.6 14-28.84 32-30l80-4c17.6 0 32 16.4 32 34v.17A32 32 0 01416 271zM448 336l-112-2c-18-.84-32-12.41-32-30h0c0-17.61 14-28.86 32-30l112-2a32.1 32.1 0 0132 32h0a32.1 32.1 0 01-32 32zM400 464l-64-3c-21-1.84-32-11.4-32-29h0c0-17.6 14.4-30 32-30l64-2a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32zM432 400l-96-2c-19-.84-32-12.4-32-30h0c0-17.6 13-28.84 32-30l96-2a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32z" fill={fill} stroke={stroke} strokeMiterlimit="10" strokeWidth="32"/></svg>
    )
  }

  // chat bubble outline
  static ChatBubbleIcon(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Chatbubble</title><path d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"/></svg>
    )
  }

  // return down forward outline
  static ReturnbDownForwardIcon(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Return Down Forward</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M400 352l64-64-64-64"/><path d="M448 288H154c-58.76 0-106-49.33-106-108v-20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }

  // return up forward outline
  static ReturnUpForwardIcon(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Return Up Forward</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M400 160l64 64-64 64"/><path d="M448 224H154c-58.76 0-106 49.33-106 108v20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }

  // notification outline
  static BellIcon(){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Notifications</title><path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }

  // loading icon
  static LoadingIcon({iconClass = "", color = "black"}){
    return (
      <svg className={`inline-icon ${iconClass}`} version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve"><path fill={color} d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"><animateTransform attributeName="transform" attributeType="XML" type="rotate"dur="1s" from="0 50 50"to="360 50 50" repeatCount="indefinite" /></path></svg>
    )
  }

  // attach outline
  static AttachIcon({iconClass = ""}){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`inline-icon ${iconClass}`} viewBox="0 0 512 512"><title>Attach</title><path d="M216.08 192v143.85a40.08 40.08 0 0080.15 0l.13-188.55a67.94 67.94 0 10-135.87 0v189.82a95.51 95.51 0 10191 0V159.74" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"/></svg>
    )
  }

  //document text outline
  static DocumnetIcon({iconClass = ""}){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`inline-icon ${iconClass}`} viewBox="0 0 512 512"><title>Document Text</title><path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M256 56v120a32 32 0 0032 32h120M176 288h160M176 368h160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }

  // videocam outline
  static VideoIcon({iconClass = ""}){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`inline-icon ${iconClass}`} viewBox="0 0 512 512"><title>Videocam</title><path d="M374.79 308.78L457.5 367a16 16 0 0022.5-14.62V159.62A16 16 0 00457.5 145l-82.71 58.22A16 16 0 00368 216.3v79.4a16 16 0 006.79 13.08z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M268 384H84a52.15 52.15 0 01-52-52V180a52.15 52.15 0 0152-52h184.48A51.68 51.68 0 01320 179.52V332a52.15 52.15 0 01-52 52z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/></svg>
    )
  }

  // images outline
  static ImagesIcon({iconClass = ""}){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`inline-icon ${iconClass}`} viewBox="0 0 512 512"><title>Images</title><path d="M432 112V96a48.14 48.14 0 00-48-48H64a48.14 48.14 0 00-48 48v256a48.14 48.14 0 0048 48h16" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><rect x="96" y="128" width="400" height="336" rx="45.99" ry="45.99" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><ellipse cx="372.92" cy="219.64" rx="30.77" ry="30.55" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/><path d="M342.15 372.17L255 285.78a30.93 30.93 0 00-42.18-1.21L96 387.64M265.23 464l118.59-117.73a31 31 0 0141.46-1.87L496 402.91" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }

  static GoogleIcon({iconClass = ""}){
    return(
      <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" className={iconClass}><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
    )
  }

  static LinkedInIcon({iconClass = "", color = "white"}){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={iconClass}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill={color}/></svg>
    )
  }

  static FaceBookIcon({iconClass = "", color = "white"}){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={iconClass}><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" fill={color}/></svg>
    )
  }

  static HomeIcon({iconClass = "", color = "black"}){
    return(
      <svg xmlns="http://www.w3.org/2000/svg" className={`inline-icon ${iconClass}`} viewBox="0 0 512 512"><title>Home</title><path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }

  static UserIcon({iconClass = "", color = "black"}){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`inline-icon ${iconClass}`} viewBox="0 0 512 512"><title>Person</title><path d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z" fill="none" stroke={color} strokeMiterlimit="10" strokeWidth="32"/></svg>
    )
  }

  static TrashIcon({iconClass = "", color = "red"}){
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className={`inline-icon ${iconClass}`} viewBox="0 0 512 512"><title>Trash</title><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path stroke={color} strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
    )
  }
}