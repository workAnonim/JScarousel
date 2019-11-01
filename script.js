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
  var active = document.querySelector(".active");
    
  imagesDiv.appendChild(divMagnifier);

  onmousemove = function(e){
    var offsetsX =  active.offsetLeft;
    var offsetsY =  active.offsetTop;  
    //magnifier position
    divMagnifier.style.left = e.offsetX - divMagnifier.getBoundingClientRect().width/2 + offsetsX + "px";
    divMagnifier.style.top = e.offsetY - divMagnifier.getBoundingClientRect().height/2 + offsetsY + "px";

    //изображение и отступы от края, чтоб создавался эффект лупы koeff - коэффицент увеличения
    divMagnifier.style.backgroundImage = "url(" + document.querySelector(".active").src +")";
    divMagnifier.style.backgroundSize = active.width * koeff + "px " + active.height * koeff + "px";
    divMagnifier.style.backgroundPosition = "-"+(e.offsetX * koeff  - delta ) + "px " + "-" + (e.offsetY * koeff - delta) +"px";
  }
}

