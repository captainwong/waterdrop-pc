import { Home } from '@/pages/home/home';
import { My } from '@/pages/my/my';
import { NotFound } from '@/pages/404/notFound';
import { Organization } from '@/pages/organization/organization';
import { NoOrganization } from '@/pages/noOrganization/NoOrganization';
import { Student } from '@/pages/student/student';
import { ROUTE_KEYS } from './menu';

export const ROUTE_COMPONENTS = {
  [ROUTE_KEYS.HOME]: Home,
  [ROUTE_KEYS.NOT_FOUND]: NotFound,
  [ROUTE_KEYS.MY]: My,
  [ROUTE_KEYS.ORGANIZATION]: Organization,
  [ROUTE_KEYS.NO_ORG]: NoOrganization,
  [ROUTE_KEYS.STUDENT]: Student,
};
