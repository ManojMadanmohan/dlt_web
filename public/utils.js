
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