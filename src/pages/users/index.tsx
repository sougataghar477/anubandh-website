import { useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import Table from "../../components/common/Table";
import  Search from  "../../components/common/Search";
import { Users } from "lucide-react";
import UsersSummaryCards from "./components/UsersSummaryCards";
import axios from "axios";
import type { PopupType } from "../../components/common/Popup";
import Popup from "../../components/common/Popup";
type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};
interface PopupProps{
  type:PopupType,
  visible:boolean,
  title:string,
  message:string
}
const PAGE_SIZE = 3;

export default function AllUsers() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [popupOptions,setPopupOptions] = useState<PopupProps>({type:'failure',visible:false,title:'Error',message:''});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/admin/users");
        const rawUsers = Array.isArray(response.data?.users)
          ? response.data.users
          : Array.isArray(response.data)
            ? response.data
            : [];

        if (!isMounted) return;

        const mappedUsers: UserRow[] = rawUsers.map((user: any, index: number) => ({
          id: Number(user.id ?? user.userId ?? index + 1),
          name: user.name ?? user.fullName ?? user.email ?? `User ${index + 1}`,
          email: user.email ?? "",
          role: user.role ?? user.roleName ?? user.userType ?? "User",
          status: user.status ?? (user.isActive ? "Active" : "Inactive"),
        }));

        setUsers(mappedUsers);
      } 
      catch (err) {
  console.error("Failed to load users:", err);

  if (isMounted) {
    if (axios.isAxiosError(err)) {
      setPopupOptions(prev => ({...prev,message:err.response?.data.message || "Failed to load users",visible:true}))

    } else {
      setPopupOptions(prev => ({...prev,message:"Failed to load users",visible:true}))

    }

    setUsers([]);
  }
}
       finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      if (!normalized) return true;

      return [user.name, user.email, user.role, user.status]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [searchTerm, users]);

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const startIndex = filteredUsers.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(filteredUsers.length, currentPage * PAGE_SIZE);

  const currentPageUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, currentPage]);
  const closePopup = () => {
    setPopupOptions(prev => ({...prev,visible:false}))
  }
  return (
    <main className="min-h-screen bg-white px-6 py-8 text-gray-100 md:px-8 lg:px-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">

            {/* Section Label */}
            <div className="mb-4 flex items-center gap-2">

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                User Directory
              </span>




            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-black md:text-5xl">

              Manage your{" "}

              <span className="text-black">
                users
              </span>

              {" "}with a smarter{" "}

              <span className="text-black">
                workflow.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-[15px]">

              Manage accounts, monitor activity, review roles, and keep your
              organization connected from one{" "}

              <span className="font-medium text-slate-300">
                centralized workspace.
              </span>

            </p>

            {/* Small Feature Highlights */}
            <div className="mt-5 flex flex-wrap items-center gap-3">

              <div className="rounded-xl border border-blue-400/10 bg-blue-600/[0.04] px-3 py-2 text-[11px] font-medium text-blue-300">
                ● Centralized Directory
              </div>

              <div className="rounded-xl border border-purple-400/10 bg-purple-600/[0.04] px-3 py-2 text-[11px] font-medium text-purple-300">
                ● Secure Access
              </div>

              <div className="rounded-xl border border-lime-400/10 bg-lime-600/[0.04] px-3 py-2 text-[11px] font-medium text-lime-300">
                ● Live Management
              </div>

            </div>

          </div>

          <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <UsersSummaryCards users={users} />

        <section className="overflow-hidden rounded-4xl shadow-2xl bg-white ">
          <div className="flex flex-col gap-4 border-b border-white/[0.08] bg-white/[0.02] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

  <div className="flex items-center gap-4">

    {/* Table Icon */}
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/[0.06] shadow-[0_0_20px_rgba(163,230,53,0.06)]">
      <Users className="h-5 w-5 text-lime-300" />
    </div>

    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-black">
        User Table
      </p>

      <h2 className="mt-1 text-2xl font-bold tracking-tight text-black">
        All{" "}
        <span className="text-black">
          users
        </span>
      </h2>
    </div>

  </div>

</div>

          {loading ? (
            <div className="px-6 py-6 text-sm text-gray-400">Loading users...</div>
          ) : error ? (
            <div className="px-6 py-6 text-sm text-red-400">{error}</div>
          ) : null}

          <Table
            data={currentPageUsers}
            pageName="users"
            columns={["name", "email", "role", "status"]}
            filteredCount={filteredUsers.length}
            startIndex={startIndex}
            endIndex={endIndex}
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={setCurrentPage}
          />
        </section>
        <Popup
        type={popupOptions.type}
        visible={popupOptions.visible}
        title={popupOptions.title}
        message={popupOptions.message}
        onCancel={closePopup}
        />
      </div>
    </main>
  );
}