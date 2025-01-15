import { http, HttpResponse } from 'msw';
import type { UserData } from '@/types/user';

export const handlers = [
  http.get('https://reqres.in/api/users', ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    if (page === '1') {
      return HttpResponse.json<UserData>({
        page: 1,
        per_page: 6,
        total: 12,
        total_pages: 2,
        data: [
          {
            id: 1,
            email: 'george.bluth@reqres.in',
            first_name: 'George',
            last_name: 'Bluth',
            avatar: 'https://reqres.in/img/faces/1-image.jpg',
          },
          {
            id: 2,
            email: 'janet.weaver@reqres.in',
            first_name: 'Janet',
            last_name: 'Weaver',
            avatar: 'https://reqres.in/img/faces/2-image.jpg',
          },
          {
            id: 3,
            email: 'emma.wong@reqres.in',
            first_name: 'Emma',
            last_name: 'Wong',
            avatar: 'https://reqres.in/img/faces/3-image.jpg',
          },
        ],
        support: {
          url: 'https://reqres.in/#support-heading',
          text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
        },
      });
    }
  }),
];
