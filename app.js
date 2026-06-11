const usernameInput = document.getElementById("usernameInput");
const searchIcon = document.querySelector("#searchIcon")
const searchBtn = document.querySelector("#searchBtn")
const profileContainer = document.querySelector("#profileContainer")


profileContainer.style.display = "none";
async function searchProfile() {
    if (usernameInput.value === "") {
        alert("please ente a username")
        return;
    }
    else {
        console.log("user found");

    }
    const profileName = usernameInput.value;
    console.log(profileName);
    const url = `https://api.github.com/users/${profileName}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const repoResponse = await fetch(
    `https://api.github.com/users/${profileName}/repos?sort=updated`
);

const repos = await repoResponse.json();

    if (response.status === 404) {
        alert("user not found")
        return;
    }
    else {
        console.log("user found");
        profileContainer.style.display = "flex";
        profileContainer.innerHTML = `
        <div class="profile-header">
         <img class="profile-avatar" src="${data.avatar_url}">

    <div class="profile-info">

        <h2 class="profile-name">${data.name || data.login}</h2>
      

        <p class="profile-username">@${data.login}</p>

        <p class="profile-bio">${data.bio || "No bio available"}</p>

        <div class="profile-meta">

    <span>
        📍 ${data.location || "India"}
    </span>

    <span>
        🔗 ${data.blog
      ? `<a href="${data.blog}" target="_blank">
            Visit Website
         </a>`
      : "Not Available"}
    </span>

    <span>
        📅 Joined
        ${new Date(data.created_at).toLocaleDateString()}
    </span>

</div>

        <div class="profile-links">
            <a href="${data.html_url}" target="_blank">
                View GitHub
            </a>
            <button class="follow-btn">
 Follow
</button>
        </div>
</div>
    </div>
        <div class="stats-grid">

    <div class="stat-card">
    <i class="fa-solid fa-users"></i>
        <h3>Followers</h3>
        <span>${data.followers}</span>
    </div>

    <div class="stat-card">
    <i class="fa-solid fa-user-plus"></i>
        <h3>Following</h3>
        <span>${data.following}</span>
    </div>

    <div class="stat-card">
    <i class="fa-solid fa-book"></i>
        <h3>Repositories</h3>
        <span>${data.public_repos}</span>
    </div>

    <div class="stat-card">
    <i class="fa-solid fa-file-lines"></i>
        <h3>Gists</h3>
        <span>${data.public_gists}</span>
    </div>

</div>
<div class="profile-content">

    <div class="repo-section">

        <h2>Popular Repositories</h2>

       <div class="repo-grid" id="repoGrid">

</div>

    </div>

    <div class="sidebar">


        <div class="side-card">
          <h3>Languages Used</h3>

             <div id="languageStats">
             
             </div>

        </div>

    </div>

</div>
<div class="quick-info">

    <div class="info-card">
        <div class="info-title">
<i class="fa-solid fa-building"></i>

            Company
        </div>

        <div class="info-value">
            ${data.company || "Not Available"}
        </div>

    </div>

    <div class="info-card">

        <div class="info-title">
        <i class="fa-solid fa-location-dot"></i>
            Location
        </div>

        <div class="info-value">
            ${data.location || "Not Available"}
        </div>

    </div>

    <div class="info-card">

        <div class="info-title">
        <i class="fa-solid fa-globe"></i>
        
            Blog
        </div>

     <div class="info-value">
    ${data.blog
      ? `<a href="${data.blog}" target="_blank">
            Visit Website
         </a>`
      : "Not Available"}
</div>

    </div>

    <div class="info-card">

        <div class="info-title">
        <i class="fa-brands fa-x-twitter"></i>
            Twitter
        </div>

        <div class="info-value">

           ${data.twitter_username
                ? `<a href="https://twitter.com/${data.twitter_username}" target="_blank">@${data.twitter_username}</a>`
                : "Not Available"}
        </div>

    </div>

</div>

         
        `

const languageStats =
document.getElementById("languageStats");

const languageCount = {};

repos.forEach(repo => {

    if(repo.language){

        languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;

    }

});

const totalLanguages =
Object.values(languageCount)
.reduce((a,b)=>a+b,0);

Object.entries(languageCount)
.sort((a,b)=>b[1]-a[1])
.forEach(([lang,count])=>{

    const percentage =
    ((count/totalLanguages)*100).toFixed(0);

    languageStats.innerHTML += `

        <div class="lang-item">

            <div class="lang-header">

                <span>${lang}</span>

                <span>${percentage}%</span>

            </div>

            <div class="lang-bar">

                <div
                class="lang-fill"
                style="width:${percentage}%">
                </div>

            </div>

        </div>

    `;

});

        const repoGrid = document.getElementById("repoGrid");
        repos.slice(0, 6).forEach((repo) => {

    repoGrid.innerHTML += `
    
    <div class="repo-card">

        <div class="repo-header">

            <svg aria-hidden="true" data-component="Octicon" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo mr-1 tmp-mr-1 ">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
            </svg>

            <div class="repo-title">
               ${repo.name}
            </div>
        </div>

        <div class="repo-desc">
            ${repo.description || "No description"}
        </div>
        <div class="repo-footer">

           <span>
            ⭐ ${repo.stargazers_count}
           </span>

           <span>
            🟡 ${repo.language || "Unknown"}
           </span>

        </div>
    </div>
      


    `;

});
    }
    profileContainer.scrollIntoView({
    behavior: "smooth",
    block: "start"
});

window.scrollTo({
    top: profileContainer.offsetTop - 20,
    behavior: "smooth"
});
}


searchBtn.addEventListener("click", () => {
    console.log(usernameInput.value)
    searchProfile();

})
searchIcon.addEventListener("click", () => {
    console.log(usernameInput.value)
    searchProfile();
})
const  Torvalds = document.getElementById("torvalds")
Torvalds.addEventListener("click", () => {
    usernameInput.value="torvalds"
    console.log(usernameInput.value)
    searchProfile();
})
const  gaearon = document.getElementById("gaearon")
gaearon.addEventListener("click", () => {
    usernameInput.value="gaearon"
    searchProfile();
})
const  addyosmani = document.getElementById("addyosmani")
addyosmani.addEventListener("click", () => {
    usernameInput.value="addyosmani"
    searchProfile();
})
const  saksham = document.getElementById("saksham")
saksham.addEventListener("click", () => {
    usernameInput.value="sakshamkhare18"
    searchProfile();
})

const themeToggle =
document.getElementById("themeBtn");

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle(
        "light-theme"
    );
      if(document.body.classList.contains("light-theme")){
        themeToggle.innerHTML = "☀️";
    }else{
        themeToggle.innerHTML = "🌙";
    }


});