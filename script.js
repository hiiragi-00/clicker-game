let money = 0;
const moneyButton = document.getElementById("moneyButton");
const moneyMessage = document.getElementById("moneyMessage");

moneyButton.addEventListener("click", function(){
money = money + 1;
moneyMessage.textContent = `${money}円`;
});