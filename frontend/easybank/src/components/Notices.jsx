// src/components/Notices.jsx
import React, { useState, useEffect } from "react";
import apiClient from "../services/api.client";
import { APP_CONSTANTS } from "../constants/app.constants";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(APP_CONSTANTS.ENDPOINTS.NOTICES);

        if (response.status === APP_CONSTANTS.HTTP_STATUS.OK) {
          setNotices(response.data);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
        setError("Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading notices...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bank Notices
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest announcements and important information
            from EazyBank
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {notices.length > 0 ? (
          <div className="space-y-6">
            {notices.map((notice, index) => (
              <div
                key={notice.noticeId || index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {notice.noticeSummary}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4">
                        Published on {formatDate(notice.createDt)}
                      </p>
                      <div className="text-gray-800 leading-relaxed">
                        {notice.noticeDetails}
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Notice #{notice.noticeId}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-5 5v-5zM9 7h1l5 5-5 5H9V7z"
              ></path>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notices available
            </h3>
            <p className="text-gray-500">
              Check back later for important bank announcements and updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;
