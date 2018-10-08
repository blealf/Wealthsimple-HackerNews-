function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Global variable declaration;
var posts = "default";

if (getParameterByName('posts')){
    posts = getParameterByName('posts')
}
var start_point = 0;

// Wait for Dom to load
document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");

    // Mobile Navigation begins
    // Variable declaration
    var menu_button = document.getElementById('menu_button');
    var mobile_links = document.getElementById('mobile_links_wrapper');
    var menu_close = document.getElementById('menu_close');

    // Open hamburger navigation
    function showMobileMenu() {
        if (mobile_links.style.display == "none") {
            mobile_links.style.display = "block";
            mobile_links.className = 'menu_slide_in';
        } else {
            mobile_links.style.display = "none";
        }
    }

    // Close mobile navigation
    function closeMobileNav() {
        if (mobile_links.style.display === "block") {
            mobile_links.className = 'menu_slide_out';
            sleep(1000).then(() => {
                mobile_links.style.display = "none";
            })
            
        }
    }

    // remove mobile navigation on desktop width
    function mobileToDesktop() {
        if (window.innerWidth > 700) {
            if (mobile_links.style.display === "block") {
                mobile_links.style.display = "none";
            }
        }
    }

    menu_button.addEventListener("click", showMobileMenu);
    menu_close.addEventListener("click", closeMobileNav);
    window.addEventListener("resize", mobileToDesktop);
    // mobile navigation ends


    //////////////////////////////////////////////////////////////
    // API

    //Variable declaration
    var all_news = document.getElementsByClassName('all_news')[0];
    var first_news = document.getElementsByClassName('first_news')[0];
    var retrieving = false;

    // var even = document.getElementById('even');
    // var odd = document.getElementById('odd');
    // even.addEventListener('click', loadApi(0));
    // odd.addEventListener('click', loadApi(1));

    // Call the load pai method to start loading news to the page
    var load_more = document.getElementById('load_more');
    var loader = document.getElementsByClassName('loader')[0];

    //function calls
    document.addEventListener("scroll", determineLoadMore);

    loadApi()

    // show loading button
    load_more.style.display = "block";
    loader.style.display = "block";

    // Check if the element is on the page
    function inView(load) {
        var loading = load.getBoundingClientRect();
        return (
            loading.top >= 0 &&
            loading.left >= 0 &&
            loading.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            loading.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Some random sleep function used in determineLoadMore and closeMobileMenu
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    // load more news/posts on scroll
    async function determineLoadMore() {
        if ( inView(load_more)) {
            retrieving = true;
            // console.log(posts);
            sleep(2000).then(() => {

                if (retrieving = true) {
                    retrieving = false;
                    start_point += 3;
                    loadApi();
                    
                }
            });
        }
        
    }


    // Loading the api
    function loadApi(){
        axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then((response) => {
                get30(start_point, response.data.length, response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }



    // Choosing to load first article differently especially for desktop
    function whichToRender(start, code, odd_even) {

        //odd_even indicates if the odd or even button has been clicked
        if ((start == 0 && !odd_even) || (start == 0 && odd_even) ||  (start == 1 && odd_even))  {
            //render the first post
            axios.get('https://hacker-news.firebaseio.com/v0/item/' + code + '.json?print=pretty')
                .then((result) => {
                    renderFirstView(result.data);
                })
                .catch(error => console.log(error));
        }
        if (start != 0 || start != 1) {
            axios.get('https://hacker-news.firebaseio.com/v0/item/' + code + '.json?print=pretty')
                .then((result) => {
                    renderView(result.data);
                })
                .catch(error => console.log(error));
        }
    }

    // get 30 more posts function
    function get30(start, length, data) {
        // default loading
        // data = _.uniq(data);

        
        if (posts === "default") {
            let j = 0;
            for (var i = start; i < length; i++) {
                j++
                let element = data[i];
                whichToRender(i, element);
                if (j == 30){
                    break;
                }
            }
        }

        // Load even numbered posts
        if (posts === "odd") {
            let j = 0;
            length *= 2;
            start += 0;
            for (var i = start; i < length; i += 2) {
                let element = data[i];
                whichToRender(i, element, "odd");
                if (j == 30){
                    break;
                }
            }
        }

        // Load odd numbered posts
        if (posts === "even") {
            let j = 0;
            length *= 2;
            start += 1
            for (var i = start; i < length; i += 2) {
                let element = data[i];
                whichToRender(i, element, "even");
                if (j == 30){
                    break;
                }
            }
        }

        // if (start_point >= length - 2) {
        //     load_more.style.display = "none";
        //     loader.style.display = "none";
        // }
    }

    // Render the first news/post in  different style for desktop
    function renderFirstView(data){
        var post_link_wrapper = document.createElement('a');
        post_link_wrapper.setAttribute('href', data.url);
        post_link_wrapper.setAttribute('target', '_blank');

        post_image = document.createElement('img');
        // post_image.src = '../images/carriers.jpg';
        // post_image.src = result.data.url.document.getElementsByTagName('img')[0].src;

        var content_wrapper = document.createElement('div');
        content_wrapper.classList.add('first_news_content');

        var post_category = document.createElement('p');
        post_category.innerHTML = data.type;
        post_category.classList.add('content_category');

        var post_title = document.createElement('h3');
        post_title.innerHTML = data.title;
        post_title.classList.add('content_title');

        var post_content = document.createElement('p');
        // post_content.innerHTML = result.data.text;
        // post_content.appendChild(document.createTextNode(data.text));
        // post_content.classList.add('content');
        var post_content = document.createElement('p');
        // post_content.innerHTML = result.data.text;
        // post_content.appendChild(document.createTextNode(data.text));
        post_content.classList.add('content');


        // Get the image and description data from the metadata
        axios.get(data.url)
            .then((response) => {
                // console.log(response.data);
                var doc = new DOMParser().parseFromString(response.data, 'text/html');
                var meta = doc.querySelector('meta[property="og:image"]');
                var meta2 = doc.getElementsByTagName('img')[0];
                // var value = meta && meta.getAttribute('content');
                var value = meta.getAttribute('content');
                var value2 = meta2.getAttribute('src');

                var use_attribute = value || value2;
                post_image.src = use_attribute;


                var text = doc.querySelector('meta[property="og:description"]').getAttribute('content');
                var use_text = text || document.createTextNode(data.text);
                post_content.innerHTML = use_text;
                console.log(value);
            })
            .catch(error => console.log(error));

        post_link_wrapper.appendChild(post_image);
        post_link_wrapper.appendChild(content_wrapper);
        content_wrapper.appendChild(post_category);
        content_wrapper.appendChild(post_title);
        content_wrapper.appendChild(post_content);

        first_news.appendChild(post_link_wrapper);
    }

    // redner the news/posts
    function renderView(data){
        var post_link_wrapper = document.createElement('a');
        post_link_wrapper.setAttribute('href', data.url);
        post_link_wrapper.setAttribute('target', '_blank');
        var post_wrapper = document.createElement('div');
        console.log(data.url);

        post_image = document.createElement('img');
        // post_image.src = '../images/carriers.jpg';
        // post_image.src = result.data.url.document.getElementsByTagName('img')[0].src;

        var content_wrapper = document.createElement('div');
        content_wrapper.classList.add('news_content');

        var post_category = document.createElement('p');
        post_category.innerHTML = data.type;
        post_category.classList.add('content_category');

        var post_title = document.createElement('h3');
        post_title.innerHTML = data.title;
        post_title.classList.add('content_title');

        var post_content = document.createElement('p');
        // post_content.innerHTML = result.data.text;
        // post_content.appendChild(document.createTextNode(data.text));
        post_content.classList.add('content');


        // Get the image and description data from the metadata
        axios.get(data.url)
            .then((response) => {
                // console.log(response.data);
                var doc = new DOMParser().parseFromString(response.data, 'text/html');
                var meta = doc.querySelector('meta[property="og:image"]');
                var meta2 = doc.querySelectorAll('img')[0];
                var value = meta && meta.getAttribute('content');
                // var value = meta.getAttribute('content');
                var value2 = meta2.getAttribute('src');

                var use_attribute = value || value2;
                post_image.src = use_attribute;


                var text = doc.querySelector('meta[property="og:description"]').getAttribute('content');
                var use_text = text || document.createTextNode(data.text);
                post_content.innerHTML = use_text;
                console.log(value);
            })
            .catch(error => console.log(error));

        // post_content.innerHTML = getDescription(data.url);
        // post_content.classList.add('content');

        post_link_wrapper.appendChild(post_image);
        post_link_wrapper.appendChild(post_wrapper);        
        post_wrapper.appendChild(content_wrapper);
        // content_wrapper.appendChild(post_category);
        content_wrapper.appendChild(post_title);
        content_wrapper.appendChild(post_content);

        all_news.appendChild(post_link_wrapper);
    }



    // LOTS OF COMMENTED OUT CODE STARTS FROM HERE
    ///////////////////////////////////////

    // function inView(el) {
    //     var scroll = window.scrollY || window.pageYOffset
    //     var boundsTop = el.getBoundingClientRect().top + scroll
        
    //     var viewport = {
    //         top: scroll,
    //         bottom: scroll + window.innerHeight,
    //     }
        
    //     var bounds = {
    //         top: boundsTop,
    //         bottom: boundsTop + el.clientHeight,
    //     }
        
    //     return ( bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom ) 
    //         || ( bounds.top <= viewport.bottom && bounds.top >= viewport.top );
    // }


    // axios.get('https://api.urlmeta.org/?url=http://changelog.complete.org/archives/9938-the-python-unicode-mess')
    //     .then(response => {
    //         console.log(response.data);
    //         // console.log(typeof response);
    //     })
    //     .catch(error => console.log(error));

    
    // https://github.com/cyu/rack-cors/issues/26



    // console.log(getSourceAsDOM("https://www.janestreet.com/tech-talks/effective-programming/"));

    // function getSourceAsDOM(url) {
    //     xmlhttp = new XMLHttpRequest();
    //     xmlhttp.onload(() => {
    //         console.log(xmlhttp.responseText);
    //     })
    //     xmlhttp.open("GET", url, true);
    //     xmlhttp.send();
    //     parser = new DOMParser();
    //     return parser.parseFromString(xmlhttp.responseText, "text/html");
    // }



    // xmlhttp = new XMLHttpRequest();
    // xmlhttp.onload(() => {
    //     console.log(xmlhttp.responseText);
    // })
    // xmlhttp.open("GET", 'https://www.janestreet.com/tech-talks/effective-programming/', true);
    // xmlhttp.send();

    
});