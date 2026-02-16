document.addEventListener("DOMContentLoaded", function () {

    const mainContent = document.getElementById("mainContent");

    if (!mainContent) return;

    const homeTemplate = document.getElementById("homeTemplate");


    function loadHome() {

        mainContent.innerHTML = "";

        mainContent.appendChild(
            homeTemplate.content.cloneNode(true)
        );

    }


    const pageContents = {

        alumni: `
            <h2>Alumni</h2>
            <div class="card p-3">John Doe</div>
        `,

        career: `
            <h2>Career</h2>
            <div class="card p-3">Frontend Developer</div>
        `,

        mentorship: `
            <h2>Mentorship</h2>
            <div class="card p-3">Mentor Available</div>
        `,

        donations: `
            <h2>Donations</h2>
            <button class="btn btn-primary">Donate</button>
        `,

        help: `
            <h2>Help</h2>
            <div class="card p-3">Contact support</div>
        `
    };


    // Load Home first
    loadHome();


    document.querySelectorAll(".sidebar-link").forEach(link => {

        link.addEventListener("click", function(e){

            e.preventDefault();

            const page = this.getAttribute("data-page");

            if(page === "dashboard"){

                loadHome();

            }
            else{

                mainContent.innerHTML = pageContents[page];

            }

        });

    });

});
document.addEventListener("DOMContentLoaded", function () {

const mainContent = document.getElementById("mainContent");
const homeTemplate = document.getElementById("homeTemplate");

const sidebar = document.querySelector(".dashboard-sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarClose = document.getElementById("sidebarClose");

const themeToggle = document.getElementById("themeToggle");


// Load home
function loadHome(){

mainContent.innerHTML="";
mainContent.appendChild(homeTemplate.content.cloneNode(true));

}

loadHome();


// Sidebar link click
document.querySelectorAll(".sidebar-link").forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const page=this.dataset.page;

if(page==="dashboard"){

loadHome();

}else{

mainContent.innerHTML=`<h2 class="mb-3 text-capitalize">${page}</h2>
<div class="card p-3">This is ${page} section</div>`;

}

// close sidebar on mobile
if(window.innerWidth<992){

sidebar.classList.remove("show");

}

});

});


// Open sidebar
sidebarToggle.addEventListener("click",()=>{

sidebar.classList.add("show");

});


// Close sidebar
sidebarClose.addEventListener("click",()=>{

sidebar.classList.remove("show");

});


// Theme toggle
themeToggle.addEventListener("click",()=>{

const html=document.documentElement;

if(html.dataset.theme==="dark"){

html.dataset.theme="light";
themeToggle.innerHTML=`<i class="fa-solid fa-moon"></i>`;

}else{

html.dataset.theme="dark";
themeToggle.innerHTML=`<i class="fa-solid fa-sun"></i>`;

}

});

});
