const currency_one=document.querySelector("#currency1");
const currency_two=document.querySelector("#currency2");
const amount=document.querySelector("#amount");
const calcBtn=document.querySelector("#calcBtn");
const result=document.querySelector("#result");
const list1=document.querySelector("#currencyList1");
const list2=document.querySelector("#currencyList2");


const apiKey="3ccda04d79a431da5abec148";
const url="https://v6.exchangerate-api.com/v6/"+apiKey;


 async function displayCurrencyList(){
    const response=await fetch(url+"/codes");

    const data= await response.json();

    const items= data.supported_codes;

    var options;

    for (var item of items) {
        options+=`<option value=${item[0]}>${item[0]} ${item[1]}</option>`
    }
    list1.innerHTML=options;
    list2.innerHTML=options;
 };
displayCurrencyList();

async function calculateCurrency(currency1,currency2,amount){
    const response = await fetch(url+"/latest/"+currency1.value);
    const data=await response.json();
    const latestResult=data.conversion_rates[currency2.value]*amount.value
    return latestResult;
}

calcBtn.addEventListener("click",async ()=>{
    result.innerHTML=``;
    if(currency_one.value==``||currency_two.value==``|| amount.value==``){
        alert("Please fill all boxes");
        currency_one.value=``;
        currency_two.value=``;
        amount.value=``;
    }
    const latestResult= await calculateCurrency(currency_one,currency_two,amount)
    result.innerHTML=`  <div class="container p-3 text-center " style="font-size:25px;">
                            ${amount.value} ${currency_one.value}  = ${latestResult} ${currency_two.value}                    
                        </div>`;
});
    
