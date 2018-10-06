
document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");

  // Mobile Navigation begins
  var menu_button = document.getElementById('menu_button');
  var mobile_links = document.getElementById('mobile_links_wrapper');
  var menu_close = document.getElementById('menu_close');
  var window_width = window.innerWidth;

  menu_button.addEventListener("click", function(e){
    // alert("menu clicked");
    if (mobile_links.style.display == "none"){
      mobile_links.style.display = "block";
    } else {
      mobile_links.style.display = "none";
    }    
  });

  menu_close.addEventListener("click", function(e){
    if (mobile_links.style.display === "block") {
      mobile_links.style.display = "none";
    }
  });

  window.addEventListener("resize", function(e){
    if(window.innerWidth > 600){
      if (mobile_links.style.display === "block") {
        mobile_links.style.display = "none";
      }
    }
  });



  // mobile navigation ends

  // API
  var retrieving_data  = false;
  var page = 1;
  var point_to_page_end;
  var raw_data;
  var post_data;
  var all_news = document.getElementsByClassName('all_news')[0];
  var retrieving_news = document.getElementsByClassName('retrieving_news')[0];
  

  axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
  .then((response) => {
    console.log(response.data);
    // newsdiv.innerHTML = response.data;
    
    response.data.forEach(element => {
        axios.get('https://hacker-news.firebaseio.com/v0/item/' + element + '.json?print=pretty')
          .then((result) => {
            // var BreakException = {};
            // page++;
            // if(page == 5){
            //   throw BreakException;
            // }
            // console.log(result.data.url);
            // var post_link_wrapper = document.createElement('a');
            // post_link_wrapper.setAttribute('href', result.data.url);
            // var post_wrapper = document.createElement('div');
            
            // post_image = document.createElement('img');
            // // post_image.src = result.data.url.document.getElementsByTagName('img')[0].src;
            
            // var content_wrapper = document.createElement('div');
            // content_wrapper.classList.add('news_content');

            // var post_category = document.createElement('p');
            // post_category.innerHTML = result.data.type;
            // post_category.classList.add('content_category');

            // var post_title = document.createElement('h3');
            // post_title.innerHTML = result.data.title;
            // post_title.classList.add('content_title');

            // var post_content = document.createElement('p');
            // // post_content.innerHTML = result.data.text;
            // post_content.appendChild(document.createTextNode(result.data.text));
            // post_content.classList.add('content');
            
            // post_link_wrapper.appendChild(post_wrapper);
            // post_wrapper.appendChild(content_wrapper);
            // content_wrapper.appendChild(post_category);
            // content_wrapper.appendChild(post_title);
            // content_wrapper.appendChild(post_content);

            // all_news.appendChild(post_link_wrapper);

            
          })
          .catch(error => console.log(error));
    });
  })
  .catch(error => console.log(error));

  getImageFromMetadata('https://www.lightbluetouchpaper.org/2018/10/05/making-sense-of-the-supermicro-motherboard-attack/');

   function getImageFromMetadata(url){
     axios.get(url)
      .then(response => {
        console.log(response.data)
      });

   }

});