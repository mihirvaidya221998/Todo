import apiRoutes from './apiRoutes';

let Routes = [
    {
        path: '/todos',
        router: apiRoutes
    }
]

Routes.initializeRoutes=(app)=>{

    Routes.forEach((route) => app.use( route.path, route.router));
}

export { Routes }