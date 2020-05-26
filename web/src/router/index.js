import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Main from '../views/Main'
import Article from '../views/Article'
import Hero from '../views/Hero'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {path: '/', name: 'home', component: Home},
      {path: '/article/:id', name: 'article', component: Article, props: true}
    ]
  }, {
    path: '/heroes/:id',
    name: 'hero',
    component: Hero,
    props:true
  }

]

const router = new VueRouter({
  routes
})

export default router
