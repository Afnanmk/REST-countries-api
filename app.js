// TODOS :
// API Call ✔️
// Theme toggle ✔️
// Search ✔️
// Filter ✔️
// Modal ✔️
// name of region in select dropdown
// 'No Match Found' message in search query
// sort by population
// const fastSort = require("fast-sort")

const countriesElement = document.getElementById("countries")
const toggleBtn = document.getElementById("toggle")
const filterBtn = document.getElementById("filter")
const searchInput = document.getElementById("search")
const regionFilters = document.querySelectorAll("li")
const modal = document.getElementById("modal")
const closeBtn = document.getElementById("close")
const sort = document.getElementById("sort")

//call function
getCountries()

async function getCountries() {
  const response = await fetch("https://restcountries.eu/rest/v2/all")
  const countries = await response.json()

  console.log(countries)

  displayCountries(countries)
}

function displayCountries(countries) {
  if (countries.length) {
    countriesElement.innerHTML = ""
    console.log(countriesElement.children)
    countries.forEach(country => {
      const countryEl = document.createElement("div")
      countryEl.classList.add("card")

      countryEl.innerHTML = ` 
              <div>
             <img src="${country.flag}" alt="Germany" />
              </div>
              
              <div class="card-body">
              <h3 class="country-name">${country.name}</h3>

              <p class="country-population">
                  <strong>Population:</strong>
                  ${country.population.toLocaleString()}
              </p>

              <p class="country-region">
                  <strong>Region:</strong>
                  ${country.region}
              </p>

              <p>
                  <strong>Capital:</strong>
                  ${country.capital}
              </p>
              </div>`

      countryEl.addEventListener("click", () => {
        modal.style.display = "flex"
        showCountryDetails(country)
      })

      countriesElement.appendChild(countryEl)
    })
  }
}

function showCountryDetails(country) {
  const modalBody = modal.querySelector(".modal-body")
  const modalImg = modal.querySelector("img")

  modalImg.src = country.flag

  modalBody.innerHTML = `
  <h2>${country.name}</h2>
        <p>
            <strong>Native Name:</strong>
            ${country.nativeName}
        </p>
        <p>
            <strong>Population:</strong>
            ${country.population.toLocaleString()}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
        <p>
            <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
        </p>
        <p>
            <strong>Currencies:</strong>
            ${country.currencies.map(currency => currency.code)}
        </p>
        <p>
            <strong>Languages:</strong>
            ${country.languages.map(language => language.name)}
        </p>
  `
}

// toggle theme
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark")
})

// filter dropdown open close
filterBtn.addEventListener("click", () => {
  filterBtn.classList.toggle("open")
})

// sort dropdown open close

// close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none"
})

// Search Input
searchInput.addEventListener("input", e => {
  const noMatch = document.querySelector(".no-result")
  const { value } = e.target

  const countryName = document.querySelectorAll(".country-name")

  countryName.forEach(name => {
    if (name.innerText.toLowerCase().indexOf(value.toLowerCase()) > -1) {
      name.parentElement.parentElement.style.display = "block"
      noMatch.style.display = "none"
    } else {
      name.parentElement.parentElement.style.display = "none"
    }
  })
})

//Filtering REGIONS
regionFilters.forEach(filter => {
  filter.addEventListener("click", () => {
    const value = filter.innerText.toUpperCase()
    const countryRegion = document.querySelectorAll(".country-region")

    countryRegion.forEach(region => {
      if (region.innerText.toUpperCase().includes(value) || value === "ALL") {
        region.parentElement.parentElement.style.display = "block"
      } else {
        region.parentElement.parentElement.style.display = "none"
      }
    })
  })
})

// sort by population
// let desc = false
// async function sortByPop() {
//   const response = await fetch("https://restcountries.eu/rest/v2/all")
//   const countries = await response.json()

//   sort.addEventListener("click", () => {
//     const pop = Array.from(countries, country => country.population)

//     pop.sort((a, b) => {
//       if (a < b) return -1
//       if (a > b) return 1
//       return 0
//     })

//     console.log(pop)
//   })
// }
// sortByPop()
