let previewButtonList = document.getElementsByClassName("preview-button");
let mainStyleSheet = document.styleSheets[0];

for (let i = 0; i<previewButtonList.length; i++) {
  let previewButton = previewButtonList[i];
  previewButton.insertAdjacentHTML ("afterend", '<button type="button">STOP</button>');
  let stopButton = previewButtonList[i].nextElementSibling;
  stopButton.setAttribute("class", "d-none");
  stopButton.style.width = previewButton.offsetWidth + "px";
  let previewWindow = stopButton.nextElementSibling;
  openPreview (previewButton, stopButton, previewWindow);
}


function openPreview (previewButton, stopButton, previewWindow) {
  previewButton.onclick = () => {
    previewWindow.style.display = "inline-block";
    stopButton.setAttribute("class", "d-inline-block preview-button btn btn-outline-light main-preview-btn p-1");
    previewButton.style.display = "none";
    stopButton.focus();
    stopButton.onclick = () => {
      stopButton.setAttribute("class", "d-none");
      previewButton.style.display = "inline-block";
      previewWindow.style.display = "none";
    }
    stopButton.onblur = () => {
      stopButton.setAttribute("class", "d-none");
      previewButton.style.display = "inline-block";
      previewWindow.style.display = "none";
    }
  }
} 


function rgbToArray (color) {
  let rgb = [];
  rgb[0] = color.substring(color.indexOf("(")+1,color.indexOf(","));
  rgb[1] = color.slice(color.indexOf(",")+2, color.lastIndexOf(","));
  rgb[2] = color.slice(color.lastIndexOf(",")+2, color.lastIndexOf(")"));
  return rgb;
}


function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

let bodyColor = getComputedStyle(document.body.firstElementChild).color;
let bodyColorArray = rgbToArray(bodyColor);
let bodyHexColor = rgbToHex(+bodyColorArray[0], +bodyColorArray[1], +bodyColorArray[2]);


let bodyBgColor = getComputedStyle(document.body).backgroundColor;
let bodyBgColorArray = rgbToArray(bodyBgColor);
let bodyBgHexColor = rgbToHex(+bodyBgColorArray[0], +bodyBgColorArray[1], +bodyBgColorArray[2]);

let textSecondary = document.getElementById("textSecondary"); 
let secondaryColor = getComputedStyle(textSecondary).color;
let secondaryColorArray = rgbToArray(secondaryColor);
let secondaryHexColor = rgbToHex(+secondaryColorArray[0], +secondaryColorArray[1], +secondaryColorArray[2]);

let defaultColorPrimary = bodyBgHexColor;
let defaultColorLight = bodyHexColor;
let defaultColorSecondary = secondaryHexColor;


function getSimilarColor(color) {
  var p = 1,
      temp,
      random = Math.random(),
      result = '#';

  while (p < color.length) {
      sliced = color.slice(p, p += 2);
      temp = parseInt(sliced, 16) 
      temp += Math.floor((255 - temp) * random);
      result += temp.toString(16).padStart(2, '0');
  }
  return result;
}

function getInvertColor(hex) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    let randomHex = '#' + Math.floor(Math.random()*16777215).toString(16);
    getInvertColor(randomHex);
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function searchAndReplace (classname, style) {
  let classList = document.getElementsByClassName(classname)
  for (let li of classList) {
    li.style.cssText = style;
  }
}

colorChanger.onclick = () => { 
  toDefault.setAttribute("class", "d-inline-box")
  let randomColorPrimary = '#' + Math.floor(Math.random()*16777215).toString(16);
  let randomColorLight = getInvertColor(randomColorPrimary);
  let randomColorSecondary = getSimilarColor(randomColorLight);

  let bg_style = 'background-color:' + randomColorPrimary + '!important';
  let text_style = 'color:' + randomColorLight + '!important';
  let secondary_style = 'color:' + randomColorSecondary + '!important';
  
  let border_style = 'border-color:' + randomColorLight + '!important';

  searchAndReplace("bg-primary", bg_style );  

  searchAndReplace("text-light", text_style );

  searchAndReplace("text-secondary", secondary_style );

  searchAndReplace("header-contact-icon-svg", 'fill:' + randomColorLight + '!important');

  searchAndReplace("bg-light", 'background-color:' + randomColorLight + '!important');

  searchAndReplace("btn-outline-light", border_style);

  searchAndReplace("border-light", border_style);


  mainStyleSheet.insertRule('::-moz-selection { background-color:' +  randomColorLight +';color:' + randomColorPrimary + ';}', mainStyleSheet.cssRules.length);
  mainStyleSheet.insertRule('::selection { background-color:' +  randomColorLight +';color:' + randomColorPrimary + ';}', mainStyleSheet.cssRules.length);

}

toDefault.onclick = () => {
  let bg_style = 'background-color:' + defaultColorPrimary + '!important';
  let text_style = 'color:' + defaultColorLight + '!important';
  let secondary_style = 'color:' + defaultColorSecondary + '!important';
  let border_style = 'border-color:' + defaultColorSecondary + '!important';

  searchAndReplace("bg-primary", bg_style );  

  searchAndReplace("text-light", text_style );

  searchAndReplace("text-secondary", secondary_style );

  searchAndReplace("header-contact-icon-svg", 'fill:' + defaultColorLight + '!important');

  searchAndReplace("bg-light", 'background-color:' + defaultColorLight + '!important');

  searchAndReplace("btn-outline-light", border_style);

  searchAndReplace("border-light", border_style);

  toDefault.setAttribute("class", "d-none");


  mainStyleSheet.insertRule('::-moz-selection { background-color:' +  defaultColorLight +';color:' + defaultColorPrimary + ';}', mainStyleSheet.cssRules.length);

  mainStyleSheet.insertRule('::selection { background-color:' +  defaultColorLight +';color:' + defaultColorPrimary + ';}', mainStyleSheet.cssRules.length);
}









  







