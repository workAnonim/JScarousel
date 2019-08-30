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
    divText.className = "imagesText";
  
    divText.innerHTML ="Рисунок 1";
  
    divWrapper.appendChild(divParentImages);
    divParentImages.appendChild(divImages);
    divParentImages.appendChild(divText)
  
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
      liImageitem.appendChild(imageInList);
      liImageitem.appendChild(textInList);
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
          product[i].style.display = "block"; 
        }
      }
    }
  
  productImages.forEach(image => image.addEventListener("click", changeImage));

  document.querySelector(".active").oncontextmenu  = function () {
    console.log("Лупа за Пупу ");
} 

