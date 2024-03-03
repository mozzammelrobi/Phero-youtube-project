const btnContainer = document.getElementById('btn-container')
const cardsContainer = document.getElementById('cards-container')
const errorElement = document.getElementById('error-element')

const fetchCategory = async() => {
    const res =await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json()
    const cards = data.data
    // console.log(cards)
    cards.forEach((card) => {
        // console.log(card)
        const btn = document.createElement('button')
        btn.classList = ' bg-gray-300 hover:bg-red-600 hover:text-white px-1 rounded'
        btn.innerText = card.category

        btn.addEventListener('click',() => fetchDataBycategories(card.category_id))

        btnContainer.appendChild(btn)

    })
}




const fetchDataBycategories = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json()
    const cards = data.data
    console.log(cards)


    if(cards.length === 0){
        errorElement.classList.remove('hidden')
    }else{
        errorElement.classList.add('hidden')
    }

   
    cardsContainer.textContent = ''
    cards.forEach((video) => {
        // console.log(video.authors[0])

        let verifiedBadge = ''
        if(video.authors[0].verified){
            verifiedBadge = '<i class="text-green-500 fa-solid fa-certificate"></i>'
        }


        const newCard = document.createElement('div')
        newCard.classList = 'card bg-base-100 shadow-xl'

        newCard.innerHTML = `
        <div class="card-body p-1">
        <div>
         <figure><img src="${video.thumbnail}" alt="Shoes" /></figure>
        </div>
        
        <div class="flex gap-1">
         <div class="image part">
             <img class="w-10 rounded-full" src="${video.authors[0].profile_picture}" alt="">
         </div>
         <div class="text part flex flex-col gap-1">
             <h1 class="font-bold">${video.title}</h1> 
             <div class="flex gap-3">
                 <p>name: <span>${video.authors[0].profile_name}</span></p>
                 ${verifiedBadge}
             </div>
             <p><span>${video.others.views}</span> views</p>
         </div>
        </div>
   </div>

        `;
        cardsContainer.appendChild(newCard)
    })
    
}

fetchDataBycategories('1000')
fetchCategory()