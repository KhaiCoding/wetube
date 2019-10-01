import passport from "passport";
import User from "./models/User";

// pre-made module may we can use one function.
passport.use(User.createStrategy());

// using only id
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
