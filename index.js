var jobTags  = document.querySelectorAll(".jobTags");
var jobLists = document.querySelectorAll(".jobLists");
var tags     = document.querySelector("#filterTags");
var clear    = document.querySelector("span");  // selects the first span element that is <span>Clear</span>
var filterTags = [];
// initiate functions 
initiate();
/*showRemovedJobLists();*/
clearTags(); 
// adding an event listener for every span element under the jobTags class
function initiate(){
  for(var i = 0; i < jobTags.length; i++){
    for(var j = 0; j < jobTags[i].children.length; j++)
      jobTags[i].children[j].addEventListener("click", function(){
        document.querySelector(".filter").style.display = "flex";  // show the filter list div
        var jobProfile = this.textContent; 
        clearJobLists(jobProfile); // function call
        var bool = true;
        filterTags.forEach(function(tag){
          if(jobProfile == tag)
            bool = false;
        });
        if(bool)
          addFilterTag(jobProfile); // function call
      });
  }
}
// function to clear all the divs containing the span with the given string
function clearJobLists(jobProfile){
  var bool = false; // to filter the divs which do not contains the given job spec
  for(var i = 0; i < jobLists.length; i++){
    bool = false;
    var techStack = jobLists[i].querySelector(".jobTags").children;
    for(var j = 0; j < techStack.length; j++){
      if(techStack[j].textContent == jobProfile){
        bool = true;
      }
    }
    if(!bool){
        jobLists[i].style.display = "none";
    }
  }
}
// add filter tag to the filter list div
function addFilterTag(jobProfile){
  tags.innerHTML += ("<div>" + "<span>" + jobProfile + "</span>" + "<img src=\"./images/icon-remove.svg\">" + "</div>");
  filterTags.push(jobProfile); 
  showRemovedJobLists();
}
// clear all the filterTags in the filterLists
function clearTags(){
  clear.addEventListener("click", function(){
    tags.innerHTML = "";
    filterTags = [];
    for(var i = 0; i < jobLists.length; i++){
      jobLists[i].style.display = "flex";
    }
    document.querySelector(".filter").style.display = "none";
  });
}
// show all the removed jobLists removed by the selected filterTag
function showRemovedJobLists(){
  var img = document.querySelectorAll("img[src*='remove']");
  for(var i = 0; i < img.length; i++){
    img[i].addEventListener("click", function(){
      console.log(img);
      var span = this.previousElementSibling;
      var indexOfFilterTag = filterTags.indexOf(span.textContent);
      filterTags.splice(indexOfFilterTag, 1);
      for(var j = 0; j< jobLists.length; j++){
        jobLists[j].style.display = "flex";
        var techStack = jobLists[j].querySelector(".jobTags").children;
        filterTags.forEach(function(tag){
          var bool = false;
          for(var k = 0; k < techStack.length; k++){
            if(techStack[k].textContent == tag)
              bool = true;
          }
          if(!bool)
            jobLists[j].style.display = "none";
        });
      }
      span.parentElement.remove();
      if(filterTags.length == 0)
        document.querySelector(".filter").style.display = "none";
    });
  }
}
