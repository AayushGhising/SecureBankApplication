// src/components/Cards.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../services/api.client";
import { APP_CONSTANTS } from "../constants/app.constants";
import { createCard } from "../models/cards.model";

const Cards = () => {
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await apiClient.get(
          `${APP_CONSTANTS.ENDPOINTS.CARDS}?id=${user.id}`
        );

        if (response.status === APP_CONSTANTS.HTTP_STATUS.OK) {
          const cardData = response.data.map((card) => createCard(card));
          setCards(cardData);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
        setError("Failed to load card information");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [user]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatCardNumber = (cardNumber) => {
    const str = cardNumber.toString();
    return `**** **** **** ${str.slice(-4)}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCardTypeColor = (cardType) => {
    const colors = {
      Credit: "bg-purple-600",
      Debit: "bg-blue-600",
      Platinum: "bg-gray-700",
      Gold: "bg-yellow-600",
    };
    return colors[cardType] || "bg-gray-600";
  };

  const calculateUsagePercentage = (used, total) => {
    return total > 0 ? (used / total) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading card information...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Cards</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={card.cardId || index} className="relative">
              {/* Card Visual */}
              <div
                className={`${getCardTypeColor(
                  card.cardType
                )} text-white rounded-xl p-6 mb-4 shadow-lg transform hover:scale-105 transition-transform`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm opacity-75">Card Type</p>
                    <p className="text-lg font-semibold">{card.cardType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-75">Card ID</p>
                    <p className="text-sm font-medium">{card.cardId}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-xl font-mono tracking-wider">
                    {formatCardNumber(card.cardNumber)}
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-75">Available Credit</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(card.availableAmount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">Total Limit</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(card.totalLimit)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Card Details
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Used:</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(card.amountUsed)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Amount:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(card.availableAmount)}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Credit Utilization:</span>
                      <span className="text-sm text-gray-600">
                        {calculateUsagePercentage(
                          card.amountUsed,
                          card.totalLimit
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          calculateUsagePercentage(
                            card.amountUsed,
                            card.totalLimit
                          ) > 80
                            ? "bg-red-500"
                            : calculateUsagePercentage(
                                card.amountUsed,
                                card.totalLimit
                              ) > 50
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${calculateUsagePercentage(
                            card.amountUsed,
                            card.totalLimit
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 pt-2 border-t">
                    Issued on: {formatDate(card.createDt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-8 rounded text-center">
          <p className="text-lg">No cards found</p>
          <p className="text-sm text-gray-500 mt-2">
            You currently don't have any active cards.
          </p>
        </div>
      )}
    </div>
  );
};

export default Cards;
