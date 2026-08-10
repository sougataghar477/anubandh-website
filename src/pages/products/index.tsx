
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
import ConfirmationDialog from "../../components/common/ConfirmationDialog";
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
          console.error("Failed to load products:", error);
        }
      };
      loadProducts()
},[])

  
return (
  <div className="min-h-screen bg-[#111111] p-6 text-[#E0E0E0] md:p-10">
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="flex min-h-[360px] items-start justify-center md:min-h-[500px]">
      <div className="w-full">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white">
          Add Product
        </h2>

        <p className="mt-2 text-gray-400">
          Manage your product catalog
        </p>
      </div>

      {/* Add / Edit Product */}
      <div className="rounded-3xl border border-[#2B2B2B] bg-[#181818] mt-25 p-16 shadow-xl">
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
        />
        {/* <input
          value={newProductName.name}
          
          className="w-full rounded-2xl border border-[#2B2B2B] bg-[#121212] px-5 py-4 text-white outline-none focus:border-lime-400"
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
      <div>
        <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Search Existing Products
        </h1>

        <p className="mt-2 text-gray-400">
          Search through your product catalog
        </p>
      </div>
              <div className="mb-8 rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5">

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
        <h2 className="mb-5 text-2xl font-semibold text-white">
          Existing Products
        </h2>

        <p className="mb-5 text-gray-400">
          Click on a product to edit or delete it.
        </p>
        </div>

        <div className="max-h-[280px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-[#181818] scrollbar-thumb-lime-500/70 hover:scrollbar-thumb-lime-400">
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
                  className="cursor-pointer rounded-3xl border border-[#2B2B2B] bg-[#181818] p-4 transition hover:border-lime-400"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-500/10">
                      <Package
                        size={24}
                        className="text-lime-400"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white">
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




      <ConfirmationDialog
        type={showDialog.dialogType}
        visible={showDialog.visibility}
        title={showDialog.title}
        message={showDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="#DC2626"
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