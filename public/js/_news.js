function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// var posts = "default";
var posts = getParameterByName('posts') || "default";
var start_point = 2;


document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");

  // Mobile Navigation begins
  var menu_button = document.getElementById('menu_button');
  var mobile_links = document.getElementById('mobile_links_wrapper');
  var menu_close = document.getElementById('menu_close');


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
  var all_news = document.getElementsByClassName('all_news')[0];
  var first_news = document.getElementsByClassName('first_news')[0];


  var even = document.getElementById('even');
  var odd = document.getElementById('odd');
  // even.addEventListener('click', loadApi(0));
  // odd.addEventListener('click', loadApi(1));


  loadApi(0);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  var load_more = document.getElementById('load_more');
  var loader = document.getElementsByClassName('loader')[0];
  document.addEventListener("scroll", async function (event) {
    if (inView(loader) || inView(load_more)) {
      // console.log(posts);
      sleep(0000).then(() => {
        loadApi(start_point);
        start_point += 30;
      });

    }
  });


  function loadApi(start) {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then((response) => {
        get30(start, start + 30, response.data);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }



  function get30(start, length, data) {

    if (posts === "default") {

      if (start == 0 || start == 1) {
        axios.get('https://hacker-news.firebaseio.com/v0/item/' + data[start] + '.json?print=pretty')
          .then((result) => {
            renderFirstView(result.data);
          })
          .catch(error => console.log(error));

      } if (start > 1) {
        for (var i = start; i < length; i++) {
          let element = data[i];
          axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json?print=pretty')
            .then((result) => {
              renderView(result.data);
              console.log(result.data);
            })
            .catch(error => console.log(error));
        }
      }

    }

    if (posts === "even") {
      length *= 2;
      start += 0;
      if (start == 0 || start == 1) {
        axios.get('https://hacker-news.firebaseio.com/v0/item/' + data[start] + '.json?print=pretty')
          .then((result) => {
            renderFirstView(result.data);
          })
          .catch(error => console.log(error));

      } if (start > 1) {
        for (var i = start; i < length; i += 2) {
          let element = data[i];
          axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json?print=pretty')
            .then((result) => {
              renderView(result.data);
            })
            .catch(error => console.log(error));
        }
      }

    }

    if (posts === "odd") {
      length *= 2;
      start += 1
      if (start == 0 || start == 1) {
        axios.get('https://hacker-news.firebaseio.com/v0/item/' + data[start] + '.json?print=pretty')
          .then((result) => {
            renderFirstView(result.data);
          })
          .catch(error => console.log(error));

      } if (start > 1) {
        for (var i = start; i < length; i += 2) {
          let element = data[i];
          axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json?print=pretty')
            .then((result) => {
              renderView(result.data);
            })
            .catch(error => console.log(error));
        }
      }
    }
  }

  function renderFirstView(data) {
    var post_link_wrapper = document.createElement('a');
    post_link_wrapper.setAttribute('href', data.url);
    var post_wrapper = document.createElement('div');

    post_image = document.createElement('img');
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
    post_content.appendChild(document.createTextNode(data.text));
    post_content.classList.add('content');

    post_link_wrapper.appendChild(post_wrapper);
    post_wrapper.appendChild(content_wrapper);
    content_wrapper.appendChild(post_category);
    content_wrapper.appendChild(post_title);
    content_wrapper.appendChild(post_content);

    first_news.appendChild(post_link_wrapper);
  }
  function renderView(data) {
    var post_link_wrapper = document.createElement('a');
    post_link_wrapper.setAttribute('href', data.url);
    var post_wrapper = document.createElement('div');

    post_image = document.createElement('img');
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
    post_content.appendChild(document.createTextNode(data.text));
    post_content.classList.add('content');

    post_link_wrapper.appendChild(post_wrapper);
    post_wrapper.appendChild(content_wrapper);
    content_wrapper.appendChild(post_category);
    content_wrapper.appendChild(post_title);
    content_wrapper.appendChild(post_content);

    all_news.appendChild(post_link_wrapper);
  }




  function inView(load) {
    var loading = load.getBoundingClientRect();
    return (
      loading.top >= 0 &&
      loading.left >= 0 &&
      loading.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      loading.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

});