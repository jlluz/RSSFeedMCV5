const URL = "https://news.yahoo.com/rss/topstories";
const minFeeds = 5; // the number of additional news items to load on button click

var offSetFeeds = 0;

var dataFeeds = []; // this will hold all the Feeds data collection

// initial function when page loads
(function init () {

    getFeeds(); // get all the news items

})();

// load feeds as per request - minFeeds is the number of additional news items to load on demand
function loadFeeds(dataFeeds) {

    var elem = document.getElementById("feed");

    const items = dataFeeds.querySelectorAll("item");

    var endFeeds = (offSetFeeds + minFeeds) <= items.length ? offSetFeeds + minFeeds : items.length - 1;

    for (var i = offSetFeeds; i < endFeeds; i++) {

        let el = items[i];

        let html = `
                            <article>
                              <h4>${el.querySelector("title").innerHTML} alt="RSS title"</h4>
                              <h5>
                                <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
                                  ${el.querySelector("title").innerHTML}
                                </a>
                              </h5>
                            </article>
                          `;

        elem.insertAdjacentHTML('beforeend', html);

    };


    offSetFeeds += minFeeds;

    if (offSetFeeds > items.length) {

        offSetFeeds = items.length;

        let btn = document.getElementById("btnLoad");

        btn.innerText = "No more Feeds";

    }

}


// get all the news feed collection
async function getFeeds() {
    try {

        fetch(URL)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {

                dataFeeds = data;

                loadFeeds(dataFeeds);

            });

    } catch (err) {
        alert(err); // Failed to fetch Feeds - on a production environment this could be logged into a logs file
    }

}


// load news items on demand
function btnGetFeeds_OnClick() {

    loadFeeds(dataFeeds);

}
