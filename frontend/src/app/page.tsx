"use client";

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/cost-records";

type CostRecord = {
  id: number;
  title: string;
  amount: number;
  category: string;
  description: string | null;
  date: string;
};

export default function Home() {
  const [records, setRecords] = useState<CostRecord[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // READ: Get all records
  async function fetchRecords() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load records");
      }

      const data: CostRecord[] = await response.json();
      setRecords(data);
    } catch {
      setMessage("Cannot connect to backend.");
    }
  }

  useEffect(() => {
    void fetchRecords();
  }, []);

  // Clear form
  function resetForm() {
    setTitle("");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
    setEditId(null);
  }

  // CREATE and UPDATE
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const recordData = {
      title,
      amount: Number(amount),
      category,
      description,
      date: date || undefined,
    };

    try {
      const url = editId ? `${API_URL}/${editId}` : API_URL;
      const method = editId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
      });

      if (!response.ok) {
        throw new Error("Failed to save record");
      }

      setMessage(
        editId ? "Record updated successfully!" : "Record added successfully!",
      );

      resetForm();
      await fetchRecords();
    } catch {
      setMessage("Unable to save record. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // EDIT: Load selected record into form
  function handleEdit(record: CostRecord) {
    setEditId(record.id);
    setTitle(record.title);
    setAmount(String(record.amount));
    setCategory(record.category);
    setDescription(record.description ?? "");
    setDate(record.date.slice(0, 10));
    setMessage("");
  }

  // DELETE: Remove selected record
  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setMessage("Record deleted successfully!");

      if (editId === id) {
        resetForm();
      }

      await fetchRecords();
    } catch {
      setMessage("Unable to delete record.");
    }
  }

  return (
    <main className="container">
      <h1>Cost Record Management</h1>
      <p className="subtitle">Manage your daily expenses</p>

      <section className="form-section">
        <h2>{editId ? "Edit Cost Record" : "Add Cost Record"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (MMK)</label>
            <input
              type="number"
              placeholder="Enter amount"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-actions full-width">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : editId ? "Update Record" : "Add Record"}
            </button>

            {editId && (
              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="table-section">
        <h2>Cost Records</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="empty">
                    No records found.
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.title}</td>
                    <td>{record.amount.toLocaleString()} MMK</td>
                    <td>{record.category}</td>
                    <td>{record.date.slice(0, 10)}</td>
                    <td>{record.description || "-"}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="edit-button"
                          onClick={() => handleEdit(record)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          onClick={() => handleDelete(record.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
