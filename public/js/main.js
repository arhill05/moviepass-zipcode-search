(function () {
  getTheaters = () => {
    $("#theaters").html("");
    $("#floatingCirclesG").show();
    const url = "http://localhost:3001/api/theaters/";
    const zip = $("#zip").val();
    $.get(url + zip, data => {
      renderTheaters(JSON.parse(data).theaters);
    })
      .fail(function () {
        $("floatingCirclesG").hide();
        $("#theaters").html("Something went wrong :( <br/> Try it again soon.");
      });
  };

  renderTheaters = theaters => {
    const mapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=';
    let fullMarkup = ``;
    if (!theaters || theaters.length == 0) {
      fullMarkup = `No results found`;
    } else {
      theaters.forEach(theater => {
        let theaterMapUrl = mapsUrl + encodeURI(theater.name + ',' + theater.city + ',' + theater.state);
        let markup = `
        <div class="theater">
            <div class="theater-right">
              <p class="theater-chain">${theater.theaterChainName}</p>
            </div>
            <h3 class="theater-name">${theater.name}</h3>
            <div class="theater-info">
                <p>${theater.address}</p>
                <p>${theater.city}, ${theater.state} ${theater.zip}</p>
                <p>Distance: ${theater.distance} mi</p>
                <p class="theater-ticket-type">Ticket Type: ${theater.ticketType}</p>
                <a class="theater-directions-link" href="${theaterMapUrl}"><button>Directions</button></a>
            </div>
           
        </div>
        `;

        fullMarkup += markup;
      });
    }

    $("#theaters").html(fullMarkup);
    $("#floatingCirclesG").hide();
  };

  $("#floatingCirclesG").hide();
  $("#go-button").click(getTheaters);
  $("#zip").keypress(function (e) {
    if (e.which == 13) {
      getTheaters();
    }
  });
  $("#zip").focus();
})();
