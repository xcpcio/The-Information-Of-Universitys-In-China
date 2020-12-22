import resolve from 'resolve';
import request from './request';

export const getJSON = (url: string) => {
    return new Promise((resolve, reject) => {
        request.get(url).then((response: Response) => {
            if (response.status) {
                resolve(null);
            } else {
                resolve(response);
            }
        });
    });
};
