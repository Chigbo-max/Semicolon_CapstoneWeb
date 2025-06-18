import { useEffect, useState } from 'react';
import {
  useGetTrustedContactsQuery,
  useAddTrustedContactMutation,
  useDeleteTrustedContactMutation,
  useUpdateTrustedContactMutation
} from '../services/androidAntiTheftApi';

import { useParams } from 'react-router-dom';
import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import Sidebar from '../components/reusables/Sideba';

export default function TrustedContact() {
  const { deviceId } = useParams();
  const { data: contacts = [], isLoading, refetch } = useGetTrustedContactsQuery(deviceId);
  const [addContact] = useAddTrustedContactMutation();
  const [deleteContact] = useDeleteTrustedContactMutation();
  const [updateContact] = useUpdateTrustedContactMutation();

  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [editingContactId, setEditingContactId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact({ deviceId, contact: form }).unwrap();
      setForm({ name: '', phone: '', email: '' });
      refetch();
    } catch (err) {
      alert(err?.data?.message || 'Error adding contact');
    }
  };

  const handleDelete = async (contactId) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      await deleteContact({ deviceId, contactId });
      refetch();
    }
  };

  const handleEditSubmit = async (contactId) => {
    try {
      await updateContact({ deviceId, contactId, contact: editForm });
      setEditingContactId(null);
      refetch();
    } catch (err) {
      alert(err?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex">
      <aside className="md:block">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-0 md:ml-10 transition-all duration-300">
        <h2 className="text-4xl font-bold bg-gradient-to-r p-6 from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Trusted Contacts -  {deviceId}</h2>

        {isLoading ? (
          <p className="text-gray-400">Loading contacts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {contacts.map(contact => (
              <div key={contact.id} className="bg-gray-800 p-4 rounded shadow-md">
                {editingContactId === contact.id ? (
                  <>
                    <input
                      className="w-full mb-2 bg-gray-700 p-2 rounded"
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    />
                    <input
                      className="w-full mb-2 bg-gray-700 p-2 rounded"
                      value={editForm.phone}
                      onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                    />
                    <input
                      className="w-full mb-2 bg-gray-700 p-2 rounded"
                      value={editForm.email}
                      onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                    />
                    <button
                      onClick={() => handleEditSubmit(contact.id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded mr-2"
                    >
                      <MdSave className="inline mr-1" /> Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold">{contact.name}</h3>
                    <p>📞 {contact.phoneNumber}</p>
                    <p>📧 {contact.email || "No Email"}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingContactId(contact.id);
                          setEditForm({
                            name: contact.name,
                            phone: contact.phoneNumber,
                            email: contact.email,
                          });
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
                      >
                        <MdEdit className="inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                      >
                        <MdDelete className="inline mr-1" /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {contacts.length < 3 && (
          <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md max-w-md md:ml-12 mx-auto">
            <h3 className="text-xl font-semibold mb-4">Add Trusted Contact</h3>

            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
            />

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 w-full py-3 rounded font-semibold"
            >
              Add Contact
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
