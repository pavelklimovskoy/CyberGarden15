window.onload = function() 
{
    var getUrl = new XMLHttpRequest();
    getUrl.open("GET", "http://192.168.0.12:80/", true);
    getUrl.onload = function ()
    {
        document.getElementById('input-url').value = getUrl.responseText;
    }
    getUrl.send(null);

    getWord();
    
 }

function getWord()
{
    var getFindWord = new XMLHttpRequest();
    getFindWord.open("GET", "http://192.168.0.12:80/", true);
    getFindWord.onload = function ()
    {
        document.getElementById('keyword').innerHTML = getFindWord.responseText;
    }
    getFindWord.send(null);
}

 function loadNewWord()
 {
     newWord = document.getElementById('change-word').value;

     var loadFindWord = new XMLHttpRequest();
     loadFindWord.open("GET", "http://192.168.0.12:80/" + newWord, true);
     loadFindWord.onload = function ()
     {
        console.log("new word loaded");
        getWord();
     }
     loadFindWord.send(null);
 }