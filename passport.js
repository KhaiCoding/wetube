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
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://curly-bulldog-81.localtunnel.me${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

// making error : Failed to serialize user into session
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
