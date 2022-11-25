
var textarea = document.getElementById("words");
var longestWordResult = document.getElementById("longest-word");
var shortestWordResult = document.getElementById("shortest-word");
var wordCountResult = document.getElementById("word-count");
var letterCountResult = document.getElementById("letter-count")
var sentenceCountResult = document.getElementById("sentence-count")
var mostRepeatedResult = document.getElementById("most-repeated-word")
// UPDATES EACH ELEMENT
function analyze(){
    if(textarea.value.slice(-1) == " "){
        return;
    }
    longestWordResult.innerHTML = "<b>Longest Word:</b> " + findLongestWord(textarea.value);
    shortestWordResult.innerHTML = "<b>Shortest Word:</b> " + findShortestWord(textarea.value);
    wordCountResult.innerHTML = "<b>Word Count:</b> " + wordAmount(textarea.value);
    letterCountResult.innerHTML = "<b>Letter Count:</b> " + letterAmount(textarea.value);
    sentenceCountResult.innerHTML = "<b>Sentence Count:</b> " + sentenceAmount(textarea.value);

}
function saveData() {
    var data = ""; 
    var response = confirm("Are you sure you want to download analysis data?");
    if(response == true){
        data += "================================= TEXT ================================= \n\n" + textarea.value + "\n\n========================================================================\n" + "Analysis: \n  Longest Word: " + findLongestWord(textarea.value) + "\n  Shortest Word: " + findShortestWord(textarea.value) + "\n  Most Repeated Word: " + mostRepeated(textarea.value)+ "\n  Number of Words: " + wordAmount(textarea.value) + "\n  Number of Characters: " + letterAmount(textarea.value) + "\n  Number of Sentences: " + sentenceAmount(textarea.value) ;


        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', "Analyzed Text");
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    } else {
        return;
    }
    
  }
// CHECKING WHENEVER THE TEXT AREA CHANGES
if (textarea.addEventListener) {
    textarea.addEventListener('input', function() {
      analyze();

    }, false);
  } 
  else if (area.attachEvent) {
    textarea.attachEvent('onpropertychange', function() {
      analyze();
    });
  }


function sentenceAmount(str){
    
    return str.split(/[.!?]+/).length - 1; 

}
function mostRepeated(str){
    var count = 0;
    var maxCount = 0;
    var word = "";
    var words = str.split(" ");
    for(var i = 0; i < words.length; i++){
        count = 1;
        for(var j = i+1; j < words.length; j++){
            if(words[i] == words[j]){
                count++;
            }
        }
        if(count > maxCount){
            if(count == 1){
                word = "None";
            }
            else{
                maxCount = count; 
                word = words[i];
            }
        }
    }
    mostRepeatedResult.innerHTML = "<b>Most Repeated Word:</b> " + word;
    return word;
    
}
function wordAmount(str){
    
    return str.match(/\w[a-z]{0,}/gi).length;
}
function letterAmount(str){
    let letters = str.replace(/ /g, "");
    return letters.length;
}
function findLongestWord(str){
    var word_list = str.match(/\w[a-z]{0,}/gi);
    var longest_word = word_list[0]; 
    for(var x = 1; x < word_list.length; x++){
        if(longest_word.length <= word_list[x].length){
            longest_word = word_list[x];
        }
    }
    return longest_word;
}

function findShortestWord(str){
    var word_list = str.match(/\w[a-z]{0,}/gi);
    var shortest_word = word_list[0]; 
    for(var x = 1; x < word_list.length; x++){
        if(shortest_word.length >= word_list[x].length){
            shortest_word = word_list[x];
        }
    }
    return shortest_word;
}


