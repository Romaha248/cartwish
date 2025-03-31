import { useQuery } from "@tanstack/react-query";

import apiClient from "../utils/api-client";

const useData = (
  endpoint,
  customConfig = {},
  queryKey,
  staleTime = 300_000
) => {
  const fetchData = () => {
    return apiClient.get(endpoint, customConfig).then((res) => res.data);
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: fetchData,
    staleTime: staleTime,
  });
};

// const useData = (endpoint, customConfig, deps) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(
//     () => {
//       setIsLoading(true);
//       const fetchData = async () => {
//         try {
//           const response = await apiClient.get(endpoint, customConfig);
//           // if (
//           //   endpoint === "/products" &&
//           //   data &&
//           //   data.products &&
//           //   customConfig.params.page !== 1
//           // ) {
//           //   setData((prev) => ({
//           //     ...prev,
//           //     products: [...prev.products, ...response.data.products],
//           //   }));
//           // } else {
//           setData(response.data);
//           // }
//           setIsLoading(false);
//         } catch (error) {
//           setError(error.message);
//           setIsLoading(false);
//         }
//       };

//       fetchData();
//     },
//     deps ? deps : []
//   );

//   return { data, error, isLoading };
// };

export default useData;
