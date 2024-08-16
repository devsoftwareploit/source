function start(){
    var md=localStorage.getItem("md");
    if(md!=null){
        document.getElementById('textarea').innerHTML=md;
        render();
    }
    else{
        var str="# editor by softwareploit";
        document.getElementById('textarea').innerHTML=str;
        render();
    }
}
var i=0;

function convertToHTML(){
  if(i==0){
    i=1;
    document.getElementById("textarea").readOnly = true;
    var md=localStorage.getItem("md");
    document.getElementById("converttohtml").innerHTML="Convert to Markdown";
    var converter = new Remarkable();
    var html = converter.render(md);
    document.getElementById('textarea').value=html;
  }
  else{
    i=0;
    document.getElementById("textarea").readOnly = false;
    document.getElementById("converttohtml").innerHTML="Convert to HTML";
    var md=localStorage.getItem("md");
    document.getElementById('textarea').value=md;
  } 
}


function getFile(id){
  var fileInput =document.getElementById("file-upload");
  var file = document.getElementById("file-upload").files[0];
  var filePath = fileInput.value;
         
  var allowedExtensions =/(\.md)$/i;
    
  if (!allowedExtensions.exec(filePath)) {
      alert('Invalid file type\nChoose a Markdown file');
      fileInput.value = '';
      return false;
  }
  else{
  var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      var md = reader.result;
      document.getElementById("textarea").value=md;
      render();
    };
    reader.onerror = function() {
    console.log(reader.error);
    }
  }
}
