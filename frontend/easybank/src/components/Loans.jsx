// src/components/Loans.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../services/api.client";
import { APP_CONSTANTS } from "../constants/app.constants";
import { createLoan } from "../models/loans.model";

const Loans = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoans = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await apiClient.get(
          `${APP_CONSTANTS.ENDPOINTS.LOANS}?id=${user.id}`
        );

        if (response.status === APP_CONSTANTS.HTTP_STATUS.OK) {
          const loanData = response.data.map((loan) => createLoan(loan));
          setLoans(loanData);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
        setError("Failed to load loan information");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateProgress = (paid, total) => {
    return total > 0 ? (paid / total) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading loan information...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Loans</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loans.length > 0 ? (
        <div className="grid gap-6">
          {loans.map((loan, index) => (
            <div
              key={loan.loanNumber || index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="bg-yellow-600 text-white px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">
                      Loan #{loan.loanNumber}
                    </h2>
                    <p className="text-yellow-100">{loan.loanType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-yellow-100">
                      Outstanding Amount
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(loan.outstandingAmount)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Total Loan Amount</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatCurrency(loan.totalLoan)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Amount Paid</p>
                    <p className="text-xl font-semibold text-green-600">
                      {formatCurrency(loan.amountPaid)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {formatDate(loan.startDt)}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Repayment Progress
                    </span>
                    <span className="text-sm text-gray-600">
                      {calculateProgress(
                        loan.amountPaid,
                        loan.totalLoan
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${calculateProgress(
                          loan.amountPaid,
                          loan.totalLoan
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  Created on: {formatDate(loan.createDt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded text-center">
          <p className="text-lg">No loans found</p>
          <p className="text-sm text-gray-500 mt-2">
            You currently don't have any active loans.
          </p>
        </div>
      )}
    </div>
  );
};

export default Loans;
