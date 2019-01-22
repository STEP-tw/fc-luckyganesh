const getCommentsId = (document) => document.getElementById('comments');

const createElement = (document, tag) => document.createElement(tag);

const format = function (comment) {
  const properties = [comment.date.toLocaleString(), comment.name, comment.comment];
  const makeTR = createElement(document, 'tr');
  properties.forEach(function (property) {
    const makeTD = createElement(document, 'td');
    makeTD.innerText = property;
    makeTR.appendChild(makeTD);
  });
  return makeTR;
}

const loadComments = function () {
  fetch('/comments.json')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let html = getCommentsId(document);
      html.innerText = "";
      comments = data.slice().reverse();
      comments.forEach(comment => {
        const htmlComment = format(comment);
        html.appendChild(htmlComment);
      });
    })
}

const clearForm = function(form){
  form.name.value = "";
  form.comment.value = "";
}

const getDetailsOfForm = function(form){
  const name = form.name.value;
  const comment = form.comment.value;
  return { name, comment };
}

const isNotValidForm = function(body){
  return body.name == "" || body.comment == "";
}

const submitForm = function () {
  let form = document.getElementById('form');
  const body = getDetailsOfForm(form);
  if (isNotValidForm(body)) {
    return;
  }
  fetch('/uploadData',{
    method:'POST',
    body:JSON.stringify(body)
  }).then(function(){
    loadComments();
    clearForm(form);
  })
  return;
}

const initialize = function () {
  loadComments();
  document.getElementById('refresh').onclick = loadComments;
}

window.onload = initialize;