let data;
// Display Phones===================
const displayPhones = (noOfPhones) =>{
    let phones = data.data;

    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';
    
    // No Phone Found Message & handle show all button
    const notFoundDiv = document.getElementById('not-found-div');
    const btnShowAll = document.getElementById('btn-show-all');
    if(data.status === true){
        notFoundDiv.classList.add('d-none');
    }
    else{
        notFoundDiv.classList.remove('d-none');
    }
    if(noOfPhones === '12'){
        phones = phones.slice(0, 12);
        btnShowAll.classList.remove('d-none');
    }
    else{
        btnShowAll.classList.add('d-none');
    }
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
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary px-4 py-3 mt-2 fw-semibold" data-bs-toggle="modal" data-bs-target="#btn-show-details">Show Details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    toggleSpinner(false);
}
// Fetch API=======================
const loadPhones = async (searchKey) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchKey}`;
    const res = await fetch(url);
    data = await res.json();
    displayPhones('12');
}
// Search Button Handle============
document.getElementById('btn-search').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhones(searchText);
})
// Enter Key Event Listener===========
document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementById('btn-search').click();
    }
})
// Spinner=========================
function toggleSpinner(isLoading){
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}
// show all button handle==============
document.getElementById('btn-show-all').addEventListener('click', function(){
    displayPhones('all');
})
// Show details button handle=================
async function loadPhoneDetails(id){
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const specification = await res.json();
    showPhoneDetails(specification);
}
function showPhoneDetails(specification){
    const phoneTitle = document.getElementById('btn-show-detailsLabel');
    phoneTitle.innerText = specification.data.name;

    document.getElementById('modalImage').src = specification.data.image;

    document.getElementById('storage-element').innerText = specification.data.mainFeatures.storage;

    document.getElementById('display-size-element').innerText = specification.data.mainFeatures.displaySize;

    document.getElementById('chipset-element').innerText = specification.data.mainFeatures.chipSet;

    document.getElementById('memory-element').innerText = specification.data.mainFeatures.memory;

    document.getElementById('sensors-element').innerText = specification.data.mainFeatures.sensors;

    document.getElementById('brand-element').innerText = specification.data.brand;

    document.getElementById('gps-element').innerText = specification.data.others.GPS;

    document.getElementById('date-element').innerText = specification.data.releaseDate;

}
loadPhones('iphone');