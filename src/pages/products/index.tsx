import {
  Package,
  Plus,
  Search,
 
} from "lucide-react";
import { useState } from "react";
export default function ProductsPage() {

  const [productName, setProductName] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
const [editingName, setEditingName] = useState<string>("");
  
interface Product {
  id: number;
  name: string;
  category: string;
}

const [products, setProducts] = useState<Product[]>([
  {
    id: 1,
    name: "CRM Software",
    category: "Software",
  },
  {
    id: 2,
    name: "Inventory System",
    category: "ERP",
  },
]);
const handleAddProduct = () => {
  const name = productName.trim();

  if (!name) {
    alert("Please enter a product name.");
    return;
  }

  const exists = products.some(
    (product) => product.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    alert("Product already exists.");
    return;
  }

  const newProduct: Product = {
    id: Date.now(),
    name,
    category: "General",
  };

  setProducts((prev) => [...prev, newProduct]);
  setProductName("");
};
const handleDelete = (id: number) => {
  setProducts((prev) => prev.filter((product) => product.id !== id));
};
const handleEdit = (product: Product) => {
  setEditingId(product.id);
  setEditingName(product.name);
};
const handleSave = () => {
  if (!editingName.trim()) {
    alert("Product name is required.");
    return;
  }

  setProducts((prev) =>
    prev.map((product) =>
      product.id === editingId
        ? { ...product, name: editingName }
        : product
    )
  );

  setEditingId(null);
  setEditingName("");
};
  return (
    <div className="min-h-screen bg-[#111111] text-[#E0E0E0] p-6 md:p-10">
  <div className="mx-auto max-w-6xl">

    {/* Header */}

    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white">
        Products
      </h1>

      <p className="mt-2 text-gray-400">
        Manage your product catalog
      </p>
    </div>

    {/* Add Product */}

    <div className="rounded-3xl border border-[#2B2B2B] bg-[#181818] p-6 shadow-xl">

      <h2 className="text-xl font-semibold text-white">
        Add Product
      </h2>

      <div className="mt-5">

        <label className="mb-2 block text-sm text-gray-400">
          Product Name
        </label>

        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter Product Name"
          className="w-full rounded-2xl border border-[#2B2B2B] bg-[#121212] px-5 py-4 text-white outline-none focus:border-lime-400"
        />

      </div>

     <button
  type="button"
  onClick={handleAddProduct}
  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-lime-400 to-green-500 py-4 font-semibold text-black transition hover:scale-[1.01]"
>
        <Plus size={20} />
        Add Product
      </button>

    </div>

    {/* Search */}

    <div className="mt-8 rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5">

      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Product..."
          className="w-full rounded-2xl border border-[#2B2B2B] bg-[#121212] py-4 pl-12 pr-4 text-white outline-none focus:border-lime-400"
        />

      </div>

    </div>

    {/* Existing Products */}

    <div className="mt-8">

      <h2 className="mb-5 text-2xl font-semibold text-white">
        Existing Products
      </h2>

      <div className="grid gap-5">

        {products
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (

            <div
              key={product.id}
              className="flex flex-col justify-between rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5 transition hover:border-lime-400/30 md:flex-row md:items-center"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-500/10">

                  <Package
                    className="text-lime-400"
                    size={24}
                  />

                </div>

                <div>

                 {editingId === product.id ? (
  <input
    value={editingName}
    onChange={(e) => setEditingName(e.target.value)}
    className="rounded-lg border border-lime-400 bg-[#121212] px-3 py-2 text-white outline-none"
  />
) : (
  <h3 className="text-lg font-semibold text-white">
    {product.name}
  </h3>
)}

                  <p className="mt-1 text-sm text-gray-400">
                    {product.category}
                  </p>

                </div>

              </div>

              <div className="mt-5 flex items-center gap-3 md:mt-0">

                {editingId === product.id ? (
  <button
    type="button"
    onClick={handleSave}
    className="rounded-xl bg-lime-500 px-5 py-2 text-sm font-medium text-black hover:bg-lime-400"
  >
    Save
  </button>
) : (
  <button
    type="button"
    onClick={() => handleEdit(product)}
    className="rounded-xl border border-lime-500 px-5 py-2 text-sm text-lime-400 transition hover:bg-lime-500 hover:text-black"
  >
    Edit
  </button>
)}

              <button
  type="button"
  onClick={() => handleDelete(product.id)}
  className="rounded-xl border border-red-500 px-5 py-2 text-sm text-red-400 transition hover:bg-red-500 hover:text-white"
>
  Delete
</button>

              </div>

            </div>

          ))}

      </div>

    </div>

  </div>
</div>
  );
}