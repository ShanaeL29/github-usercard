/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

//Axios GET request
// const res = axios.get('https://api.github.com/users/ShanaeL29')
//.then (res => console.log(res)) //.then takes a callback function with a paramater response and then do something with the response
//.catch(err => console.error(err))//something

// axios.get('https://api.github.com/users/ShanaeL29')
//   .then (res => console.log(res))
//   .catch(err => console.error(err))

function getGithubUser(name) {
  axios
    .get(`https://api.github.com/users/${name}`)
    .then((res) => {
      const userCard = userCardMaker(res.data);
      console.log(res);
      document.querySelector(".cards").appendChild(userCard);
    })
    .catch((err) => {
      console.error(err);
    });
}
getGithubUser("ShanaeL29");

//Create follower cards and append to DOM
const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell",
];

followersArray.forEach((follower) => {
  getGithubUser(follower);
});

//Create component
function userCardMaker(user) {
  //Instantiate Elements
  const card = document.createElement("div");
  const imageURL = document.createElement("img");
  const cardInfo = document.createElement("div");
  const usersName = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const linkAddress = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  //Set hierarchy (parent/child relationships)
  profile.textContent = `Profile:`;
  card.appendChild(imageURL);
  card.appendChild(cardInfo);
  cardInfo.appendChild(usersName);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  profile.appendChild(linkAddress);

  //Assign classes
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  usersName.classList.add("name");
  username.classList.add("username");

  //Content
  imageURL.setAttribute("src", `${user["avatar_url"]}`);
  usersName.textContent = `Name: ${user["name"]}`;
  username.textContent = `UserID: ${user["login"]}`;
  location.textContent = `Location: ${user["location"]}`;
  linkAddress.setAttribute("href", `${user["html_url"]}`);
  linkAddress.textContent = user["html_url"];
  followers.textContent = `Followers: ${user["followers"]}`;
  following.textContent = `Following: ${user["following"]}`;
  bio.textContent = `Bio: ${user["bio"]}`;

  return card;
}
