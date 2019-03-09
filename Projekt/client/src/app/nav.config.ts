import { NavigationGroup } from './shell/navigation/types/navigation-group.interface';
import { Permission } from './models/permission.enum';

export const navMenu: NavigationGroup[] = [
    {
        title: 'nav.inventory',
        items: [
            {
                label: 'nav.inventory',
                icon: 'view_list',
                route: ['/items']
            },
            {
                label: 'nav.types',
                icon: 'view_compact',
                route: ['/types/view']
            }
        ]
    },
    {
        title: 'nav.admin',
        requiredPermission: [Permission.GLOBAL_ADMIN, Permission.LOCAL_ADMIN],
        items: [
            {
                requiredPermission: [Permission.GLOBAL_ADMIN, Permission.LOCAL_ADMIN],
                label: 'nav.roles',
                icon: 'view_compact',
                route: ['/roles/view']
            },
            {
                requiredPermission: [Permission.GLOBAL_ADMIN, Permission.LOCAL_ADMIN],
                label: 'nav.user',
                icon: 'account_circle',
                route: ['/user', 'view']
            },
            {
                requiredPermission: [Permission.GLOBAL_ADMIN],
                label: 'nav.companies',
                icon: 'work',
                route: ['/companies', 'view']
            }
        ]
    }
];
