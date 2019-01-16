const handleClickOnJar = function(jar){
  jar.style.visibility = "hidden";
  setTimeout(()=> {
    jar.style.visibility = "visible";
  },1000);
}

const initialize = function(){
  const jar = document.getElementById('jar');
  jar.onclick = handleClickOnJar.bind(null,jar);
}
window.onload = initialize;