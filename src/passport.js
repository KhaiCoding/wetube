import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback
} from "./controllers/userControllers";
import routes from "./routes";

// pre-made module may we can use one function.
passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://glacial-beach-44039.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://glacial-beach-44039.herokuapp.com${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

/*
passport.serializeUser((user, done) => {
  // Strategy 성공 시 호출됨
  done(null, user.id); // 여기의 user._id가 req.session.passport.user에 저장
});
passport.deserializeUser((id, done) => {
  // 매개변수 id는 req.session.passport.user에 저장된 값
  User.findById(id, (err, user) => {
    done(null, user); // 여기의 user가 req.user가 됨
  });
});
*/
