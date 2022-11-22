let inputList = document.body.querySelectorAll ("button");

for (let i = 0; i<inputList.length; i++) {
  if (!isNaN(inputList[i].innerHTML)) {
    inputList[i].addEventListener("click", e => {
      let outputDisplay = document.body.querySelector(".current-output").innerHTML;
      if (outputDisplay!=0) {
        outputDisplay += e.target.innerHTML;
        outputDisplay = outputDisplay.replace(/\s/g, "");
        document.body.querySelector(".current-output").innerHTML = outputDisplay;
      } else {
        document.body.querySelector(".current-output").innerHTML = e.target.innerHTML;
      }

    })
  } 
}

ac.addEventListener("click", () => {
  document.body.querySelector(".current-output").innerHTML = "0";
  document.body.querySelector(".previous-output").innerHTML = "";
})

del.addEventListener("click", () => {
  let outputDisplay = document.body.querySelector(".current-output").innerHTML;
  if (outputDisplay!=0) { 
    if (outputDisplay.trim().length==1) {
      document.body.querySelector(".current-output").innerHTML = "0";
    } else {   
      outputDisplay = outputDisplay.slice(0, outputDisplay.length - 1)
      document.body.querySelector(".current-output").innerHTML = outputDisplay;
    }
  }
 } 
)

dot.addEventListener ("click", () => {
  let outputDisplay = document.body.querySelector(".current-output").innerHTML;
  if (!outputDisplay.includes(".") && outputDisplay!= "") {
    outputDisplay += ".";
    document.body.querySelector(".current-output").innerHTML = outputDisplay;
  }
 }
)

let operandList = document.body.querySelectorAll(".operand")


for (let c = 0; c<operandList.length; c++) {
  operandList[c].addEventListener ("click", e => {
    let outputDisplay = document.body.querySelector(".current-output").innerHTML; 
    if (outputDisplay!=0 && outputDisplay!= "") {
    let previousOutput = document.body.querySelector(".previous-output").innerHTML;
    let operand = e.target.innerHTML;
    if (!previousOutput) {
      previousOutput = outputDisplay + operand;
      document.body.querySelector(".previous-output").innerHTML = previousOutput;
      document.body.querySelector(".current-output").innerHTML = "";
    } else {
      let result = previousOutput + outputDisplay;
      console.log(outputDisplay);
      result = eval(result);
      console.log(result);
      document.body.querySelector(".previous-output").innerHTML = result + operand;
      document.body.querySelector(".current-output").innerHTML = "";
    }
   }
  }
 )
}

equal.addEventListener ("click", e => {
  let previousOutput = document.body.querySelector(".previous-output").innerHTML;
  let outputDisplay = document.body.querySelector(".current-output").innerHTML; 
  if (previousOutput && outputDisplay) { 
    let result = previousOutput + outputDisplay;
    console.log(outputDisplay);
    result = eval(result);
    console.log(result);
    document.body.querySelector(".previous-output").innerHTML = ""
    document.body.querySelector(".current-output").innerHTML = result;
    
  }
})




