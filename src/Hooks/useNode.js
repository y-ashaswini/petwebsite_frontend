const useNode = () => {
  const insertNode = function (
    tree,
    commentId,
    item,
    username,
    userid,
    attachment
  ) {
    if (tree.id === commentId) {
      const push_comment = {
        id: new Date().getTime(),
        name: item,
        username: username,
        userid: userid,
        attachment: attachment,
        time: new Date().toISOString(),
        items: [],
      };
      tree.items.unshift(push_comment);
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item, username, userid, attachment);
    });

    return { items: latestNode, ...tree };
  };

  const deleteNode = (tree, id, triggered_by_user) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        if (currentItem.userid === triggered_by_user) {
          // console.log("deleting comment by ", currentItem.userid);
          tree.items.splice(i, 1);
          return tree;
        } else {
          // console.log("user "+triggered_by_user+" not authorised to delete comment by "+currentItem.userid);
          break;
        }
      } else {
        deleteNode(currentItem, id, triggered_by_user);
      }
    }
    return tree;
  };

  return { insertNode, deleteNode };
};

export default useNode;
