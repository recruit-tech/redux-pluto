export default function makeRequestAdapter(
  service: any,
  app: any,
  config: any,
) {
  if (!service.requestHandlers) {
    return;
  }

  service.requestHandlers.forEach((handleName: string) => {
    const { path, get, post } = service[handleName](config);
    if (get) {
      app.get(path, get.bind(service));
    }
    if (post) {
      app.post(path, post.bind(service));
    }
  });
}
