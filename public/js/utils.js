//App Constants

var ENVIRONMENT = "sandbox";
//var ENVIRONMENT = "production";
var baseUrl = "https://sweltering-fire-2158.firebaseio.com/"+ENVIRONMENT+"/users/";
var historyNode = "/history/"
var queueNode = "/mQueue/"
var errorId = "errorId"

//Utility functions
function getHistoryPath(userId)
{
    return baseUrl + userId + historyNode;
}

function deleteLink(uid, key)
{
    var nodeToDelete = new Firebase(getHistoryPath(uid) + key);
    nodeToDelete.set(null);
}

function getUserPath(userId)
{
    return baseUrl + userId;
}

function getQueuePath(userId)
{
    return getUserPath(userId) + queueNode;
}

function fireLink(id, link)
{
    pushedToQueue = true;
    var node = new Firebase(getQueuePath(id)+ getRandomId());
    node.set(link);
}

function getRandomId()
{
    var randLetter1 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var randLetter2 = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    var uniqid = (randLetter1 + Date.now()).substring(0,8) + randLetter2;
    return uniqid.toLowerCase();
}

 function initialNonMatchingInput(input, link)
{
    var matchIndex = link.indexOf(input);
    if(matchIndex > 0)
    {
       return link.substring(0, matchIndex);
    }
    return "";
}


function matchingInput(input, link)
{
    var matchIndex = link.indexOf(input);
    return link.substring(matchIndex, matchIndex+input.length);
}


function lastNonMatchingInput(input, link)
{
    var matchIndex = link.indexOf(input);
    return link.substring(matchIndex+input.length, link.length);
}

$(document).ready(function() {

	$('.popup').css({ opacity: 0 });

	$('.form-container').submit(function() {
		if(!$('.form-container .search-field').val() || $('.form-container .search-field').val() == "Type search text here...") {
			$('.popup').css({ opacity: 0 });
			$('.popup').animate(
				{ opacity: 1 },
				{
					duration: 'slow',
					easing: 'easeOutBounce'
				});
			return false;
		}
	});

	$('.form-container .search-field').focus(function() {
		if($(this).val() == "Type search text here...") {
			this.value = "";
		}
	});

	$('.form-container .search-field').keydown(function() {
		$('.popup').css({ opacity: 0 });
	});

});
