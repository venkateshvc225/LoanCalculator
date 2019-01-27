//listen to form submit
document.getElementById('loan-form').addEventListener('submit',calculateLoanAmount);

//calculating loan amount
function calculateLoanAmount(e){

    //input variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    //Output area
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    }else{
        showError('Please check your numbers');
    }
    e.preventDefault();
}

//show error
function showError(errorMsg){
    //creating div element to display error message
    const errorDiv = document.createElement('div');
    //Add class
    errorDiv.className = 'alert alert-danger';
   /*  Add error message
    errorDiv.textContent = errorMsg; */
    //or create text node 
    errorDiv.appendChild(document.createTextNode(errorMsg));
    //grab  element
    const card = document.querySelector('.card');
    const headingText = document.querySelector('.heading');
    //Append error div element above heading
    card.insertBefore(errorDiv,headingText);

    //clear error after 2 seconds
    setTimeout(clearError,3000);
}

//clear error message
function clearError(){
    document.querySelector('.alert').remove();
}