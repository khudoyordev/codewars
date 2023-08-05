const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const section = document.querySelector(".section");
const userScore = document.querySelector(".user-score");
const userGoal = document.querySelector(".user-goal");
const userBio = document.querySelector(".user-bio");
const mainName = document.querySelector(".nameuser");
const language = document.querySelector(".language");

const getUser = async () => {
  const inputValue = input.value;
  if (inputValue == "") {
    alert("Ismingizni kiriting");
  } else {
    section.classList.add("active");
    const user =
      await axios.get(`https://www.codewars.com/api/v1/users/${inputValue}
    `);

    return user.data;
  }
};

const setUser = async () => {
  const userData = await getUser();

  let span = document.createElement("span");
  span.innerHTML = `${userData.ranks.overall.name}`;
  span.className = "user-score";
  userGoal.appendChild(span);

  let names = document.createElement("h2");
  names.className = "names";
  names.innerHTML = ` Name:  ${userData.name}`;
  mainName.appendChild(names);

  let userName = document.createElement("h1");
  userName.className = "user-name";
  userName.innerHTML = `${userData.username} `;
  userBio.appendChild(userName);
  language.innerHTML = JSON.stringify(userData.ranks.languages);
  console.log(userData.ranks.languages);
};

const resultLanguage = document.querySelector(".result-language");

const getUserData = async () => {
  const userData = await axios.get(
    `https://www.codewars.com/api/v1/users/khudoyordev/code-challenges/completed?page={page}`
  );
  return userData.data;
};

const setData = async () => {
  const dat = await getUserData();
  dat.data.map((e) => {
    resultLanguage.innerHTML += `${e.name + ", "}`;
    e.completedLanguages.map((t) => {
      language.innerHTML = t;
    });
  });
};

btn.addEventListener("click", () => {
  setUser();
  setData();
});

const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  section.classList.remove("active");
});
