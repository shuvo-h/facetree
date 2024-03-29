import { baseAPI } from "../../api/baseAPI";
import { TCart } from "../products/productSlice";
import { TSale } from "./salesSlice";

interface TSaleOrderCreateRes {
  success: boolean;
  message: string;
  data: TSale;
  errorSources: ErrorSource[];
}

interface ErrorSource {
  path: string;
  message: string;
}

export type TProductSellBodyInfo = {
  product: string;
  quantity: number;
  buyerName: string;
  soldDate: string;
};

export const salesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    
        // get sales list
        getSales: builder.query({
            query: (searchQuery) =>{
                let queryString:string = ''
                if (searchQuery) {
                    queryString = `?${new URLSearchParams(searchQuery).toString()}`
                }
                return {
                    url: `/sale-orders/${queryString}`,
                    method: "GET",
                }
            },
            providesTags:['sale_orders'],
        }),
        
    // sell a product
    sellProductById: builder.mutation<
      TSaleOrderCreateRes,
      TCart
    >({
      query: (sellInfo) => {
        
        return {
          url: `/sale-orders/order`,
          method: "POST",
          body: sellInfo,
        };
      },
      invalidatesTags: ['products'],
    }),
  }),
});
