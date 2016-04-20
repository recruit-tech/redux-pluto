export default function normalizeFormError(error) {
  if (error.statusCode === 400 && error.body) {
    return Promise.reject(error.body);
  }

  return Promise.reject({
    _error: 'エラーが発生しました。しばらく待ってから再試行してください。',
  });
}
