import mongoose from "mongoose";
import { Store } from "express-session"; // or require('connect').session.Store;

var SessionSchema = new mongoose.Schema({
  sid: { type: String, required: true, unique: true, index: true },
  expires: { type: Number, index: true, required: true },
  data: {},
});

var Session = mongoose.model("Session", SessionSchema);

SessionSchema.pre("save", function (next) {
  Session.remove({ expires: { $lt: Date.now() } }, function (err, num) {
    try {
      if (num > 0) {
        console.log("Removed expired SIDs.");
      }
    } catch (err) {
      console.err(err);
    }
  });

  next();
});

var SessionStore = function (options) {
  Store.call(this, options);
};

SessionStore.prototype.__proto__ = Store.prototype;

SessionStore.prototype.get = function (sid, fn) {
  console.log("get", sid);

  Session.findOne({ sid: sid }, function (err, doc) {
    try {
      if (doc) {
        fn(null, doc.data);
      } else {
        fn();
      }
    } catch (err) {
      fn(err);
    }
  });
};

SessionStore.prototype.set = function (sid, sess, fn) {
  console.log("set", sid, sess);

  Session.findOne({ sid: sid }, function (err, doc) {
    try {
      if (doc) {
        doc.data = sess;
        doc.expires = sess.cookie["_expires"].getTime();

        doc.save(function (err) {
          try {
            fn(null, sess);
          } catch (err) {
            fn(err);
          }
        });
      } else {
        var session = new Session();
        session.sid = sid;
        session.data = sess;
        session.expires = sess.cookie["_expires"].getTime();

        session.save(function (err) {
          try {
            fn(null, sess);
          } catch (err) {
            fn(err);
          }
        });
      }
    } catch (err) {
      fn(err);
    }
  });
};

SessionStore.prototype.destroy = function (sid, fn) {
  Session.findOne({ sid: sid }, function (err, doc) {
    try {
      if (doc) {
        doc.remove(function (err) {
          try {
            fn();
          } catch (err) {
            fn(err);
          }
        });
      } else {
        fn();
      }
    } catch (err) {
      fn(err);
    }
  });
};

Sessi;
export { SessionStore };
