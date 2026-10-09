let money = 0;
let autoFlag = false;
let autoTimer = null;
const clickUpgrade = {power : 1, cost : 5};
const autoUpgrade = {power : 1, cost : 5};
const clickButton= document.getElementById("clickButton");
const clickUpgradeButton = document.getElementById("clickUpgradeButton");
const autoButton = document.getElementById("autoButton");
const autoUpgradeButton = document.getElementById("autoUpgradeButton");
const moneyMessage = document.getElementById("moneyMessage");
const clickUpgradeMessage = document.getElementById("clickUpgradeMessage");
const autoUpgradeMessage = document.getElementById("autoUpgradeMessage");
const clickPowerMessage = document.getElementById("clickPowerMessage");
const autoPowerMessage = document.getElementById("autoPowerMessage");

//UIの画面更新するための関数
function updateMessage() {
    moneyMessage.textContent = `所持金：${money}円`;
    clickPowerMessage.textContent = `クリックパワー：${clickUpgrade.power}Lv`;
    autoPowerMessage.textContent = `オートパワー：${autoUpgrade.power}Lv`;
    clickUpgradeMessage.textContent = `コスト：${clickUpgrade.cost}円必要`;
    autoUpgradeMessage.textContent = `コスト：${autoUpgrade.cost}円必要`;
    colorChange(clickUpgrade.cost, clickUpgradeMessage)
    colorChange(autoUpgrade.cost, autoUpgradeMessage)
}
function colorChange(cost, message){
    if (money >= cost) {
        message.style.color = "yellow";
    } else {
        message.style.color = "red";
    }
}

//クリック判定
clickButton.addEventListener("click", function () {
    money = money + clickUpgrade.power;
    updateMessage();
});
autoButton.addEventListener("click", function () {
    autoFlag = !autoFlag;
    if (autoFlag === true) {
        autoButton.style.color = "green";
        autoTimer = setInterval(function () {
            money = money + autoUpgrade.power;
            updateMessage();
        }, 1000);
    } else {
        clearInterval(autoTimer);
        autoTimer = null;
        autoButton.style.color = "red";
    }
})

//アップグレードするための関数
function updateUpgrade(upgrade, button){
    button.addEventListener("click", function () {
        if (money >= upgrade.cost) {
            money = money - upgrade.cost;
            upgrade.cost = Math.round(upgrade.cost * 1.5);
            upgrade.power = upgrade.power + 2;
            updateMessage();
        } else {
            alert("所持金不足")
        }
    });    
}

updateUpgrade(clickUpgrade, clickUpgradeButton);
updateUpgrade(autoUpgrade, autoUpgradeButton);
updateMessage();
