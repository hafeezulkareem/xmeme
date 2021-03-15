import { apiMethods, apiStatus } from "../constants/APIConstants";

export const networkCallWithAxios = async (
   api,
   endpoint: string,
   requestData,
   type = apiMethods.post
) => {
   try {
      let response;
      api.setHeader("Content-Type", "application/json; charset=UTF-8");
      switch (type) {
         case apiMethods.post:
            response = await api.post(endpoint, { ...requestData });
            if (response.ok === false) {
               throw Error(JSON.stringify(response.data));
            }
            return response.data;
         case apiMethods.get:
            response = await api.get(endpoint);
            if (response.ok === false) {
               throw Error(JSON.stringify(response.data));
            }
            return response.data;
         case apiMethods.patch:
            response = await api.patch(endpoint, { ...requestData });
            if (response.ok === false) {
               throw Error(JSON.stringify(response.data));
            }
            return response.data;
         case apiMethods.delete:
            response = await api.delete(endpoint);
            if (response.ok === false) {
               throw Error(JSON.stringify(response.data));
            }
            return response.data;
         default:
      }
   } catch (err) {
      throw err;
   }
};

export const isFetching = (status: number) => apiStatus.loading === status;

export const isFailed = (status: number) => apiStatus.failed === status;

export const isSuccess = (status: number) => apiStatus.success === status;

export const getParsedErrorMessage = (error) => {
   const errorDescription = "Something went wrong. Please try again!";

   let description: string = errorDescription;
   try {
      if (error !== null && error !== undefined) {
         let parsedError = JSON.parse(error.message);
         if (parsedError !== undefined && parsedError !== null) {
            if (parsedError.error) {
               description = parsedError.error;
            }
         }
      }
   } catch (err) {}

   return description;
};
