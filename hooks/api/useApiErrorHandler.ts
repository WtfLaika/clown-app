import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { ServerError } from "./useHttpQuery";
import { ErrorHandlerFn } from "@/utils/ApiService";

/**
 * A custom hook to handle API error
 */
const useHandleApiError = () => {
  const { t } = useTranslation();

  const handleError: ErrorHandlerFn = (error: ServerError) => {
    const errorMessage = error?.message;
    Toast.show({
      type: "error",
      text1: t("App:Error"),
      // FIX TYPE HERE
      text2: errorMessage || t("serverNotAvailable"),
    });

    throw error;
  };

  return {
    handleError,
  };
};

export default useHandleApiError;
