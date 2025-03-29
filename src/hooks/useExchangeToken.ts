import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExchangeTokenResponse } from "../models/auth";
import { exchangeToken } from "../apis/authApi";

const useExchangeToken = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ExchangeTokenResponse, //응답값 정의
    Error, //에러값 정의
    { code: string; codeVerifier: string } //매개변수값 정의
  >({
    mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      queryClient.invalidateQueries({
        queryKey: ["current-user-profile"],
      });
    },
  });
};
export default useExchangeToken;
