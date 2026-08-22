
import {
  Package,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../utils/api"; // change path if needed
export interface DropdownOption {
  id: number | string;
  name: string;
}
import UserInput from "../../components/common/UserInput";
import Label from "../../components/common/Label";
import Button from "../../components/common/Button";
import Popup from "../../components/common/Popup";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string | null;
}

interface ProductsResponse {
  success: boolean;
  products: Product[];
}

interface Dialog {
  dialogType: string;
  visibility: boolean;
  message: string;
  title:string;
}

export default function ProductsPage() {
  const [newProductName, setNewProductName] = useState<DropdownOption>({
    id: "",
    name: "",
  });
  const [searchedProduct, setSearchedProductName] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const isEditing = newProductName.id !== "";
  const [showDialog, setShowDialog] = useState<Dialog>({
    dialogType: '',
    visibility: false,
    message: '',
    title:''
  });

  const [oldProductName,setOldProductName] = useState<string>("");
const reloadProducts = async () => {
  try {
    const { data } = await api.get<ProductsResponse>("/products/all");

    setProducts(data.products);
  } catch (error) {
    console.error("Failed to load products:", error);
  }
};
      
  const handleAddProduct = async () => {
    if (!newProductName.name.trim()) {
      setShowDialog({ dialogType: "failure", visibility: true, message: "Please enter product name.",title:"Warning" });
      return;
    }

    try {
      await api.post("/products/create", {
        name: newProductName.name.trim(),
      });

      setShowDialog({ 
        dialogType: "success", 
        visibility: true, 
        message: "Product created successfully.",
        title:"Success" 
      });
      setNewProductName({ id: "", name: "" });
      reloadProducts();
    } catch (error) {
      if(axios.isAxiosError(error)){
      setShowDialog({ 
        dialogType: "failure", 
        visibility: true, 
        message: error.response?.data?.message || "Something went wrong.",
        title:"Error" });
      }

    }
  };
  const handleEditProduct = async () => {
    if (!isEditing) {
      setShowDialog({ 
        dialogType: "failure", 
        visibility: true, 
        message: "Please select a product to edit",
        title:"Warning" 
    });
      return;
    }

    try {
      await api.post(`/products/edit/${newProductName.id}`, {
        id: newProductName.id,
        name:newProductName.name
      });
      setShowDialog({ 
        dialogType: "success", 
        visibility: true, 
        message: "Product updated",
        title:"Success" 
    });
      setNewProductName({ id: "", name: "" });
      reloadProducts()
    } catch (error) {
      if(axios.isAxiosError(error)){
        setShowDialog({
          dialogType: "failure",
          visibility: true,
          message: error.response?.data?.message || "Something went wrong.",
          title:"Error"
        });
      }
    }
  };
  const showDeleteDialogHandler = () => {
    setShowDialog({ 
    dialogType: "confirmation", 
    visibility: true, 
    message: `Are you sure you want to delete "${newProductName.name}"?`,
    title:"Confirm" 
  });
}
  const handleDeleteProduct = async () => {
  if (!newProductName.id) return;

  try {
    await api.post(`/products/delete/${newProductName.id}`);

    setShowDialog({
      dialogType: "success",
      visibility: true,
      message: "Product deleted successfully.",
      title:"Success"
    });

    setNewProductName({
      id: "",
      name: "",
    });

    reloadProducts();
  } catch (error) {
    if(axios.isAxiosError(error)){
    setShowDialog({
      dialogType: "failure",
      visibility: true,
      title:'Error',
      message:
        error.response?.data?.message || "Failed to delete product.",
    });
    }

  }
};

useEffect(()=>{
  const loadProducts = async () => {
        try {
          const { data } = await api.get<ProductsResponse>("/products/all");

          setProducts(data.products);

          
        } catch (error) {
          if(axios.isAxiosError(error)){
            setShowDialog({
        dialogType: "failure",
        visibility: true,
        title:'Error',
        message:
          error.response?.data?.message || "Failed to delete product.",
      });

          }
          else{
            setShowDialog({
        dialogType: "failure",
        visibility: true,
        title:'Error',
        message:"Failed to delete product.",
      });
          }
          console.error("Failed to load products:", error);
        }
      };
      loadProducts()
},[])

  
return (
  <div className="min-h-screen bg-white p-6 text-black md:p-10">
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="flex min-h-90 items-start justify-center md:min-h-125">
      <div className="w-full">
      <div className="mb-8">
        <h2 className="text-4xl   text-black font-bold">
          Add Product
        </h2>

        <p className="mt-2 text-gray-400">
          Manage your product catalog
        </p>
      </div>

      {/* Add / Edit Product */}
      <div className="rounded-3xl bg-white md:mt-12 px-12 py-12 shadow-2xl">
        {/* <label className="mb-2 block text-sm text-gray-400">
          Product Name
        </label> */}
        <Label text="Product Name"/>
        <UserInput
        value={newProductName.name}
        onChange={(e) =>
            setNewProductName((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          placeholder="Enter product name"
          className="my-6"
        />
        {/* <input
          value={newProductName.name}
          
          className="w-full rounded-2xl border border-[#2B2B2B] bg-[#121212] px-5 py-4 text-black outline-none focus:border-lime-400"
        /> */}

        {isEditing && (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3">
            <span className="text-blue-300">
              Editing: {oldProductName}
            </span>

            <button
              onClick={() => {
                setNewProductName({
                  id: "",
                  name: "",
                });

                setOldProductName("");
              }}
              className="font-semibold text-red-400"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <Button
          className="flex-1"
          type="button" 
          label={isEditing
          ? "Edit Product"
          : "Add Product"}
          onClick={
              isEditing
                ? handleEditProduct
                : handleAddProduct
            }
          />
 
          {
            isEditing && 
            <Button 
            label="Delete Product"
            onClick={showDeleteDialogHandler}
            className="flex-1 bg-red-700 hover:bg-red-600"
            />
          }

        </div>
      </div>

      {/* Search */}

      </div>
      </div>
      {/* Products */}
      <div className=" p-4 rounded-2xl border border-blue-400">
        <div className="mb-8">
        <h1 className="text-4xl font-bold  text-black">
          Search Existing Products
        </h1>

        <p className="mt-2 text-gray-400">
          Search through your product catalog
        </p>
      </div>
              <div className="group mb-8 rounded-3xl bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-blue-200 shadow-xs">

        <UserInput
        element={"input"}
        icon={<Search/>}
        value={searchedProduct}
        onChange={(e) =>
              setSearchedProductName(
                e.target.value
        )}
        placeholder="Search products..."
        />
      </div>
        <div className="mb-8">
        <h2 className="mb-5 text-2xl font-semibold text-black">
          Existing Products
        </h2>

        <p className="mb-5 text-gray-400">
          Click on a product to edit or delete it.
        </p>
        </div>

        <div className="max-h-70 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-[#181818] scrollbar-thumb-blue-500/70 hover:scrollbar-thumb-blue-400">
          <div className="grid gap-5">
            {products
              .filter((product) =>
                product.name
                  .toLowerCase()
                  .includes(
                    searchedProduct.toLowerCase()
                  )
              )
              .map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setNewProductName({
                      id: product.id,
                      name: product.name,
                    });

                    setOldProductName(
                      product.name
                    );
                  }}
                  className="cursor-pointer rounded-3xl bg-white p-4 transition hover:border-blue-400"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
                      <Package
                        size={24}
                        className="text-blue-400"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-black">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-400">
                        Product #{product.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      </div>




      <Popup
        type={'failure'}
        visible={showDialog.visibility}
        title={showDialog.title}
        message={showDialog.message}
        cancelText="Exit"
        onCancel={() =>
          setShowDialog({
            dialogType: "",
            visibility: false,
            message: "",
            title: "",
          })
        }
        onConfirm={handleDeleteProduct}
      />
    </div>
  </div>
);
}