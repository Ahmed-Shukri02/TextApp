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
    static ThumbUpIcon(){
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Thumbs Up</title><path d="M320 458.16S304 464 256 464s-74-16-96-32H96a64 64 0 01-64-64v-48a64 64 0 0164-64h30a32.34 32.34 0 0027.37-15.4S162 221.81 188 176.78 264 64 272 48c29 0 43 22 34 47.71-10.28 29.39-23.71 54.38-27.46 87.09-.54 4.78 3.14 12 7.95 12L416 205" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path d="M416 271l-80-2c-20-1.84-32-12.4-32-30h0c0-17.6 14-28.84 32-30l80-4c17.6 0 32 16.4 32 34v.17A32 32 0 01416 271zM448 336l-112-2c-18-.84-32-12.41-32-30h0c0-17.61 14-28.86 32-30l112-2a32.1 32.1 0 0132 32h0a32.1 32.1 0 01-32 32zM400 464l-64-3c-21-1.84-32-11.4-32-29h0c0-17.6 14.4-30 32-30l64-2a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32zM432 400l-96-2c-19-.84-32-12.4-32-30h0c0-17.6 13-28.84 32-30l96-2a32.09 32.09 0 0132 32h0a32.09 32.09 0 01-32 32z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"/></svg>
        )
    }

    // chat bubble outline
    static ChatBubbleIcon(){
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-icon" viewBox="0 0 512 512"><title>Chatbubble</title><path d="M87.49 380c1.19-4.38-1.44-10.47-3.95-14.86a44.86 44.86 0 00-2.54-3.8 199.81 199.81 0 01-33-110C47.65 139.09 140.73 48 255.83 48 356.21 48 440 117.54 459.58 209.85a199 199 0 014.42 41.64c0 112.41-89.49 204.93-204.59 204.93-18.3 0-43-4.6-56.47-8.37s-26.92-8.77-30.39-10.11a31.09 31.09 0 00-11.12-2.07 30.71 30.71 0 00-12.09 2.43l-67.83 24.48a16 16 0 01-4.67 1.22 9.6 9.6 0 01-9.57-9.74 15.85 15.85 0 01.6-3.29z" fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"/></svg>
        )
    }

}