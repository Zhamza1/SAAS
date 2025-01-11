/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import UsersController from '#controllers/http/users_controllers'
import AuthController from '#controllers/http/authController'
import AuthMiddleware from '#middleware/authMiddleware'
import router from '@adonisjs/core/services/router'
import RdvsController from '#controllers/http/rdvs_controllers'
import PaymentController from '#controllers/http/paymentController'
import StripeWebhookController from '#controllers/http/stripeWebhookController'
import rawBodyMiddleware from '#middleware/rawBodyMiddleware'

const authMiddleware = new AuthMiddleware()

router
  .group(() => {
    router.get('users', [UsersController, 'index'])
    router.post('users', [UsersController, 'store'])
    router.get('users/:id', [UsersController, 'show'])
    router.put('users/:id', [UsersController, 'update'])
    router.delete('users/:id', [UsersController, 'destroy'])
  })
  .prefix('/api/')
  // .use([AuthMiddleware])
  .use([authMiddleware.handle.bind(authMiddleware)])

router
  .group(() => {
    router.get('rdvs', [RdvsController, 'index'])
    router.post('rdvs', [RdvsController, 'store'])
    router.get('rdvs/:id', [RdvsController, 'show'])
    router.put('rdvs/:id', [RdvsController, 'update'])
    router.delete('rdvs/:id', [RdvsController, 'destroy'])
  })
  .prefix('/api/')
  .use([authMiddleware.handle.bind(authMiddleware)])

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  })
  .prefix('/api/auth/')

router
  .group(() => {
    router.post('create-checkout-session', [PaymentController, 'createCheckoutSession'])
    router
      .post('/webhooks/stripe', [StripeWebhookController, 'handleWebhook'])
      .middleware([rawBodyMiddleware])
  })
  .prefix('/api/payments/')
