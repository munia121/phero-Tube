const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
const errorContent = document.getElementById('error-content')
const sortBtn = document.getElementById('sort-view')


let selectedCategory = 1000;
let sortByView = false;


sortBtn.addEventListener('click',() =>{
    let sortByView = true;
    categoriesBtn()

})


const fetchCategories =async () =>{
    const url = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const res =await url.json()
    const data = res.data
    displayShowing(data)
    
}

const displayShowing = (data) =>{
    data.forEach(card => {
        const newBtn = document.createElement('button');
        newBtn.innerText = card.category
        newBtn.className = 'category-btn btn';
        newBtn.addEventListener('click', () => {
            categoriesBtn(card.category_id)
            // button clicked color
            const allBtn = document.querySelectorAll('.category-btn')
            for(const btn of allBtn){
                console.log(btn)
                btn.classList.remove('bg-red-500')
            }
            
            newBtn.classList.add('bg-red-500')

        })
        btnContainer.appendChild(newBtn)
        // console.log(card)
    });
    
}



const categoriesBtn = (categoryId, sortByView) => {
    
    const fetchCategories =async () =>{
        const url = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
        const res =await url.json()
        const data = res.data;
        singleVideoCard(data)
    }
    fetchCategories()
   
}


const singleVideoCard = (data, sortByView) =>{
    if(sortByView){
        data.sort((a,b) =>{
            const totalViewSortFirst = a.others?.views;
            const totalViewSortSecond = b.others?.views;
            const totalViewFirstNumber = parseFloat(totalViewSortFirst.replace('K', '')) || 0;
            const totalViewSecondNumber = parseFloat(totalViewSortSecond.replace('K', '')) || 0;
        })
    }

    if(data.length === 0){
        errorContent.classList.remove('hidden')
    }
    else{
        errorContent.classList.add('hidden')
    }

    cardContainer.innerHTML = '';
    data.forEach((video) =>{

        let verifiedBadge = '';
        if(video.authors[0].verified){
            verifiedBadge = `<i class="fa-solid fa-certificate"></i>`
        }


        const newVideoCard = document.createElement('div');
        newVideoCard.classList = 'card  bg-base-100 shadow-xl'
        newVideoCard.innerHTML = `
        <figure><img class='h-[200px]' src="${video.thumbnail}" alt="Shoes" /></figure>
            <div class="card-body">
            <div class='flex gap-4'>
                <img class ='w-[50px] h-[50px] rounded-full' src="${video.authors[0].profile_picture}" alt="Shoes" />
               <div>
                    <h2 class="card-title">${video.title}</h2>
                    <p class='font-extrabold'>ProfileName: ${video.authors[0].profile_name}</p>
                    <p>${video.others.views}</p>
                    ${verifiedBadge}
               </div>
            </div>
            
            </div>
        </div>
        `;
        cardContainer.appendChild(newVideoCard);
        
        // console.log(video)
    })
    // console.log(data)
}


fetchCategories()
singleVideoCard(selectedCategory,sortByView)