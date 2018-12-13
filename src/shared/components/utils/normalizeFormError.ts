import { SubmissionError } from "redux-form";

export default function normalizeFormError(error: {
  statusCode: number;
  body: any;
}) {
  if (error.statusCode === 400 && error.body) {
    throw new SubmissionError(error.body);
  }

  return Promise.reject(error);
}
