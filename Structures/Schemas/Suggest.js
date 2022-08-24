const { model, Schema } = require("mongoose");

module.exports = model("SuggestDB", new Schema ({
    GuilID: String,
    MessageID: String,
    Details: Array
}));