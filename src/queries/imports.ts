import axios from "axios";
import { useMutation } from "react-query";
import API_PATHS from "~/constants/apiPaths";
import { getAuthToken } from "~/utils/utils";

export function useImport() {
  return useMutation(async (fileName: string) => {
    const authToken = getAuthToken();

    const res = await axios.get<string>(`${API_PATHS.import}/import`, {
      params: {
        name: encodeURIComponent(fileName),
      },
      headers: {
        ...(authToken ? { Authorization: `Basic ${getAuthToken()}` } : {}),
      },
    });

    return res.data;
  });
}
