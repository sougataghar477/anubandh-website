import { useEffect, useMemo, useState } from "react";
import api from "../../utils/api";
import Table from "../../components/common/Table";
import UsersSearchHeader from "./components/UsersSearchHeader";
import UsersSummaryCards from "./components/UsersSummaryCards";

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

const PAGE_SIZE = 3;

export default function AllUsers() {
  const [users, setUsers] = useState<UserRow[]>([]);
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
      } catch (err) {
        console.error("Failed to load users:", err);
        if (isMounted) {
          setError("Failed to load users.");
          setUsers([]);
        }
      } finally {
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

  return (
    <main className="min-h-screen bg-[#0c0d10] px-6 py-8 text-gray-100 md:px-8 lg:px-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              User Directory
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
              Manage your users with the same polished flow.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400">
              Browse user accounts, search by role or status, and jump into any profile from one place.
            </p>
          </div>

          <UsersSearchHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <UsersSummaryCards users={users} />

        <section className="overflow-hidden rounded-[32px] border border-[#2A2A30] bg-[#111115] shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4 border-b border-[#2A2A30] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gray-500">User table</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">All users</h2>
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
      </div>
    </main>
  );
}