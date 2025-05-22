import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Mail, Phone, Star, BookOpen } from 'lucide-react';

const AdminPage = () => {
    const [tutors, setTutors] = useState([
        {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah.johnson@email.com",
            phone: "+1 (555) 123-4567",
            subjects: ["Mathematics", "Physics"],
            rating: 4.8,
            experience: "5 years",
            status: "Active",
            joinDate: "2023-01-15",
            hourlyRate: "$45"
        },
        {
            id: 2,
            name: "Michael Chen",
            email: "michael.chen@email.com",
            phone: "+1 (555) 234-5678",
            subjects: ["Computer Science", "Programming"],
            rating: 4.9,
            experience: "7 years",
            status: "Active",
            joinDate: "2022-08-20",
            hourlyRate: "$60"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            email: "emily.rodriguez@email.com",
            phone: "+1 (555) 345-6789",
            subjects: ["Spanish", "Literature"],
            rating: 4.7,
            experience: "3 years",
            status: "Inactive",
            joinDate: "2023-03-10",
            hourlyRate: "$35"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingTutor, setEditingTutor] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subjects: "",
        experience: "",
        hourlyRate: "",
        status: "Active"
    });

    const filteredTutors = tutors.filter(tutor =>
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddTutor = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            subjects: "",
            experience: "",
            hourlyRate: "",
            status: "Active"
        });
        setEditingTutor(null);
        setShowAddModal(true);
    };

    const handleEditTutor = (tutor) => {
        setFormData({
            name: tutor.name,
            email: tutor.email,
            phone: tutor.phone,
            subjects: tutor.subjects.join(", "),
            experience: tutor.experience,
            hourlyRate: tutor.hourlyRate,
            status: tutor.status
        });
        setEditingTutor(tutor);
        setShowAddModal(true);
    };

    const handleDeleteTutor = (id) => {
        if (window.confirm("Are you sure you want to delete this tutor?")) {
            setTutors(tutors.filter(tutor => tutor.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingTutor) {
            // Update existing tutor
            setTutors(tutors.map(tutor =>
                tutor.id === editingTutor.id
                    ? {
                        ...tutor,
                        ...formData,
                        subjects: formData.subjects.split(",").map(s => s.trim())
                    }
                    : tutor
            ));
        } else {
            // Add new tutor
            const newTutor = {
                id: Math.max(...tutors.map(t => t.id)) + 1,
                ...formData,
                subjects: formData.subjects.split(",").map(s => s.trim()),
                rating: 0,
                joinDate: new Date().toISOString().split('T')[0]
            };
            setTutors([...tutors, newTutor]);
        }

        setShowAddModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">Tutor Management</h1>
                        <button
                            onClick={handleAddTutor}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                            <Plus size={20} />
                            Add New Tutor
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search tutors by name, email, or subject..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{tutors.length}</div>
                        <div className="text-gray-600">Total Tutors</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-green-600">{tutors.filter(t => t.status === 'Active').length}</div>
                        <div className="text-gray-600">Active Tutors</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-yellow-600">{tutors.filter(t => t.status === 'Inactive').length}</div>
                        <div className="text-gray-600">Inactive Tutors</div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">{Math.round(tutors.reduce((acc, t) => acc + t.rating, 0) / tutors.length * 10) / 10}</div>
                        <div className="text-gray-600">Avg Rating</div>
                    </div>
                </div>

                {/* Tutors Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTutors.map((tutor) => (
                                    <tr key={tutor.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-600 font-medium">{tutor.name.split(' ').map(n => n[0]).join('')}</span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{tutor.name}</div>
                                                    <div className="text-sm text-gray-500">Joined {tutor.joinDate}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <Mail size={14} className="mr-2 text-gray-400" />
                                                    {tutor.email}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <Phone size={14} className="mr-2 text-gray-400" />
                                                    {tutor.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {tutor.subjects.map((subject, index) => (
                                                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        <BookOpen size={12} className="mr-1" />
                                                        {subject}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Star size={16} className="text-yellow-400 mr-1" />
                                                <span className="text-sm font-medium text-gray-900">{tutor.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {tutor.experience}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {tutor.hourlyRate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${tutor.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {tutor.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditTutor(tutor)}
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTutor(tutor.id)}
                                                    className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">
                                    {editingTutor ? 'Edit Tutor' : 'Add New Tutor'}
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subjects (comma-separated)</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subjects}
                                            placeholder="Mathematics, Physics, Chemistry"
                                            onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.experience}
                                            placeholder="5 years"
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.hourlyRate}
                                            placeholder="$45"
                                            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddModal(false)}
                                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                        >
                                            {editingTutor ? 'Update' : 'Add'} Tutor
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;