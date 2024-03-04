const loadPosts = async (catId) => {
    const loader= document.getElementById("loading-spinner");
    loader.classList.add("block");
    loader.classList.remove("hidden");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/${catId}`
  );
  const data = await response.json();
  const posts = data.posts;
  const discussionContainer = document.getElementById("discussion-container");
  discussionContainer.innerHTML = "";
  posts.forEach((post) => {
    setTimeout (function () {loader.classList.add("hidden")},2000);
    
    const div = document.createElement("div");
    div.classList.add("singlepost");
    let activeBadge = "";
    if (post.isActive) {
      activeBadge = `<div class="h-4 w-4 rounded-full bg-[#10B981] absolute -top-1 -right-1"></div>`;
    } else {
      activeBadge = `<div class="h-4 w-4 rounded-full bg-[#FF3434] absolute -top-1 -right-1"></div>`;
    }
    div.innerHTML = `
    <!-- discussions -->
    <div  class=" mb-6  p-2   lg:p-10 bg-[#F3F3F5] rounded-3xl  ">

        <div class="flex flex-col lg:flex-row gap-6">
            <div class="relative w-[72px]">
                <img class="rounded-2xl " src="${post.image}" alt="" height="72" width="72">

                ${activeBadge}
            </div>


            <div class="w-full">
                <div class="flex gap-2 lg:gap-5">
                    <p class="discussion-heading"># ${post.category}</p>
                    <p class="discussion-heading">Author : ${post.author.name}</p>
                </div>
                <h3 class="text-[#12132D] text-xl font-bold mt-3">${post.title}</h3>
                <p class="mt-4 para-primary">${post.description}</p>
                <div class="divider"></div>
                <div class="flex  flex-grow justify-between">
                    <div class="flex items-center">
                        <img class="mx-1" src="./images/message.png" alt="">
                        <p class="para-primary">${post.comment_count}</p>
                        <img class="mx-1" src="./images/eye.png" alt="">
                        <p  class="para-primary">${post.view_count}</p>
                        <img class="mx-1" src="./images/clock.png" alt="">
                        <p  class="para-primary">${post.posted_time} min</p>
                    </div>
                    <div class="" >
                       <button onclick="readPosts('${post.title}','${post.view_count}')"> <img src="./images/email.png" alt=""></button>
                    </div>
                </div>
            </div>

        </div>
    `;
    discussionContainer.appendChild(div);
  });
};
const searchPosts = async (catId) => {
    const loader= document.getElementById("loading-spinner");
    loader.classList.add("block");
    loader.classList.remove("hidden");
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${catId}`
  );
  const data = await response.json();
  const posts = data.posts;
  const discussionContainer = document.getElementById("discussion-container");
  discussionContainer.innerHTML = "";
  posts.forEach((post) => {
    setTimeout (function () {loader.classList.add("hidden")},2000);
    const div = document.createElement("div");
    div.classList.add("singlepost");
    let activeBadge = "";
    if (post.isActive) {
      activeBadge = `<div class="h-4 w-4 rounded-full bg-[#10B981] absolute -top-1 -right-1"></div>`;
    } else {
      activeBadge = `<div class="h-4 w-4 rounded-full bg-[#FF3434] absolute -top-1 -right-1"></div>`;
    }
    div.innerHTML = `
    <!-- discussions -->
    <div  class=" mb-6  p-2   lg:p-10 bg-[#F3F3F5] rounded-3xl  ">

        <div class="flex flex-col lg:flex-row gap-6">
            <div class="relative w-[72px]">
                <img class="rounded-2xl " src="${post.image}" alt="" height="72" width="72">

                ${activeBadge}
            </div>


            <div class="w-full">
                <div class="flex gap-2 lg:gap-5">
                    <p class="discussion-heading"># ${post.category}</p>
                    <p class="discussion-heading">Author : ${post.author.name}</p>
                </div>
                <h3 class="text-[#12132D] text-xl font-bold mt-3">${post.title}</h3>
                <p class="mt-4 para-primary">${post.description}</p>
                <div class="divider"></div>
                <div class="flex  flex-grow justify-between">
                    <div class="flex items-center">
                        <img class="mx-3" src="./images/message.png" alt="">
                        <p  class="para-primary">${post.comment_count}</p>
                        <img class="mx-3" src="./images/eye.png" alt="">
                        <p  class="para-primary">${post.view_count}</p>
                        <img class="mx-3" src="./images/clock.png" alt="">
                        <p  class="para-primary">${post.posted_time} min</p>
                    </div>
                    <div class="" >
                       <button onclick="readPosts('${post.title}','${post.view_count}')"> <img src="./images/email.png" alt=""></button>
                    </div>
                </div>
            </div>

        </div>
    `;
    discussionContainer.appendChild(div);
  });
};


let count = 0;

const readPosts = (title, view_count) => {
    const titleReadContainer = document.getElementById("title-read-container");
    count++;
    setInnerText("count-read", count);
  const div = document.createElement("div");
  div.classList.add("read-post");
  div.innerHTML = `<div class="w-52 lg:w-64">
    <p class="text-base font-semibold">${title}</p>
</div>
<div class="flex items-center">
    <img src="./images/eye.png" alt="">
    <p class="para-primary">${view_count}</p>
</div>`;
titleReadContainer.appendChild(div);

  
};

const handleSearch = () => {
    console.log('handleSearch')
    const value = document.getElementById("search-input").value;
    if(value){
        searchPosts(value);
    }else{
        alert("Please enter a value");
    }

}

const postCards = async () => {
    
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
    );
    const data = await response.json();
    console.log(data);
    
    const postCardContainer = document.getElementById("latest-post-cards-container");
    data.forEach((post) => {
        
      const div = document.createElement("div");
      div.classList.add("latest-post-cards");
      div.innerHTML = `
      <div class="card card-compact  bg-base-100 shadow-xl">
                        <div class="m-6 ">
                            <img class="rounded-3xl" src="${post.cover_image}"
                                alt="" />
                        </div>
                        <div class="card-body">
                            <div class="flex">
                                <img src="./images/Calendar.png" alt="">
                                <p class="para-primary ml-1">${post.author.posted_date ? post.author.posted_date : "No Published Date"}</p>
                            </div>
                            <h2 class="card-title text-[#12132D] text-lg font-extrabold">${post.title}</h2>
                            <p class="para-primary">${post.description.slice(0,100)}</p>
                            <div class="flex gap-4">
                                <img class="rounded-full"
                                    src="${post.profile_image}" height="44"
                                    width="44" alt="">
                                <div>
                                    <h3 class="text-[#12132D] font-bold">${post.author.name}</h3>
                                    <p class="para-primary">${post.author.designation ? post.author.designation : "Unknown"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
      `;
      postCardContainer.appendChild(div);
    });
  };
function setInnerText(id, value) {
    document.getElementById(id).innerText = value;
    console.log(document.getElementById.innerText);
  }
loadPosts("posts");
postCards();

