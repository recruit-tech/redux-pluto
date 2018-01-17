const SALON_SEARCH_MAX_COUNT = 50;
const RESULTS_COUNT = 500;

const salonList = [];
for (let i = 1; i <= SALON_SEARCH_MAX_COUNT; i++) {
  salonList.push(
    {
      id: i.toString(),
      last_update: '2017-01-04 00:00:00',
      name: `サロン${i}`,
      logo_image: 'https://cataas.com/cat',
      logo_image_square: 'https://cataas.com/cat?height=100',
      urls: {
        pc: 'https://cataas.com/cat',
        mobile: 'https://cataas.com/cat?height=100',
      },
      description: `コメント${i}`,
    },
  );
}

module.exports = {
  request: {
    path: '/beauty/salon',
    method: 'GET',
    params: {
      keyword: '{:keyword}',
      page: '{:page}',
      start: '{:start}',
    },
    values: {
      keyword: 'サロン',
      page: '0',
      start: 1,
    },
  },
  response: {
    body: {
      results: {
        results_available: '{:results_available}',
        results_returned: '{:results_returned}',
        results_start: '{:results_start}',
        status: '{:status}',
        salon: '{:salon}',
      },
    },
    values: {
      results_available: RESULTS_COUNT.toString(),
      results_returned: SALON_SEARCH_MAX_COUNT.toString(),
      results_start: '1',
      status: 'OK',
      salon: salonList,
    },
  },
};
