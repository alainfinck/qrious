import * as migration_20260801_173509_add_user_role from './20260801_173509_add_user_role';
import * as migration_20260801_214834_add_business_verticals_and_smart_routing from './20260801_214834_add_business_verticals_and_smart_routing';
import * as migration_20260802_add_redirect_and_scan_count from './20260802_add_redirect_and_scan_count';

export const migrations = [
  {
    up: migration_20260801_173509_add_user_role.up,
    down: migration_20260801_173509_add_user_role.down,
    name: '20260801_173509_add_user_role',
  },
  {
    up: migration_20260801_214834_add_business_verticals_and_smart_routing.up,
    down: migration_20260801_214834_add_business_verticals_and_smart_routing.down,
    name: '20260801_214834_add_business_verticals_and_smart_routing',
  },
  {
    up: migration_20260802_add_redirect_and_scan_count.up,
    down: migration_20260802_add_redirect_and_scan_count.down,
    name: '20260802_add_redirect_and_scan_count',
  },
];

