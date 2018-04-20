// import querystring from "querystring";
// import axios from "axios";
//
// /*
//  * Action types
//  */
// export const UPLOADER = "EFFECT_UPLOADER";
//
// /*
//  * Action creators
//  */
// export function upload(path, file, params, config) {
//   return {
//     type: UPLOADER,
//     payload: {
//       path,
//       file,
//       params,
//       config
//     }
//   };
// }
//
// /**
//  * uploader middleware
//  */
// export default function uploadMiddleware(_csrf) {
//   return ({ dispatch }) => next => action => {
//     const { type, payload } = action;
//     if (type !== UPLOADER) {
//       return next(action);
//     }
//
//     const formData = new FormData();
//     formData.append("file", payload.file);
//
//     const qs = querystring.stringify({ ...payload.params, _csrf });
//     return axios.post(`${payload.path}?${qs}`, formData, {});
//   };
// }
