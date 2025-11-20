import { useEffect, useState } from "react";
import { getReviews } from "../services/api";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };


  
  return (
    <div className="overflow-x-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Product Reviews</h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">User Name</th>
            <th className="p-3 border">Product</th>
            <th className="p-3 border">Review</th>
            <th className="p-3 border">Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No reviews available
              </td>
            </tr>
          ) : (
            reviews.map((rev) => (
              <tr key={rev._id} className="border-t hover:bg-gray-100">
                <td className="p-3 border">{rev.user_name}</td>
                <td className="p-3 border">{rev.product_name}</td>
                <td className="p-3 border">{rev.product_review}</td>
                <td className="p-3 border">
                  {new Date(rev.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
