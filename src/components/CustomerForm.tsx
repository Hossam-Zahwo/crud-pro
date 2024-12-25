// src/components/CustomerForm.tsx

import React, { useState } from 'react';

interface CustomerFormProps {
  onSave: (customer: Customer) => void;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomer: Customer = {
      id: Date.now(),
      name,
      phone,
    };
    onSave(newCustomer);
    setName('');
    setPhone('');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register Customer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
