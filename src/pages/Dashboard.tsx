import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { getSalesFromLocalStorage } from '../utils/localStorageUtils';

interface Sale {
  id: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  saleDate: string;
  purchases: Product[];
  total: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchedSales = getSalesFromLocalStorage();
    setSales(fetchedSales);
  }, []);

  const salesData = sales.map(sale => ({
    date: sale.saleDate,
    total: sale.total,
    profit: sale.total * 0.2 // Assuming 20% profit margin
  }));

  const aggregateData = salesData.reduce((acc, cur) => {
    const date = cur.date.split('T')[0]; // Assuming date is in ISO format
    if (!acc[date]) {
      acc[date] = { date, total: 0, profit: 0 };
    }
    acc[date].total += cur.total;
    acc[date].profit += cur.profit;
    return acc;
  }, {} as { [key: string]: { date: string, total: number, profit: number } });

  const chartData = Object.values(aggregateData);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Sales Dashboard</h2>

      <div className="mb-12">
        <h3 className="text-xl font-bold mb-4">Total Sales and Profit Over Time</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-bold mb-4">Sales Distribution by Date</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
            <Bar dataKey="profit" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Profit Share</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="profit"
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#8884d8', '#82ca9d'][index % 2]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
