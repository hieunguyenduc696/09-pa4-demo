import { uniqueId } from "lodash";
import { HttpService } from "./http-service/http.service";

export const createUploadDocument = async (
  formData,
  onUploadProgress,
  onUploadSuccess
) => {
  return await HttpService.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  })
    .then(() => {
      return { id: uniqueId(), data: formData };
    })
    .then(onUploadSuccess);
};
