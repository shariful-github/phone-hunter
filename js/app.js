const displayPhones = (phones) =>{
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <div class="bg-info bg-opacity-10 h-90vh rounded rounded-3 d-flex justify-content-center align-items-center">
                <div class="w-75 h-75">
                    <img class="rounded rounded-4 w-100 h-100" src="${phone.image}" class="card-img-top" alt="...">
                </div>    
                </div>
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold">${phone.phone_name}</h4>
                    <p class="card-text text-secondary">There are many variations of passages of available, but the majority have suffered</p>
                    <h4 class="fw-bold">$999</h4>
                    <button id="btn-search" class="btn btn-primary px-4 py-3 mt-2 fw-semibold">Show Details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
}

const loadPhones = async (searchKey) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchKey}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

document.getElementById('btn-search').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhones(searchText);
})

document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementById('btn-search').click();
    }
})

loadPhones('iphone');