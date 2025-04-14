import React, { useState, useEffect } from "react";
import { ErrorOutline, CheckCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

type Post = {
  _id: string;
  organization: {
    info: string;
  };
  text: string;
};

const NoDeleteTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/posts?isAccepted=true"
        );
        setPosts(response.data.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const deletePosts = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3001/posts/${id}`);
      console.log("Approve response:", response.data);

      if (response.data.success) {
        toast.success("Xóa bài viết thành công");

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
      setSelectedIds(posts.map((p) => p._id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedIds.includes(id);
  const allSelected = selectedIds.length === posts.length;

  return (
    <div
      className="rounded-2xl w-full overflow-hidden"
      style={{ border: "1px solid black" }}
    >
      {/* Header */}
      <div className="flex items-center border-b px-4 py-2 bg-white">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={toggleSelectAll}
          className="mr-3 w-6 h-6"
        />
        <span className="text-green-700 font-medium">Select all</span>
      </div>

      {/* Post Rows */}
      {posts.map((post) => (
        <div
          key={post._id}
          className="flex items-center border-b px-4 py-2 hover:bg-gray-100 bg-white justify-between"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected(post._id)}
              onChange={() => toggleSelectOne(post._id)}
              className="mr-3 w-6 h-6"
            />
            <img
              className="w-6 h-6 rounded-full mr-3"
              style={{ border: "1px solid black" }}
              src="../src/assets/avatar.jpg"
              alt="avatar"
            />
            <div>
              <div className="font-medium w-64">{post.organization.info}</div>
              <div className="text-sm text-gray-600 w-96 line-clamp-2">
                {post.text}
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="flex">
            <CheckCircleOutline className="text-green-400 hover:text-green-300 cursor-pointer mx-1" />

            <ErrorOutline
              className="text-yellow-400 hover:text-yellow-300 cursor-pointer mx-1"
              onClick={() => deletePosts(post._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoDeleteTable;
