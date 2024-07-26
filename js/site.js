//get the values from the user//
function getValues() {
  let loanAmount = document.getElementById("loanAmount").value;
  let termMonths = document.getElementById("termMonths").value;
  let interestRate = document.getElementById("interestRate").value;

  //validate the input//
  loanAmount = parseFloat(loanAmount);
  termMonths = parseInt(termMonths);

  // get Interest Rate Value in decimal form
  interestRate = parseFloat(interestRate) / 100;

  if (Number.parseFloat(loanAmount) && Number.isInteger(termMonths) && Number.parseFloat(interestRate)) {
    //Display Data or else statement
    let Values = displayValues(loanAmount, termMonths, interestRate);
    return Values;
  } else {
    alert("Please enter a valid number");
  }
}

//calculate fixed payemnt math.pow accept two parameters
function MonthlyPayment(loanAmount, termMonths, interestRate) {
  let base = interestRate / 12;
  let generateMonthlyPayment = (loanAmount * base) / (1 - Math.pow(1 + base, -termMonths));
  return generateMonthlyPayment;
}

function displayValues(loanAmount, termMonths, interestRate) {
  let generateMonthlyPayment = MonthlyPayment(loanAmount, termMonths, interestRate);
  let TotalInterest = 0;
  let balance = loanAmount;

  //loop over the data and display them
  for (let month = 1; month <= termMonths; month++) {

    //Interest Payment = Previous Remaining Balance * rate/1200
    let interestPayment = balance * (interestRate / 12);
    //Principal Payment = Total Monthly Payment - Interest Payment
    let principalPayment = generateMonthlyPayment - interestPayment;
    //At the end of each month, Remaining Balance = Previous Remaining Balance - Principal Payment
    balance -= principalPayment;
    TotalInterest += interestPayment;

    //contentcloneNode(true) creates the children of a node and return the clone true
    let template = document.getElementById("Data-template").content.cloneNode(true);

    //access the HTML element 
    template.querySelector("[data-month]").textContent = month;
    template.querySelector("[data-payment]").textContent = "$" + generateMonthlyPayment.toFixed(2).toLocaleString();
    template.querySelector("[data-principal]").textContent = "$" + principalPayment.toFixed(2).toLocaleString();
    template.querySelector("[data-interest]").textContent = "$" + interestPayment.toFixed(2).toLocaleString();
    template.querySelector("[data-TotalInterest]").textContent = "$" + TotalInterest.toFixed(2).toLocaleString();
    template.querySelector("[data-balance").textContent = "$" + balance.toFixed(2).toLocaleString();

    //append the data from DataBody
    DataBody.appendChild(template);

    if (month >= termMonths) {

      let loanAmount = TotalPrincipal;
      let TotalBalance = TotalPrincipal += TotalInterest;

      // get element from HTML from Monthly Payment Data id of generatemonthlypayment 
      // control the decimal to 2 at the end and return a 'toLocaleString'
      document.getElementById("TotalPrincipal").innerHTML = "$" + loanAmount.toFixed(2).toLocaleString();
      document.getElementById("TotalInterest").innerHTML = "$" + TotalInterest.toFixed(2).toLocaleString();
      document.getElementById("TotalCost").innerHTML = "$" + TotalBalance.toFixed(2).toLocaleString();
      document.getElementById("generateMonthlyPayment").innerHTML = "$" + generateMonthlyPayment.toFixed(2).toLocaleString();
    }
  }
}