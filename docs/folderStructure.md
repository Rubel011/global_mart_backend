## MVC Structure

```js
├── server.js
├── configs
|    └── db.js
|    └── swaggerconfig.js
├── models
|    └── userModel.js
|    └── productModel.js
|    └── categoryModel.js
|    └── cartModel.js
|    └── orderModel.js
├── routes
|    └── userRoute.js
|    └── productRoute.js
|    └── categoryRoute.js
|    └── cartRoute.js
|    └── orderRoute.js
├──controllers
|    └── userController.js
|    └── productController.js
|    └── categoryController.js
|    └── cartController.js
|    └── orderController.js
├──middlewares
|    └── auth_middleware.js
├──helpers
|    └── otpHelper.js
|    └── sendingEmails.js
|    └── sendingOtpPhone.js
├──views
|    └── home
|         └── home.ejs
|    └── error
|         └── error.ejs
|    └── contact
|         └── contact.ejs
|    └── about
|         └── about.ejs
├──docs
|    └── Database_Schema.png
|    └── FolderStruture.md
|    └── swagger.js
├──.env
├──.gitignore
├──package.json
├──package-lock.json
├──README.md
```