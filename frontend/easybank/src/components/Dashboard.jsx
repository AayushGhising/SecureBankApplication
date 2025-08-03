// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../services/api.client";
import { APP_CONSTANTS } from "../constants/app.constants";
import { createAccount } from "../models/account.model";

const Dashboard = () => {
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
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name}
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your banking services from your dashboard
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {accountDetails && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Account Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Account Number</p>
              <p className="text-lg font-medium">
                {accountDetails.accountNumber}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Type</p>
              <p className="text-lg font-medium">
                {accountDetails.accountType}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">Branch Address</p>
              <p className="text-lg font-medium">
                {accountDetails.branchAddress}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/myAccount"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
        >
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                My Account
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                View account details and information
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/myBalance"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500"
        >
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                My Balance
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Check balance and transactions
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/myLoans"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow border-l-4 border-yellow-500"
        >
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">My Loans</h3>
              <p className="text-gray-600 text-sm mt-1">
                Manage your loan accounts
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/myCards"
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow border-l-4 border-purple-500"
        >
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">My Cards</h3>
              <p className="text-gray-600 text-sm mt-1">
                View and manage your cards
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/contact"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
          >
            <h3 className="font-medium text-gray-800">Contact Support</h3>
            <p className="text-sm text-gray-600 mt-1">
              Get help with your account
            </p>
          </Link>
          <Link
            to="/notices"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
          >
            <h3 className="font-medium text-gray-800">View Notices</h3>
            <p className="text-sm text-gray-600 mt-1">
              Important bank announcements
            </p>
          </Link>
          <Link
            to="/myBalance"
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center"
          >
            <h3 className="font-medium text-gray-800">Transaction History</h3>
            <p className="text-sm text-gray-600 mt-1">
              View recent transactions
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
