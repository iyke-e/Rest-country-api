const bodyEl = document.body;
const main1 = document.querySelector(".main1");
const main2 = document.querySelector(".main2");
const darkModeBtn = document.querySelector("#darkmode");
const filterBtn = document.querySelector(".filter");
const filterList = document.querySelector(".filter-list");
const cardWrapper = document.querySelector(".card-wrapper");
const search = document.querySelector("#search");
const list = document.querySelectorAll(".li");

// script to select mode based on user predefined mode setting
darkModeBtn.addEventListener("click", () => {
  if (window.matchMedia("(prefers-color-scheme: dark").matches) {
    bodyEl.classList.toggle("lightmode");
  } else {
    bodyEl.classList.toggle("darkmode");
  }
});

// script to open and close filter menu
filterBtn.addEventListener("click", () => {
  filterList.classList.toggle("showlist");
});

// script to fetch data from data.json
const getData = async () => {
  const res = await fetch("data.json");
  const data = await res.json();
  return data;
};

// card element to be rendered to the dom for each country
const render = (
  listRegion,
  listFlag,
  listName,
  listCapital,
  listPopulation
) => {
  return `
        <div onclick="showName(dataset.name)" data-name="${listName}" class="card-container ${listRegion}">
             <div class="flag-img" style="background-image: url( ${listFlag})" >
              </div>
            <div class="description">
                <h2 class="countryName">${listName}</h2>
                <ul>
                    <li><b>Population:</b> ${listPopulation.toLocaleString(
                      "en-us"
                    )} </li>
                    <li class=" "><b>Region:</b> ${listRegion}</li>
                        <li><b>Capital:</b> ${listCapital}</li>
                    </ul>
            </div>
        </div>
        `;
};

// script and logic for filtering based on country region
const filterCountryRegion = async () => {
  const data = await getData();
  list.forEach((li) => {
    li.addEventListener("click", () => {
      filterList.classList.remove("showlist");
      if (li.innerHTML === "Africa") {
        cardWrapper.innerHTML = data
          .map((e) => {
            if (e.region === "Africa") {
              return render(e.region, e.flag, e.name, e.capital, e.population);
            }
          })
          .join("");
      } else if (li.innerHTML === "America") {
        cardWrapper.innerHTML = data
          .map((e) => {
            if (e.region === "Americas") {
              return render(e.region, e.flag, e.name, e.capital, e.population);
            }
          })
          .join("");
      } else if (li.innerHTML === "Europe") {
        cardWrapper.innerHTML = data
          .map((e) => {
            if (e.region === "Europe") {
              return render(e.region, e.flag, e.name, e.capital, e.population);
            }
          })
          .join("");
      } else if (li.innerHTML === "Oceania") {
        cardWrapper.innerHTML = data
          .map((e) => {
            if (e.region === "Oceania") {
              return render(e.region, e.flag, e.name, e.capital, e.population);
            }
          })
          .join("");
      } else if (li.innerHTML === "Asia") {
        cardWrapper.innerHTML = data
          .map((e) => {
            if (e.region === "Asia") {
              return render(e.region, e.flag, e.name, e.capital, e.population);
            }
          })
          .join("");
      }
    });
  });
};
filterCountryRegion();

// script for search filter and initial load display of country
const countrySearch = async () => {
  let query = search.value;
  console.log(query);

  const data = await getData();
  let SearchName = data
    .filter((n) => {
      if (query === "") {
        return n;
      } else if (n.name.toLowerCase().includes(query.toLowerCase())) {
        return n;
      }
    })
    .map((e) => {
      return render(e.region, e.flag, e.name, e.capital, e.population);
    })
    .join(" ");

  cardWrapper.innerHTML = SearchName;
};
countrySearch();

// listen for user input and run the filter function to bring the right country
search.addEventListener("input", () => {
  countrySearch();
});

// script to return to previous section of the page
const goBack = () => {
  main1.classList.remove("hide");
  main2.classList.add("hide");
};

// script and logic for showing more details about the country card clicked
const showName = async (e) => {
  window.scrollTo(0, 0);
  main1.classList.add("hide");
  main2.classList.remove("hide");
  const datael = await getData();
  datael.forEach((el) => {
    if (el.name === e) {
      main2.innerHTML = moreAboutCountry(
        el.flag,
        el.name,
        el.nativeName,
        el.population,
        el.region,
        el.subregion,
        el.capital,
        el.topLevelDomain,
        el.currencies,
        el.languages,
        el.borders
      );
    }
  });
};

// dom element to be rendered when user click a country card to view more about the country
const moreAboutCountry = (
  elFlag,
  elName,
  elNativeName,
  elPopulation,
  elRegion,
  elSubregion,
  elCapital,
  elTopLevelDomain,
  elCurrencies,
  elLanguages,
  elBorders
) => {
  return `
          <button class="backBtn" onclick="goBack()">
             Back
        </button>
        <section class="aboutCountryWrapper">
            <div class="country-f-img" style="background-image: url( ${elFlag})"></div>
          <div class="aboutCountry">
            <h2>${elName}</h2>

               <div class="countryDescription">
                 <div>
                     <p><b>Native Name: </b> ${elNativeName}</p>
                     <p><b>Population:</b> ${elPopulation.toLocaleString(
                       "en-us"
                     )}</p>
                     <p><b>Region:</b> ${elRegion}</p>
                     <p><b>Sub Region:</b> ${elSubregion}</p>
                     <p><b>Capital:</b> ${elCapital}</p>
                 </div>
                 <div>
                     <p><b>Top Level Domain:</b> ${elTopLevelDomain}</p>
                     <p><b>Currencies:</b> ${
                       elCurrencies == null
                         ? `None`
                         : elCurrencies
                             .map((e) => {
                               return `${e.name}`;
                             })
                             .join(", ")
                     }</p>
                     <p><b>Languages:</b> ${elLanguages
                       .map((e) => {
                         return `${e.name}`;
                       })
                       .join(", ")}</p>

                 </div>
               </div>
             <div class="border">
             <h3>Border Countries</h3>
             <ul class="borders">
                 ${
                   elBorders == null
                     ? `<li> none </li>`
                     : elBorders
                         .map((el) => {
                           return `<li> ${el} </li>`;
                         })
                         .join(" ")
                 }
             </ul>
             </div>
             </div>
         </section>
          `;
};
