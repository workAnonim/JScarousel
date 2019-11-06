var imgCount = document.getElementById("question_img").getElementsByTagName("img").length;
var parentDivWrapper = document.getElementById("question_img");
var divWrapper = document.createElement("div");
  
divWrapper.className = "wrapper";
parentDivWrapper.appendChild(divWrapper);
  
var divParentImages = document.createElement("div");
var divImages = document.createElement("div");
var divText = document.createElement("div");

divParentImages.className = "parentImages";
divImages.className = "images";
divImages.setAttribute("title", "Для увеличения изображения нажмите и удерживайте правую кнопку мыши");
divText.className = "imagesText";

divText.innerHTML ="Рисунок 1";

divWrapper.appendChild(divParentImages);
divParentImages.appendChild(divText);
divParentImages.appendChild(divImages);

var imgActive = document.createElement("img");
imgActive.className = "active";
divImages.appendChild(imgActive);

var ulImageList = document.createElement("ul");
ulImageList.className = "image-list";
divWrapper.appendChild(ulImageList);

for(var i=0; i != imgCount; i++)
{
  var imageInList = document.getElementById("question_img").getElementsByTagName("img")[0];
  var textInList = document.createElement("div");
  var row = i+1;
  textInList.className = "item_min_text";
  textInList.innerHTML = "Рисунок "+ row;

  var liImageitem = document.createElement("li");

  imageInList.className = "item_min_img";
  liImageitem.className = "image-item";
  ulImageList.appendChild(liImageitem);
  liImageitem.appendChild(textInList);
  liImageitem.appendChild(imageInList);
}

const activeImage = document.querySelector(".images .active");
const product = document.querySelectorAll(".image-list .image-item");
const productImages = document.querySelectorAll(".image-list img");


activeImage.src = productImages[0].src;
product[0].style.display = "none"; 

function changeImage(e) 
{
  activeImage.src = e.target.src;
  for(var i=0; i != productImages.length; i++)
  {
    if(productImages[i].src == activeImage.src)
    {
      product[i].style.display = "none"; 
      divText.textContent = product[i].getElementsByClassName("item_min_text")[0].textContent;
    }
  else
    {
      product[i].style.display = "inline-block"; 
    }
  }
}

productImages.forEach(image => image.addEventListener("click", changeImage));

//off context menu
document.oncontextmenu = function (){return false};

//clink right mouse button on active block
document.querySelector(".active").onmousedown  = function (e) {
  if(e.which == 3)
  {
    if(document.getElementById('magnifier') == null)
    {
      magnifier(e);
    }
    else
      document.getElementById('magnifier').remove();
  }
}
document.querySelector(".active").oncontextmenu = function () {
  if(document.getElementById('magnifier') != null)
    document.getElementById('magnifier').remove();
  };

document.querySelector(".active").onmouseleave = function () {
  if(document.getElementById('magnifier') != null)
    document.getElementById('magnifier').remove();
  };

  function magnifier()
  {
    //koeff - magnifier zoom
    //delta - 50% magnifier width
    var koeff = 2;
    var delta = 87.5;
  
    var divMagnifier = document.createElement("div");
  
    divMagnifier.id = "magnifier";
      
    var imagesDiv = document.querySelector(".images");
    var activeDiv = document.querySelector(".active");
        
    imagesDiv.appendChild(divMagnifier); 
  
    //hasPadding - the distance between imagesDiv and activeDiv
    var hasPadding = (imagesDiv.offsetWidth - activeDiv.offsetWidth)/2;
  
    divMagnifier.style.backgroundImage = "url(" + document.querySelector(".active").src +")";
    divMagnifier.style.backgroundSize = activeDiv.width * koeff + "px " + activeDiv.height * koeff + "px";
  
    //top end left offsets magnifier
    if(Math.sign(hasPadding) == 1)
    {
      divMagnifier.style.left = getCurCoordsInsideRect().x - delta + hasPadding-8;//scroll 16px/2
    }
    else
    {
      divMagnifier.style.left = getCurCoordsInsideRect().x - delta;
    }
    divMagnifier.style.top = getCurCoordsInsideRect().y - delta ;
    /***************/
  
    //start background position
    divMagnifier.style.backgroundPosition = "-" + (getCurCoordsInsideRect().x * koeff - delta) + "px " + "-" + (getCurCoordsInsideRect().y * koeff - delta) + "px";
    
    onmousemove = function(e){
      var offsetsX =  activeDiv.offsetLeft;
      var offsetsY =  activeDiv.offsetTop;  
      //magnifier position
      divMagnifier.style.left = e.offsetX - delta + offsetsX + "px";
      divMagnifier.style.top = e.offsetY - delta + offsetsY + "px";
      //offsets background
      divMagnifier.style.backgroundPosition = "-"+(e.offsetX * koeff  - delta ) + "px " + "-" + (e.offsetY * koeff - delta) +"px";
    }
  }

function getCurCoordsInsideRect() {
  var x = event.offsetX == undefined ? event.layerX : event.offsetX;
  var y = event.offsetY == undefined ? event.layerY : event.offsetY;
 
  return {x:x, y:y};
}

function altb(a, b)
{
  /*  returns true if a less than b, otherwise false */
  return (a%b == a);
}