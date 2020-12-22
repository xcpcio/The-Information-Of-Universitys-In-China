import { getJSON } from '@/utils';
import { CONFIG } from '@/../config';

export interface University {
    city: string;
    competentDepartment: string;
    id: number;
    level: string;
    logoUrl: string;
    name: string;
    province: string;
    remarks: string;
}

export async function fetchData() {
    const university_info: University[] = (await getJSON(
        [CONFIG.publicPath, CONFIG.dataPrefix, 'university_info.json'].join(''),
    )) as University[];
    return university_info;
}
