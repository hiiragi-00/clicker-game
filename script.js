let money = 0;
let autoFlag = false;
let autoTimer = null;
const clickUpgrade = { power: 1, cost: 5 };
const autoUpgrade = { power: 1, cost: 5 };
const clickButton = document.getElementById("clickButton");
const clickUpgradeButton = document.getElementById("clickUpgradeButton");
const autoButton = document.getElementById("autoButton");
const autoUpgradeButton = document.getElementById("autoUpgradeButton");
const moneyMessage = document.getElementById("moneyMessage");
const clickUpgradeMessage = document.getElementById("clickUpgradeMessage");
const autoUpgradeMessage = document.getElementById("autoUpgradeMessage");
const clickPowerMessage = document.getElementById("clickPowerMessage");
const autoPowerMessage = document.getElementById("autoPowerMessage");
const deleteDataButton = document.getElementById("deleteDataButton");
const clickSound = new Audio("./決定ボタンを押す42.mp3");

//UIの画面更新するための関数
function updateMessage() {
    moneyMessage.textContent = `所持金：${money}円`;
    clickPowerMessage.textContent = `クリックパワー：${clickUpgrade.power}Lv`;
    autoPowerMessage.textContent = `オートパワー：${autoUpgrade.power}Lv`;
    clickUpgradeMessage.textContent = `クリックアップグレード：${clickUpgrade.cost}円必要`;
    autoUpgradeMessage.textContent = `オートアップグレード：${autoUpgrade.cost}円必要`;
    colorChange(clickUpgrade.cost, clickUpgradeMessage)
    colorChange(autoUpgrade.cost, autoUpgradeMessage)
    save();
}
function colorChange(cost, message) {
    if (money >= cost) {
        message.style.color = "yellow";
    } else {
        message.style.color = "red";
    }
}

//クリック判定
clickButton.addEventListener("click", function () {
    money = money + clickUpgrade.power;
    playSound();
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

//クリック音の関数
function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

//アップグレードするための関数
function updateUpgrade(upgrade, button) {
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

//セーブするための関数
function save() {
    const obj = {
        money,
        clickUpgrade,
        autoUpgrade
    };
    const jsonString = JSON.stringify(obj);
    localStorage.setItem("userData", jsonString);
}
//読み込むための関数
function load() {
    const saveData = localStorage.getItem("userData");
    if (saveData !== null) {
        const loadData = JSON.parse(saveData);
        money = loadData.money;
        clickUpgrade.power = loadData.clickUpgrade.power;
        clickUpgrade.cost = loadData.clickUpgrade.cost;
        autoUpgrade.power = loadData.autoUpgrade.power;
        autoUpgrade.cost = loadData.autoUpgrade.cost;
    }
}
//データ削除
deleteDataButton.addEventListener("click", function () {
    const result = confirm("データ削除");
    if (result) {
        localStorage.removeItem("userData");
        money = 0;
        clickUpgrade.power = 1;
        clickUpgrade.cost = 5;
        autoUpgrade.power = 1;
        autoUpgrade.cost = 5;
        updateMessage();

    }
});

load();
updateUpgrade(clickUpgrade, clickUpgradeButton);
updateUpgrade(autoUpgrade, autoUpgradeButton);
updateMessage();






