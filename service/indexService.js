const ObjectId = require("mongodb").ObjectId;
const database = require("../db/database");

module.exports.getPosts = async (postId = null, limit, skip, projection = {}) => {
  try {
    let o_id = postId ? ObjectId(postId) : null;
    let query = o_id ? { _id: o_id } : {};
    let results = await database.findvalues("sample_training", "posts", query, projection, limit, skip);
    return postId ? results[0] : results;
  } catch(err) {
      console.error("Error in getPost", err);
      throw new Error(err);
  }
  
};

module.exports.savePost = async (post) => {
    try {
        let result = await database.insertvalues("sample_training", "posts", post);
        return result;
    } catch(err) {
        console.error("Error Saving Post", err);
        throw new Error(err);
    }
}