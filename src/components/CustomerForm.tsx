import React, { useState } from 'react';

interface CustomerFormProps {
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

export interface Customer {
  id: number;
  name: string;
  phone: number;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name.trim()) {
      alert("Name is required.");
      return;
    }

    if (phone === '' || isNaN(phone)) {
      alert("Phone number is required and must be a valid number.");
      return;
    }

    // Fetch customers from localStorage
    const storedCustomers = JSON.parse(localStorage.getItem('customers') || '[]');
    
    // Generate a new ID
    const newId = storedCustomers.length > 0 ? Math.max(...storedCustomers.map((customer: Customer) => customer.id)) + 1 : 1;

    const newCustomer: Customer = {
      id: newId,
      name,
      phone: Number(phone),
    };

    // Save customer to localStorage
    localStorage.setItem('customers', JSON.stringify([...storedCustomers, newCustomer]));

    // Call onSave callback
    onSave(newCustomer);

    // Reset fields
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
              placeholder="Enter customer name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="number"
              value={phone === '' ? '' : phone}
              onChange={(e) => setPhone(e.target.value === '' ? '' : Number(e.target.value))}
              className="border p-2 w-full"
              placeholder="Enter customer phone"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
