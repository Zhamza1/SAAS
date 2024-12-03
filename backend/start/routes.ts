/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import UsersController from '#controllers/http/users_controllers';
import AuthController from '#controllers/http/authController';
import AuthMiddleware from '#middleware/authMiddleware';
import router from '@adonisjs/core/services/router';

const authMiddleware = new AuthMiddleware();

router.group(() => {
  router.get('users', [UsersController, 'index'])
  router.post('users', [UsersController, 'store'])
  router.get('users/:id', [UsersController, 'show'])
  router.put('users/:id', [UsersController, 'update'])
  router.delete('users/:id', [UsersController, 'destroy'])
}).prefix('/api')
// .use([AuthMiddleware])
.use([authMiddleware.handle.bind(authMiddleware)]);


router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
}).prefix('/api/auth');