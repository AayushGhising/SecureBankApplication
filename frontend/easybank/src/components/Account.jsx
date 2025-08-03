// src/components/Account.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../services/api.client";
import { APP_CONSTANTS } from "../constants/app.constants";
import { createAccount } from "../models/account.model";

const Account = () => {
  const { user } = useAuth();
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await apiClient.get(
          `${APP_CONSTANTS.ENDPOINTS.ACCOUNT}?id=${user.id}`
        );

        if (response.status === APP_CONSTANTS.HTTP_STATUS.OK) {
          setAccountDetails(createAccount(response.data));
        }
      } catch (error) {
        console.error("Error fetching account details:", error);
        setError("Failed to load account details");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading account details...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {accountDetails ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Account Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Number
                  </label>
                  <p className="mt-1 text-lg text-gray-900">
                    {accountDetails.accountNumber}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <p className="mt-1 text-lg text-gray-900">
                    {accountDetails.accountType}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Name
                  </label>
                  <p className="mt-1 text-lg text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <p className="mt-1 text-lg text-gray-900">
                    {user?.mobileNumber}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Branch Address
                  </label>
                  <p className="mt-1 text-lg text-gray-900">
                    {accountDetails.branchAddress}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Created
                  </label>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(accountDetails.createDt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          No account details available
        </div>
      )}
    </div>
  );
};

export default Account;
