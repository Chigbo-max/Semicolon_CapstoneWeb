import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetTrustedContactsQuery,
  useAddTrustedContactMutation,
  useDeleteTrustedContactMutation,
  useUpdateTrustedContactMutation,
  useGetDeviceMetaDataQuery
} from '../services/androidAntiTheftApi';

import ConfirmationModal from '../components/ConfirmationModal';

import { MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { Phone, Mail } from 'lucide-react';
import Sidebar from '../components/reusables/Sideba';
import { toast } from 'sonner';

export default function TrustedContact() {
  const { deviceId } = useParams();
  const { data: deviceMetaData = [], isLoading: isMetaDataLoading } = useGetDeviceMetaDataQuery();

  const { data: contacts = [], isLoading, refetch } = useGetTrustedContactsQuery(deviceId);

  const [addContact] = useAddTrustedContactMutation();
  const [deleteContact] = useDeleteTrustedContactMutation();
  const [updateContact] = useUpdateTrustedContactMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null); 
  const [contactToActOn, setContactToActOn] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', phoneNumber: '', email: '' });
  const [editingContact, setEditingContact] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', phoneNumber: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact({ deviceId, contact: form }).unwrap();
      setForm({ name: '', phoneNumber: '', email: '' });
      toast.success('Contact added successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'Error adding contact');
    }
  };

  const confirmDelete = (contact) => {
    setActionType('delete');
    setContactToActOn(contact);
    setModalOpen(true);
  };

  const confirmEdit = (contact) => {
    setActionType('edit');
    setContactToActOn(contact);
    setEditForm({
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    });
    setModalOpen(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (actionType === 'delete') {
        await deleteContact({ deviceId, contactId: contactToActOn.id }).unwrap();
        toast.success('Contact deleted successfully');
      } else if (actionType === 'edit') {
        await updateContact({ deviceId, contactId: contactToActOn.id, contact: editForm }).unwrap();
        toast.success('Contact updated successfully');
      }

      refetch();
    } catch (err) {
      toast.error(err?.data?.message || `${actionType === 'delete' ? 'Delete' : 'Update'} failed`);
    } finally {
      setLoading(false);
      setModalOpen(false);
      setEditingContact(null);
      setEditForm({ name: '', phoneNumber: '', email: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex">
      <aside className="md:block">
        <Sidebar />
      </aside>

      <main className="flex-1 ml-0 md:ml-10 transition-all duration-300 p-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Trusted Contacts
        </h2>

        {!isMetaDataLoading && deviceMetaData?.model && (
          <div className="mb-6 p-4 bg-slate-800 rounded-lg shadow border border-slate-700">
            <p className="text-sm text-slate-300">
              Device Model: <span className="font-medium text-white">{deviceMetaData.model}</span>
            </p>
            <p className="text-sm text-slate-400">
              Last Seen: <span className="text-white">{deviceMetaData.lastSeen || 'Unknown'}</span>
            </p>
          </div>
        )}

        {isLoading ? (
          <p className="text-gray-400">Loading contacts...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-gray-800 p-4 rounded shadow-md">
                {editingContact === contact.id ? (
                  <>
                    <input
                      className="w-full mb-2 bg-gray-700 p-2 rounded"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      placeholder="Name"
                    />
                    <input
                      className="w-full mb-2 bg-gray-700 p-2 rounded"
                      value={editForm.phoneNumber}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phoneNumber: e.target.value })
                      }
                      placeholder="Phone"
                    />
                    <input
                      className="w-full mb-2 bg-gray-700 p-2 rounded"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      placeholder="Email"
                    />
                    <button
                      onClick={() => handleConfirm()}
                      className="bg-yellow-600 hover:bg-yellow-500 px-3 py-1 rounded mr-2"
                    >
                      <MdSave className="inline mr-1" /> Confirm Edit
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-lg">{contact.name}</h3>
                    <p className="flex items-center text-slate-300 mt-2">
                      <Phone className="w-4 h-4 mr-2 text-blue-400" /> {contact.phoneNumber}
                    </p>
                    <p className="flex items-center text-slate-300 mt-1">
                      <Mail className="w-4 h-4 mr-2 text-purple-400" /> {contact.email || "No Email"}
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingContact(contact.id);
                          setEditForm({
                            name: contact.name,
                            phoneNumber: contact.phoneNumber,
                            email: contact.email,
                          });
                        }}
                        className="w-24 h-16 bg-gradient-to-r from-yellow-500/20 to-yellow-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      >
                        <MdEdit className="inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(contact)}
                        className="w-24 h-16 bg-gradient-to-r from-red-500/20 to-red-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
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
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              required
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
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

        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
          title={actionType === 'delete' ? 'Confirm Delete' : 'Confirm Edit'}
          message={
            actionType === 'delete'
              ? 'Are you sure you want to delete this contact? This action cannot be undone.'
              : 'Are you sure you want to update this contact?'
          }
          loading={loading}
        />
      </main>
    </div>
  );
}