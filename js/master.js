let landing = document.querySelector(".landing");
let i = 1;
let bar = document.querySelector(".header svg");
let settings = document.querySelector(".settings");
const lis = document.querySelectorAll(".settings .content .color ul li");
let bgbtns = document.querySelectorAll(".bg button");
let bullets_btns = document.querySelectorAll(".bullets button");
let bullets = document.querySelector(".bullets-nav");
let backopt = true;
let backgroundInterval;
bar.addEventListener("click", function () {
  let ul = document.querySelector(".header ul");
  ul.style.display === "none"
    ? (ul.style.display = "flex")
    : (ul.style.display = "none");
});

document.querySelector(".settings svg").addEventListener("click", function () {
  settings.classList.toggle("open");
});

if (localStorage.getItem("color") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color") || " #ff5722"
  );

  lis.forEach((li) => {
    li.classList.remove("active");
    if (localStorage.getItem("color") === li.dataset.color)
      li.classList.add("active");
  });
}
lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    localStorage.setItem("color", e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    lis.forEach((e) => {
      e.classList.remove("active");
    });
    li.classList.toggle("active");
  });
});
document.getElementById("reset").addEventListener("click", () => {
  localStorage.clear();
  document.documentElement.style.setProperty("--main-color", " #ff5722");
  lis.forEach((li) => {
    li.classList.remove("active");
  });
  lis[0].classList.toggle("active");
  bgbtns[0].click();
  bullets_btns[0].click();
});

if (localStorage.getItem("background") !== null) {
  bgbtns.forEach((element) => {
    element.classList.remove("active");
  });
  if (localStorage.getItem("background") === "true") {
    backopt = true;
    bgbtns[0].classList.add("active");
  } else {
    backopt = false;
    bgbtns[1].classList.add("active");
  }
}

function RandomImgs() {
  if (backopt === true) {
    backgroundInterval = setInterval(() => {
      landing.style.backgroundImage = `/special-design/imgs/img${i++}jpg")`;
      if (i === 6) i = 1;
    }, 8000);
  }
}
RandomImgs();
bgbtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");

    if (e.target.classList.contains("yes")) {
      backopt = true;
      RandomImgs();
    } else {
      backopt = false;
      clearInterval(backgroundInterval);
    }
    localStorage.setItem("background", backopt);
  });
});
bullets_btns.forEach((btn) => {
  btn.addEventListener("click", function (ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    ev.target.classList.add("active");

    if (ev.target.classList.contains("yes")) {
      bullets.style.display = "flex";
      localStorage.setItem("bullets", true);
    } else {
      bullets.style.display = "none";
      localStorage.setItem("bullets", false);
    }
  });
});
if (localStorage.getItem("bullets") !== null) {
  if (localStorage.getItem("bullets") === "true") bullets_btns[0].click();
  else bullets_btns[1].click();
}

let skills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skills div span");
window.onscroll = function () {
  if (
    window.pageYOffset >
    skills.offsetTop + skills.offsetHeight - window.innerHeight
  ) {
    spans.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

let imgs = document.querySelectorAll(".gallary .container img");
imgs.forEach((img) => {
  img.addEventListener("click", function (e) {
    let imgframe = document.createElement("div");
    let image = document.createElement("div");
    let h2 = document.createElement("h2");
    h2.textContent = img.alt;
    imgframe.classList.add("image-frame");

    image.classList.add("image");

    imgframe.appendChild(image);

    image.innerHTML = `
   <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="26"
        height="26"
      >
        <path d="M2.343 13.657A8 8 0 1 1 13.658 2.343 8 8 0 0 1 2.343 13.657ZM6.03 4.97a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042L6.94 8 4.97 9.97a.749.749 0 0 0 .326 1.275.749.749 0 0 0 .734-.215L8 9.06l1.97 1.97a.749.749 0 0 0 1.275-.326.749.749 0 0 0-.215-.734L9.06 8l1.97-1.97a.749.749 0 0 0-.326-1.275.749.749 0 0 0-.734.215L8 6.94Z"></path>
      </svg>
    `;
    image.appendChild(h2);
    let newimg = document.createElement("img");
    newimg.src = e.target.src;
    image.appendChild(newimg);

    document.body.appendChild(imgframe);

    let svg = document.querySelector(".image svg");
    svg.addEventListener("click", function () {
      imgframe.remove();
    });
  });
});

function scroolto(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scroolto(document.querySelectorAll(".bullets-nav a"));
scroolto(document.querySelectorAll(".landing .header ul li"));
