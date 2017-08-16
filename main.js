(function() {
  getTheaters = () => {
    const url = "https://www.moviepass.com/theaters/zip/";
    const zip = $("#zip").val();
    $.get(url + zip, data => {
      renderTheaters(data.theaters);
    });
  };

  renderTheaters = theaters => {
    $("#theaters").html("");
    let fullMarkup = ``;
    theaters.forEach(theater => {
      let markup = `
        <div class="theater">
            <h3>${theater.name}</h3>
            <span class="theater-chain">${theater.theaterChainName}</span>
            <div class="theater-info">
                <p>${theater.address}</p>
                <p>${theater.city}, ${theater.state} ${theater.zip}</p>
            </div>
        </div>
        `;

      fullMarkup += markup;
    });

    $("#theaters").html(fullMarkup);
  };

  $("#go-button").click(getTheaters);
  $("#zip").keypress(function(e) {
    if (e.which == 13) {
      getTheaters();
    }
  });
})();
