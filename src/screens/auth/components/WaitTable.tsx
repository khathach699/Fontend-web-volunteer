import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Post = {
  _id: string;
  text: string;
  organization: {
    _id: string;
    info: string;
    certificate: string;
    bankName: string;
    bankNumber: string;
    isdeleted: boolean;
    user: string;
    isVerified: boolean;
  };
};

const WaitTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/posts?isAccepted=false"
        );
        if (res.data.success) {
          setPosts(res.data.data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const approvePosts = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/posts/approve/${id}`
      );
      console.log("Approve response:", response.data);

      if (response.data.success) {
        toast.success("Duyệt thành công");

        // Cập nhật danh sách bài viết sau khi duyệt
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));

        // Cập nhật danh sách lựa chọn
        setSelectedIds((prevIds) =>
          prevIds.filter((selectedId) => selectedId !== id)
        );
      } else {
        alert(`Lỗi: ${response.data.message || "Không thể duyệt chiến dịch"}`);
      }
    } catch (err: any) {
      toast.error("Không thể kết nối đến server. Vui lòng thử lại");
    }
  };

  const rejectPosts = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/posts/reject/${id}`
      );
      console.log("Approve response:", response.data);

      if (response.data.success) {
        toast.success("KhÔng duyệt thành công");

        // Cập nhật danh sách bài viết sau khi duyệt
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));

        // Cập nhật danh sách lựa chọn
        setSelectedIds((prevIds) =>
          prevIds.filter((selectedId) => selectedId !== id)
        );
      } else {
        alert(`Lỗi: ${response.data.message || "Không thể duyệt chiến dịch"}`);
      }
    } catch (err: any) {
      toast.error("Không thể kết nối đến server. Vui lòng thử lại");
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === posts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(posts.map((post) => post._id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedIds.includes(id);

  return (
    <div
      className="w-100 mx-auto rounded-2xl overflow-hidden"
      style={{ border: "1px solid black" }}
    >
      <div className="flex items-center px-4 py-2 bg-white border-b">
        <input
          type="checkbox"
          checked={selectedIds.length === posts.length}
          onChange={toggleSelectAll}
          className="mr-3 w-6 h-6"
        />
        <span className="text-green-700 font-medium">Chọn tất cả</span>
      </div>

      {posts.map((post) => (
        <div
          key={post._id}
          className="flex items-center justify-between px-4 py-2 border-b hover:bg-gray-50 bg-white"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected(post._id)}
              onChange={() => toggleSelect(post._id)}
              className="mr-3 w-6 h-6"
            />
            <span className="w-64 font-medium text-gray-800">
              {post.text.slice(0, 60)}...
            </span>
          </div>
          <div>
            <button
              className="px-4 py-1 rounded-full text-black hover:bg-[#7DA671] mr-2"
              style={{ border: "1px solid black", backgroundColor: "#9DC08B" }}
              onClick={() => approvePosts(post._id)}
            >
              DUYỆT
            </button>
            <button
              className="px-3 py-1 rounded-full text-black hover:bg-[#7DA671] mr-2 bg-white"
              style={{ border: "1px solid black" }}
              onClick={() => rejectPosts(post._id)}
              // Có thể thêm logic từ chối tại đây
            >
              KHÔNG DUYỆT
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WaitTable;
