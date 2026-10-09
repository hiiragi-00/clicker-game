let money = 0;
let upgradePower = 1;
let upgradeCost = 10;
const moneyButton = document.getElementById("moneyButton");
const moneyMessage = document.getElementById("moneyMessage");
const upgradeButton = document.getElementById("upgradeButton");
const upgradeMessage = document.getElementById("upgradeMessage");
const powerMessage = document.getElementById("powerMessage");
 
function updateMessage() {
    moneyMessage.textContent = `所持金：${money}円`;
    powerMessage.textContent = `パワー：${upgradePower}Lv`;
    upgradeMessage.textContent = `コスト：${upgradeCost}円必要`;
    if (money >= upgradeCost) {
        upgradeMessage.style.color = " yellow";
    }else{
        upgradeMessage.style.color = "red";
    }
}

moneyButton.addEventListener("click", function () {
    money = money + upgradePower;
    updateMessage();
});

upgradeButton.addEventListener("click", function () {
    if (money >= upgradeCost) {
        money = money - upgradeCost;
        upgradeCost = Math.round(upgradeCost * 1.5);
        upgradePower = upgradePower + 2;
        updateMessage();
    }
});

updateMessage();