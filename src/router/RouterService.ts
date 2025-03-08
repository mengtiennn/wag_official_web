import wagLayout from '@/views/layout/wag/wagLayout.vue'

class RouterService {
    constructor() { }
    private _ignoreFile: string[] = ['home'];

    getParentFolerName(path: string): string {
        let folderName: string[] = path.split("/");
        if (path.length < 2)
            return "";

        let name = folderName[folderName.length - 2];
        return name;
    }
    getLastFileName(path: string): string {
        let names = path.match(/\/([^/]+)\.vue$/);
        if (names.length < 2)
            return "";
        let fileName = names[1];
        //console.log(`path fileName: ${fileName}`);
        return fileName;
    }

    private getWagRoutes() {
        const self = this;
        const routeModules = import.meta.glob('/src/views/pages/wag/*.vue')
        const pages = Object.keys(routeModules)
            .filter(x => self._ignoreFile.includes(x) == false)
            .map(pathTemp => {
                const name = this.getLastFileName(pathTemp);
                return {
                    path: `/${name}`,
                    name: name,
                    meta: { layout: wagLayout },
                    component: routeModules[pathTemp],
                }
            });
        return pages;
    }

    getRoutes(): any {
        let path = this.getWagRoutes()
        const routes = [
            {
                path: '/',
                name: 'HomePage',
                meta: { layout: wagLayout },
                component: () => import('@/views/pages/homePage.vue')
            },
            ...path,
        ];
        return routes;
    }
}

export default RouterService;