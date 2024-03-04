const loadPosts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await response.json();
  const posts = data.posts;
  const discussionContainer = document.getElementById("discussion-container");
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("singlepost");
    let activeBadge = '';
    if(post.isActive){
        activeBadge = `<div class="h-4 w-4 rounded-full bg-[#10B981] absolute -top-1 -right-1"></div>`
    }else{
        activeBadge = `<div class="h-4 w-4 rounded-full bg-[#FF3434] absolute -top-1 -right-1"></div>`
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
                    <div class="flex">
                        <img class="mx-3" src="./images/message.png" alt="">
                        <p  para-primary">${post.comment_count}</p>
                        <img class="mx-3" src="./images/eye.png" alt="">
                        <p  para-primary">${post.view_count}</p>
                        <img class="mx-3" src="./images/clock.png" alt="">
                        <p  para-primary">${post.posted_time} min</p>
                    </div>
                    <div class="" >
                        <img src="./images/email.png" alt="">
                    </div>
                </div>
            </div>

        </div>
    `;
 discussionContainer.appendChild(div);
  });
};

loadPosts();
