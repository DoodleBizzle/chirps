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
const usersRouter = require('./subRouters/usersRouter');
apiRouter.use('/users', usersRouter);

const chirpsRouter = require('./subRouters/chirpsRouter');
apiRouter.use('/chirps', chirpsRouter);

apiRouter.use((error, req, res, next) => {
  console.error(error);
  res.send({name: error.name, message: error.message})
})

module.exports = apiRouter;