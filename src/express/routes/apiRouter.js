const apiRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/dbMethods/usersMethods');


//middle-ware here
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

// sub-routers here
const usersRouter = require('./subRouters/usersRouters');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;