/* eslint-disable @typescript-eslint/no-explicit-any */

import { productsApi } from "../../../redux/features/products/productsApi";
import ProductsTable from "./ProductsTable";
import { useAppSelector } from "../../../redux/storeHook";
import { TProduct, productGetters, setProductPageNumber } from "../../../redux/features/products/productSlice";
import ElectroInput from "../../../components/form/ElectroInput";
import ElectroForm from "../../../components/form/ElectroForm";
import { useState } from "react";
import { FieldValues,  } from "react-hook-form";
import AddProductModal from "./AddProductModal";
import { useDispatch } from "react-redux";

const defaultProductFormModalValue = {
  _id: "",
  name: "",
  price: "",
  quantity: "",
  releaseDate: new Date().toISOString().split("T")[0],
  brand: "",
  model: "",
  category: "",
  connectivity: "",
  powerSource: "",
  features: {
      cameraResolution: "",
      storageCapacity: "",
      screenSize: ""
  },
  dimension: {
      height: "",
      width: "",
      depth: ""
  },
  weight: ""
}


const Gadgets = () => {
  const dispatch = useDispatch();
    const meta = useAppSelector(productGetters.selectProductMeta)
    const [search,setSearch] = useState('');
    const [openAddProductModal, setOpenAddProductModal] = useState(false);
    const [editedDuplicateProduct,setEditedDuplicateProduct] = useState<TProduct| undefined>(undefined);
    const [isEditedProduct,setIsEditedProduct] = useState<boolean>(false);

    console.log({isEditedProduct});
    
  const {
    data: products,
    isLoading,
  } = productsApi.useGetProductsQuery({ page: meta.page, limit: meta.limit,search });

  const onSearch = (data:FieldValues) =>{
    // set search page to 1 always
    dispatch(setProductPageNumber(1));
    setSearch(data.search);
  }

  const onCloseModal = () =>{
    console.log("Closing.....");
    
    setOpenAddProductModal(false);
    setEditedDuplicateProduct(undefined);
    setIsEditedProduct(false);
  }
  const onOpenModal = () =>{
    setOpenAddProductModal(true);
    setEditedDuplicateProduct(defaultProductFormModalValue as any);

  }
  const onClickDuplicateProduct = (product:TProduct) =>{
    
    setEditedDuplicateProduct(product);
    setOpenAddProductModal(true);
    
  }
  const onClickEditProduct = (product:TProduct) =>{
    setEditedDuplicateProduct(product);
    setIsEditedProduct(true);
    setOpenAddProductModal(true);

  }

  return (
    <div>
      Show all Gadgets Page
      <div>
        <AddProductModal 
        defaultProduct={editedDuplicateProduct} 
        onOpenModal={onOpenModal} 
        onCloseModal={onCloseModal} 
        openModal={openAddProductModal} 
        isEditedProduct={isEditedProduct} 
      />
      <ElectroForm className="border p-4 rounded-lg shadow-md" onSubmit={onSearch}  defaultValues={undefined}>
        <ElectroInput 
        type="search" 
        name="search"
        />
        <h2>Filter list</h2>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">Price range</button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">release Date</button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">Brand</button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">Model Number</button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">Categoty </button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">Operating System</button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">cONNECTIVITY</button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">power source</button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">Features</button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">Dimension</button>
        <button className="border px-1 mx-1 bg-red-500 rounded-md">Bulk Delete</button>

      </ElectroForm>
        <ProductsTable 
        data={products?.data?.data || []}
         meta={products?.data?.meta} 
         isLoading={isLoading} 
         onClickDuplicateProduct={onClickDuplicateProduct}
         onClickEditProduct={onClickEditProduct}
         />
      </div>
    </div>
  );
};

export default Gadgets;
