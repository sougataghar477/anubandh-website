import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Mail,
  Phone,
  User,
  Briefcase,
  LogOut,
  Save,
} from "lucide-react";
import {
  clearStoredUser,
  getStoredUser,
  saveUser,
  type StoredUser,
} from "../../utils/auth";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<StoredUser | null>(null);

  const [image, setImage] = useState<string | null>(null);

  const [phone, setPhone] = useState("");

  useEffect(() => {
    const data = getStoredUser();

    if (!data) {
      navigate("/login");
      return;
    }

    setUser(data);
  }, [navigate]);

  if (!user) return null;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveUser({
      ...user,
    });

    alert("Profile Updated Successfully");
  };

  const logout = () => {
    clearStoredUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#111111] p-8 text-white">

      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl border border-[#2b2b2b] bg-[#181818] shadow-xl overflow-hidden">

          {/* Header */}

          <div className="h-40 bg-gradient-to-r from-lime-500/20 to-transparent"></div>

          <div className="-mt-20 px-8 pb-8">

            {/* Avatar */}

            <div className="flex flex-col items-center">

              <div className="relative">

                {image ? (
                  <img
                    src={image}
                    className="w-36 h-36 rounded-full object-cover border-4 border-lime-400"
                  />
                ) : (
                  <div className="w-36 h-36 rounded-full bg-lime-500 flex items-center justify-center text-6xl font-bold text-black border-4 border-lime-400">
                    {user.name.charAt(0)}
                  </div>
                )}

                <label className="absolute bottom-1 right-1 bg-lime-500 p-2 rounded-full cursor-pointer hover:scale-105 transition">
                  <Camera size={18} className="text-black" />

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImage}
                  />
                </label>

              </div>

              <h2 className="mt-5 text-3xl font-bold">{user.name}</h2>

              <p className="text-gray-400">{user.role}</p>

            </div>

            {/* Personal Information */}

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <div>

                <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <User size={16} />
                  Full Name
                </label>

                <input
                  value={user.name}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-[#121212] border border-[#2b2b2b] p-3 outline-none"
                />

              </div>

              <div>

                <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </label>

                <input
                  value={user.email}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-[#121212] border border-[#2b2b2b] p-3 outline-none"
                />

              </div>

              <div>

                <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Phone size={16} />
                  Phone Number
                </label>

                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full rounded-xl bg-[#121212] border border-[#2b2b2b] p-3 outline-none"
                />

              </div>

              <div>

                <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Briefcase size={16} />
                  Role
                </label>

                <input
                  value={user.role}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      role: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-[#121212] border border-[#2b2b2b] p-3 outline-none"
                />

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-10">

              <button
                onClick={handleSave}
                className="flex-1 rounded-xl bg-lime-500 py-3 font-semibold text-black flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <Save size={18} />
                Save Changes
              </button>

              <button
                onClick={logout}
                className="flex-1 rounded-xl border border-red-500 py-3 font-semibold text-red-400 flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}