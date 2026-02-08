function saveData() {
    const data = {
      base: baseArray,
      protein: proteinArray,
      veg: vegArray
    };
    localStorage.setItem("fridgeData", JSON.stringify(data));
  }
  
  function loadData() {
    const stored = localStorage.getItem("fridgeData");
    if (!stored) return;
  
    const data = JSON.parse(stored);
    baseArray = data.base || [];
    proteinArray = data.protein || [];
    vegArray = data.veg || [];
  }
  function renderList(listElement, array, type) {
    listElement.innerHTML = "";
  
    array.forEach((item, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const deleteBtn = document.createElement("button");
  
      span.textContent = item;
      deleteBtn.textContent = "delete";
  
      li.appendChild(span);
      li.appendChild(deleteBtn);
      listElement.appendChild(li);
  
      deleteBtn.addEventListener("click", () => {
        array.splice(index, 1);
        saveData();
        renderAll();
      });
    });
  }
  
  function renderAll() {
    renderList(fridgeBaseList, baseArray);
    renderList(fridgeProteinList, proteinArray);
    renderList(fridgeVegetableList, vegArray);
  }    

const fridgeBaseList = document.getElementById('baseFridge');
const fridgeProteinList=document.getElementById('proteinFridge');
const fridgeVegetableList=document.getElementById('vegFridge');
//Protein Button
const proteinButton = document.getElementById("addProtein");
let proteinArray = [];
proteinButton.addEventListener("click", () => {
    const proteinTextBox = document.getElementById('proteinAdd');
    const proteinValue = proteinTextBox.value.trim();
    if (!proteinValue) return;

    proteinTextBox.value = '';
    proteinArray.push(proteinValue);

    saveData();
    renderAll();
}); 

//Base Button
const baseButton=document.getElementById("addBase");
let baseArray = [];
baseButton.addEventListener("click", () => {
    const baseTextBox = document.getElementById('baseAdd');
    const baseValue = baseTextBox.value.trim();
    if (!baseValue) return;

    baseTextBox.value = '';
    baseArray.push(baseValue);

    saveData();
    renderAll();
});

//Vegetable Button
const vegButton=document.getElementById("addVeg");
let vegArray = [];
vegButton.addEventListener("click", () => {
    const vegTextBox = document.getElementById('vegetableAdd');
    const vegValue = vegTextBox.value.trim();
    if (!vegValue) return;

    vegTextBox.value = '';
    vegArray.push(vegValue);

    saveData();
    renderAll();
});

//Code for combining into slop bowl
//create new slopbowl object:
class Bowl{
    constructor(base, protein, vegetable){
    this.base=base;
    this.protein=protein; 
    this.vegetable=vegetable;
    }
}

//function for creating a slopbowl object
const slopButton = document.getElementById("slopButton");
slopButton.addEventListener("click", ()=>{
    //step 0: make a new bowl object:
    let myBowl= new Bowl;
    //step 1.1: randomly select a base:
    let randomNum=Math.floor(Math.random()*baseArray.length);
    //sep 1.2 add that base to the bowl object:
    myBowl.base=baseArray[randomNum];
    //step 2.1: randomly select a protein:
    randomNum=Math.floor(Math.random()*proteinArray.length);
    //step 2.2: add that protein to the bowl object:
    myBowl.protein=proteinArray[randomNum];
    //step 3.1: randomly select a vegetable:
    randomNum=Math.floor(Math.random()*vegArray.length);
    //step 3.2: add the vegetable to the protein obejct
    myBowl.vegetable=vegArray[randomNum];
    //return the slop bowl:
    let slopTextBox=document.getElementById('slopText');
    slopTextBox.textContent=`Here is a bowl with ${myBowl.base}, ${myBowl.protein}, and ${myBowl.vegetable}`;
    }
);

loadData();
renderAll();
