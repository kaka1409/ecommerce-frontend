import hostURL from '@/configs/env.js';
import axios from 'axios';
import { formatTransactionDate } from '@/utils/date';

import { defineStore } from "pinia";

export const useTransactionHistory = defineStore("transactionHistory", {
  state: () => {
    return {
      transactions: [],
      isLoadingTransactions: false,
      transactionsError: null,
      pageNo: 1,
      pageSize: 10,
      totalPages: 0,
      atEnd: false,
    }
  },

  getters: {

  },

  actions: {
    async getTransactions() {
      try {

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('No access token found. Please login again.');
        }

        const response = await axios.get(`${hostURL}/api/v1/payments?pageNo=${this.pageNo}&pageSize=${this.pageSize}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': '*/*'
          }
        });

        const responseBody = response.data;

        // Transform API data to match component structure
        if (responseBody.status === 200 && responseBody.data) {

          this.totalPages = responseBody.data.totalPages

          // Handle both direct items array and paginated response
          const items = responseBody.data.items || responseBody.data;

          if (Array.isArray(items)) {
            const mappedTransactions = items.map(item => ({
              id: item.paymentId?.toString() || item.id?.toString() || '',
              orderCode: item.orderCode?.toString() || '',
              date: formatTransactionDate(item.paymentDate || item.date || ''),
              rawDate: item.paymentDate || item.date || '', // Keep raw date for sorting
              amount: parseFloat(item.amount) || 0,
              type: item.type || 'purchase',
              status: item.status || 'success'
            }))

            this.transactions = this.transactions.concat(mappedTransactions)
            // Sort by date: newer transactions first (descending order)
            // .sort((a, b) => {
            //   const dateA = new Date(a.rawDate);
            //   const dateB = new Date(b.rawDate);
            //   return dateB.getTime() - dateA.getTime();
            // })

          } else {
            throw new Error('Invalid response format: expected array of transactions');
          }
        } else {
          throw new Error(responseBody.message || 'Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        this.transactionsError = error.message;

        // Fallback to sample data if API fails
        this.transactions = [
          {
            id: '92287157',
            date: formatTransactionDate('2025-07-23T15:30:00'),
            amount: -14.00,
            type: 'purchase',
            status: 'success'
          },
          {
            id: '92287158',
            date: formatTransactionDate('2025-07-22T10:15:00'),
            amount: -37.00,
            type: 'purchase',
            status: 'failed'
          },
          {
            id: '92287159',
            date: formatTransactionDate('2025-07-21T08:45:00'),
            amount: -21.00,
            type: 'purchase',
            status: 'success'
          }
        ];
      } finally {
        this.isLoadingTransactions = false;
      }
    },

    async getMoreTransactions() {
      ++this.pageNo;
      await this.getTransactions();
    },

    handleScroll(e) {
      const element = e.target;
      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        this.atEnd = true;

        if (this.pageNo < this.totalPages) {
          this.getMoreTransactions();
        }

      } else {
        this.atEnd = false;
      }
    }
  }
})

