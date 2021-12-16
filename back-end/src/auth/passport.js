const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const Admin = require("../models").Admin;

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		},
		(jwtPayload, done) => {
			Admin.findOne({ where: { id: jwtPayload.id } })
				.then((admin) => {
					if (admin) {
						return done(null, admin);
					}
					return done(null, false);
				})
				.catch((error) => {
					return done(error, false);
				});
		}
	)
);
