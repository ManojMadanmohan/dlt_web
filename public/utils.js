
function getPath(userId)
{
return baseUrl + userId + historyNode;
}

function deleteLink(uid, key)
{
    var nodeToDelete = new Firebase(getPath(uid) + key);
    nodeToDelete.set(null);
}