 
// Get a reference to the film list and details container
const filmsList = document.getElementById("films");
const filmsContainer = document.querySelector(".films");
// Make a GET request to the film data endpoint
fetch("http://localhost:3000/films")
  .then(response => response.json())
  .then(films => {
    // Loop through the films data and populate the film list and details
    films.forEach(film => {
      const { title, poster, runtime, showtime, capacity, tickets_sold } = film;
      let availableTickets = capacity - tickets_sold; // Use let instead of const to reassign availableTickets
      // Create the film list item and append it to the film list
      const listItem = document.createElement("li");
      listItem.classList.add("film", "item");
      listItem.textContent = title;
      filmsList.appendChild(listItem);
      // Create the film details and append them to the details container
      const detailsContainer = document.createElement("div");
      detailsContainer.classList.add("film");
      detailsContainer.innerHTML = `
        <img src="${poster}" alt="${title} Poster">
        <div class="details">
          <h2>${title}</h2>
          <p>Runtime: ${runtime}</p>
          <p>Showtime: ${showtime}</p>
          <p>Available tickets: <span id="${title}-tickets">${availableTickets}</span></p>
          <button id="${title}-button"
          >Buy Ticket</button>
        </div>
      `;
      filmsContainer.appendChild(detailsContainer);
      // Add a click event listener to the buy ticket button
      const buyTicketButton = document.getElementById(`${title}-button`);
      buyTicketButton.addEventListener("click", () => {
        if (availableTickets > 0) {
          availableTickets--;
          document.getElementById(`${title}-tickets`).textContent = availableTickets;
          film.tickets_sold++; // Increment the tickets_sold value of the film
          
        }
        if (availableTickets === 0) {
          buyTicketButton.textContent = "Sold Out";
          buyTicketButton.disabled = true;
          
          
        }
      });
    });
  });