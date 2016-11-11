function createArray(length) {
  var arr = new Array(length || 0), i = length;
  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  } 
  return arr;
}

function removeNumber(val) {
  var index = numbers.indexOf(rand);
  numbers.splice(index, 2);
}

function getCookie(pageName) {
  //console.log("Find a page in action");
  var cookies = document.cookie;
  var cookies_size = cookies.split(";").length;
  var found = "404";
  //console.log("The query is: " + pageName);
  for(var i=0; i < cookies_size; i++) {
    if(cookies.split(";")[i].split("=")[0].trim() == pageName ) {
      //Found it, take the result
      found = cookies.split(";")[i].split("=")[1];
      //console.log("Found a last saved page, looks like: "+found);
      break;
    } else {
      //console.log("Keep searching...");
    }
  }
  return found;
}

function killCookie($cookieName) {
  //console.log("Searching for cookie to kill...");
  var cookies = document.cookie;
  var cookies_size = cookies.split(";").length;
  var $found = "404";
  //console.log("The ID of the cookie is: " + $cookieName);
  for(var i=0; i < cookies_size; i++) {
    if(cookies.split(";")[i].split("=")[0].trim().indexOf($cookieName) != -1 ) {
      //Found it, take the result and cookie name
      var $cookieFounded = cookies.split(";")[i].split("=")[0].trim();
      $found = cookies.split(";")[i].split("=")[1];
      //console.log("Found the cookie value: "+$found);
      //Kill the cookie
      document.cookie = $cookieFounded + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
      //console.log("The following cookie was successfully killed: "+$cookieFounded);
    } else {
      //console.log("Keep searching...");
    }
  }
  return $found;
}

var board = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]];
var total = [0,0,0,0,0,0,0,0,0];

function searchNumber(number) {
  var foundNumber = 0;
  for(var i = 0; i < 9; i++) {
    if(number == total[i]) {
      foundNumber++;
    }
    
    for(var j = 0; j < 9; j++) {
      if(number == board[i][j]) {
        foundNumber++;
      }
    }
  }
  
  //console.log("Found '"+number+"' "+foundNumber+" times in the board");
  return foundNumber;
}

function playGame() {
  killCookie('numb'); 
  $(".board").children("input").remove();
  var tileBoard = $(".board");
  var numbers = [[1,2,3,4,5,6,7,8,9], [9,6,7,8,2,3,4,1,5], [4,5,8,1,7,9,2,6,3], [2,3,4,5,6,7,8,9,1], [6,1,5,9,8,2,3,4,7], [7,8,9,3,1,4,5,2,6], [3,4,1,2,9,5,6,7,8], [8,7,2,6,3,1,9,5,4], [5,9,6,7,4,8,1,3,2]];
  
  var storedNumbers = [];
  var expDate = new Date(); 
  expDate.setTime(expDate.getTime()+1*86400000);

  for(var a = 0; a < 9; a++) {
    var b = 0;
    //while(b < 9) {
      var possibleNumbers = [1,2,3,4,5,6,7,8,9];
      var r = Math.floor(Math.random() * (possibleNumbers.length)) + 1;
      var p = b - 1;
      var nCount = searchNumber(r);
      if(r != total[p] && nCount <= 0) {
        if(total[p] == 0) {
          total[p] = r;
        }else{
          total[b] = r;
          b++;
        }
      }

      /*if(b == 8) {
        board[a] = total;
        console.log(board);
      }*/
    //}
  }

  for(var i = 0; i < 9; i++) {
    /*var possibleNumbers = [1,2,3,4,5,6,7,8,9];
    var r = Math.floor(Math.random() * (possibleNumbers.length)) + 1;
    var p = i - 1;
    var nCount = searchNumber(r);
    console.log("Trying to add "+r+". Previous number added was "+total[p]);
    console.log(total[p] === 0);
    console.log(nCount <= 0);
    console.log(r != total[p]);
    if(r != total[p] && nCount <= 0) {
      if(total[p] == 0) {
        console.log("insert on previous");
        total[p] = r;
        i--;
      }else{
        console.log("inserting normally");
        total[i] = r;
      }
    }
    console.log(total);*/
    
    for(var j = 0; j < 9; j++) {
      
      /*var rand = Math.floor(Math.random() * (numbers.length)) + 1;
      //board[i][j] = j + 1;
      
      var prev = j - 1;
      var next = i + 1;
      var numberCount = searchNumber(rand);
      var zeroCount = searchNumber(0);
      if(rand != board[i][prev] && numberCount <= 0) {
        board[i][j] = rand;
      }
      
      if(zeroCount > 0) {
        //console.log("Found "+zeroCount+" empty tiles");  
      }*/
      
      tileBoard.append("<input type='text' pattern='[1-9]' class='tile column "+i+"-"+j+"' value='"+numbers[i][j]+"' name='numb-"+i+"-"+j+"' id='numb-"+i+"-"+j+"' maxlength='1' />");
      storedNumbers.push(numbers[i][j]);
      document.cookie = 'numb-'+i+'-'+j+'='+numbers[i][j]+"; expires="+expDate.toUTCString();
    
      if(j === 2 || j === 5) {
        $("input[name='numb-"+i+"-"+j+"']").css("margin-right","3px");
      }
    
      if(i === 2 || i === 5) {
        $("input[name='numb-"+i+"-"+j+"']").css("margin-bottom","3px");
      }
    }
  }
  
  //console.log(board);

  for(var x = 1; x <= 5; x++) {
    var randomNumber = Math.floor(Math.random() * 9) + 1;
    var randomRow = Math.floor(Math.random() * 9);
    var columnIndex = numbers[randomRow].indexOf(randomNumber);
    $("input[name='numb-"+randomRow+"-"+columnIndex+"']").val("").addClass("empty");
  }
   $("input:not(.empty)").prop("disabled",true);

  function checkEmptyFields() {
    var emptyCounter = 0;
    $(".tile").each(function() {
      var numb = $(this).val();
      if(numb === "") {
        emptyCounter++;
      }
    });
    return emptyCounter;
  }
  
  $(".tile").on('keypress', function (evt) {
    var currentField = $(this);
    if (evt.which < 48 || evt.which > 57)
    {
      evt.preventDefault();
      $(this).val("");
    }
  });
  
  $(".tile").on('focus', function() {
    var currentField = $(this);
    if(currentField.hasClass("wrong")) {
      $(this).val("").removeClass("wrong");
    }
  });

  $(".tile").on('keyup', function() {
    var currentField = $(this);
    if(currentField.val() !== "") {
      var addedNumber = currentField.val();
      var tileName = currentField.attr("name").split("numb-");
      var correctNumber = getCookie("numb-"+tileName[1]);
      if(addedNumber == correctNumber) {
        currentField.removeClass("wrong").addClass("correct");
      }else{
        currentField.removeClass("correct").addClass("wrong");
      }
      
      currentField.next("input:enabled").trigger("focus");
      var inputs = currentField.closest('.board').find(':input:enabled');
      inputs.eq(inputs.index(currentField) + 1).focus();

      var errorCounter = checkEmptyFields();

      if($(".wrong").length <= 0 && errorCounter === 0) {
        $(".success, .overlay").show(200);
      }
      
      if($(".wrong").length > 0 && errorCounter === 0) {
        $(".failure, .overlay").show(200);
      }
    }
  });
}

function closePopup() {
  $(".popup, .overlay").hide();
}