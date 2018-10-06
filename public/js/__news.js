
document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");

    // Mobile Navigation begins
    var menu_button = document.getElementById('menu_button');
    var mobile_links = document.getElementById('mobile_links_wrapper');
    var menu_close = document.getElementById('menu_close');
    var window_width = window.innerWidth;

    menu_button.addEventListener("click", function (e) {
        // alert("menu clicked");
        if (mobile_links.style.display == "none") {
            mobile_links.style.display = "block";
        } else {
            mobile_links.style.display = "none";
        }
    });

    menu_close.addEventListener("click", function (e) {
        if (mobile_links.style.display === "block") {
            mobile_links.style.display = "none";
        }
    });

    window.addEventListener("resize", function (e) {
        if (window.innerWidth > 600) {
            if (mobile_links.style.display === "block") {
                mobile_links.style.display = "none";
            }
        }
    });



    // mobile navigation ends

    // API
    // var raw_data = [];

    // var x_raw = new XMLHttpRequest();
    // var raw_data2;
    // var data = [];

    // x_raw.onload = function() {
    //     if (x_raw.status == 200){
            
    //         JSON.parse(x_raw.responseText).forEach(element => {
    //             x_json = new XMLHttpRequest();

    //             x_json.onload = function () {
    //                 console.log(JSON.parse(x_json.responseText));
    //                 // console.log(element)
    //             }

    //             x_json.open('GET', 'https://hacker-news.firebaseio.com/v0/item/' + element + '.json?print=pretty', true);
    //             x_json.send();
    //         });
                
            

    //     }
        
    // }
   

    // x_raw.open('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json', true);
    // x_raw.send();

    // console.log(data);
    // console.log(typeof data);
    // data.splice(0,-1);
    // console.log(data);
    // console.log(typeof data);

    // console.log(Object.keys(data));

    var retrieving = false;
    var distToBottom;
    
    function getDistFromBottom() {

        var scrollPosition = window.pageYOffset;
        var windowSize = window.innerHeight;
        var bodyHeight = document.body.offsetHeight;

        return Math.max(bodyHeight - (scrollPosition + windowSize), 0);

    }


    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then((response) => {
            console.log(response.data);
            // newsdiv.innerHTML = response.data;

            response.data.forEach(element => {
                axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json?print=pretty')
                    .then((result) => {
                        console.log(result.data.url);
                        // data.push(result.data);
                    })
                    .catch(error => console.log(error));
            });
        })
        .catch(error => console.log(error));

        


});