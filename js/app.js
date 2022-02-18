const form = document.querySelector("#loan-form");
const loader = document.querySelector("#loader");
const btn = document.querySelector("button");
const output = document.querySelector("#output");

output.style.display = 'none';
loader.style.display = 'none';

form.addEventListener("submit", (e) => {
    loader.style.display = 'block';

    setTimeout(calculateResults, 1000);

    e.preventDefault();
});




function calculateResults(e) {
    const amount = document.querySelector("#amount"); // сумма кредита
    const interest = document.querySelector("#interest"); // прцент кредита
    const years = document.querySelector("#years"); //срок кредита

    const monthlyPayment = document.querySelector('#monthly-payment'); // месячный платеж
    const totalPayment = document.querySelector('#total-payment'); // итого
    const totalInterest = document.querySelector('#total-interest'); //Итого процентная ставка

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

        loader.style.display = 'none';
        output.style.display = 'block';


    } else {
        loader.style.display = 'none';
        errorMessage('Пожалуйста заполните все поля!');
    }

}

function errorMessage(error){
	const errorMes = document.createElement('div');

	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	errorMes.style.background = 'orange';
    errorMes.style.color = 'white';
    errorMes.className = 'mes';

	errorMes.appendChild(document.createTextNode(error));
	card.appendChild(errorMes, heading);


	setTimeout(clearError, 2500);
}
function clearError(){
	document.querySelector('.mes').remove();
}
