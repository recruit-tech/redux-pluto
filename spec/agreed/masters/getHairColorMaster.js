module.exports = {
  request: {
    path: "/beauty/hairColor",
    method: "GET",
    params: {
      start: "{:start}",
    },
    values: {
      start: 1,
    },
  },
  response: {
    body: {
      results: {
        results_available: "{:results_available}",
        results_returned: "{:results_returned}",
        results_start: "{:results_start}",
        status: "{:status}",
        hair_color: "{:hair_color}",
      },
    },
    values: {
      results_available: "5",
      results_returned: "5",
      results_start: "1",
      status: "OK",
      hair_color: [
        { code: "HC01", name: "ブラウン・ベージュ系" },
        { code: "HC02", name: "イエロー・オレンジ系" },
        { code: "HC03", name: "レッド・ピンク系" },
        { code: "HC04", name: "アッシュ・ブラック系" },
        { code: "HC05", name: "その他カラー" },
      ],
    },
  },
};
