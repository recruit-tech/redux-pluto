export default function normalizeFormError(error) {
  if (error.statusCode === 400 && error.body) {
    return Promise.reject(error.body);
  }

  return Promise.reject(error);
}
