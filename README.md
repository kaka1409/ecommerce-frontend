# Ecommerce-frontend

This repository contains frontend code for the CheapDeal mobile app.

## Technologies

- Frontend framework: [Vue](https://vuejs.org/)
- Router: [Vue Router](https://router.vuejs.org/)
- State management: [Pinia](https://pinia.vuejs.org/)
- HTTP client: [Axios](https://axios-http.com/)
- UI framework: [Heroicons](https://heroicons.com/)
- Form validation: [VeeValidate](https://vee-validate.logaretm.com/v4/)
- Toast notifications: [Vue Toastification](https://vue-toastification.com/)
- CSS framework: [TailwindCSS](https://tailwindcss.com/)
- Build tool: [Vite](https://vitejs.dev/)

## Project Installation
```
git clone https://github.com/kaka1409/ecommerce-frontend.git
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Structure

```
CHeapDeals mobile app
├── public
|   ├── favicon.ico
├── src
│   ├── App.vue
│   ├── main.js
│   ├── assets
│   │   ├── main.css
│   ├── router
│   │   ├── index.js
│   ├── views
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   ├── ...
│   ├── components
│   │   ├── ProductItem.vue
│   │   ├── Cart.vue
|   │   ├── ...
|   ├── stores
|   │   ├── cartItem.js
|   │   ├── user.js
|   │   ├── product.js
|   │   ├── order.js
|   │   ├── ...
|   ├── utils
|   │   ├── format.js
├── .env
├── .eslintrc.js
├── .gitignore
├── index.html
├── vite.config.js
├── README.md
├── package.json
```

##