const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btnIdentify = document.getElementById("btnIdentify");
const dropdownMenu = document.getElementById("dropdownMenu");
const sortLabel = document.querySelector('label[for="dropdownMenu"]');
const tbl = document.getElementById("tblNumbers");

let total = 0;
let numbersArr = [];
let highest = null;
let lowest = null;

btn1.addEventListener("click", () => {
    const txtNumber = document.getElementById("txtNum").value;
    let regex = /^[0-9]+$/;
    
    if (txtNumber.match(regex)) {
        let num = parseInt(txtNumber);
        numbersArr.push(num);
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a valid number");
        document.getElementById("txtNum").value = "";
        return;
    }
    iterateNumbers();
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;
    highest = null;
    lowest = null;
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }
    btn3.style.display = "none";
    btn4.style.display = "none";
    btnIdentify.style.display = "none";
    dropdownMenu.style.display = "none";
    sortLabel.style.display = "none";
});

btn4.addEventListener("click", () => {
    total = numbersArr.reduce((sum, num) => sum + num, 0);
    iterateNumbers();
});

btnIdentify.addEventListener("click", () => {
    if (numbersArr.length === 0) return;
    highest = Math.max(...numbersArr);
    lowest = Math.min(...numbersArr);
    iterateNumbers();
});

dropdownMenu.addEventListener("change", () => {
    if (dropdownMenu.value === "asc") {
        numbersArr.sort((a, b) => a - b);
    } else if (dropdownMenu.value === "desc") {
        numbersArr.sort((a, b) => b - a);
    }
    iterateNumbers();
});

function iterateNumbers() {
    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if (numbersArr.length > 0) {
        numbersArr.forEach((num, i) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.innerHTML = num;
            td2.innerHTML = num % 2 === 0 ? "EVEN" : "ODD";
            td2.style.color = num % 2 === 0 ? "green" : "blue";

            btnDelete.innerHTML = "Remove";
            btnDelete.onclick = () => deleteNumber(i);
            btnEdit.innerHTML = "Edit";
            btnEdit.onclick = () => editNumber(i);
            
            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbl.appendChild(tr);
        });

        if (highest !== null && lowest !== null) {
            const trSummary = document.createElement("tr");
            const tdHighest = document.createElement("td");
            const tdLowest = document.createElement("td");
            tdHighest.colSpan = 4;
            tdLowest.colSpan = 4;

            tdHighest.innerHTML = `<strong>HIGHEST</strong> ${highest}`;
            tdLowest.innerHTML = `<strong>LOWEST</strong> ${lowest}`;

            trSummary.appendChild(tdHighest);
            tbl.appendChild(trSummary);
            
            const trLowest = document.createElement("tr");
            trLowest.appendChild(tdLowest);
            tbl.appendChild(trLowest);
        }

        if (total > 0) {
            const trTotal = document.createElement("tr");
            const tdTotalLabel = document.createElement("td");
            const tdTotalValue = document.createElement("td");
            tdTotalLabel.colSpan = 4;
            tdTotalValue.colSpan = 4;

            tdTotalLabel.innerHTML = `<strong>TOTAL</strong> ${total}`;

            trTotal.appendChild(tdTotalLabel);
            trTotal.appendChild(tdTotalValue);
            tbl.appendChild(trTotal);
        }

        btn3.style.display = "inline";
        btn4.style.display = "inline";
        btnIdentify.style.display = "inline";
        dropdownMenu.style.display = "inline";
        sortLabel.style.display = "inline";
    } else {
        total = 0;
        btn3.style.display = "none";
        btn4.style.display = "none";
        btnIdentify.style.display = "none";
        dropdownMenu.style.display = "none";
        sortLabel.style.display = "none";
    }
}

function deleteNumber(i) {
    numbersArr.splice(i, 1);
    iterateNumbers();
}

function editNumber(i) {
    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    let regex = /^[0-9]+$/;
    
    if (editTxt && editTxt.match(regex)) {
        numbersArr[i] = parseInt(editTxt);
        iterateNumbers();
    } else {
        alert("Invalid number input!");
    }
}