import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Search, Users, Car } from 'lucide-react';

export default function StudentDatabase() {
  const [students, setStudents] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [activeTab, setActiveTab] = useState('students');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    serialNumber: '',
    name: '',
    fatherName: '',
    iqama: '',
    parentPhone: '',
    dob: '',
    nationality: '',
    driver: '',
    teacherGroup: '',
    group2: '',
    juz: ''
  });

  const [driverFormData, setDriverFormData] = useState({
    name: '',
    phone: '',
    iqama: '',
    raqamAlWadifih: ''
  });

  const [teacherFormData, setTeacherFormData] = useState({
    name: '',
    phone: '',
    iqama: '',
    raqamAlWadifih: '',
    group: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDriverInputChange = (e) => {
    setDriverFormData({
      ...driverFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleTeacherInputChange = (e) => {
    setTeacherFormData({
      ...teacherFormData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      serialNumber: '',
      name: '',
      fatherName: '',
      iqama: '',
      parentPhone: '',
      dob: '',
      nationality: '',
      driver: '',
      teacherGroup: '',
      group2: '',
      juz: ''
    });
  };

  const resetDriverForm = () => {
    setDriverFormData({
      name: '',
      phone: '',
      iqama: '',
      raqamAlWadifih: ''
    });
  };

  const resetTeacherForm = () => {
    setTeacherFormData({
      name: '',
      phone: '',
      iqama: '',
      raqamAlWadifih: '',
      group: ''
    });
  };

  const handleAdd = () => {
    if (formData.name && formData.iqama) {
      setStudents([...students, { ...formData, id: Date.now() }]);
      resetForm();
      setIsAdding(false);
    }
  };

  const handleAddDriver = () => {
    if (driverFormData.name) {
      setDrivers([...drivers, { ...driverFormData, id: Date.now() }]);
      resetDriverForm();
      setIsAdding(false);
    }
  };

  const handleAddTeacher = () => {
    if (teacherFormData.name) {
      setTeachers([...teachers, { ...teacherFormData, id: Date.now() }]);
      resetTeacherForm();
      setIsAdding(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    if (activeTab === 'students') {
      setFormData(item);
    } else if (activeTab === 'drivers') {
      setDriverFormData(item);
    } else if (activeTab === 'teachers') {
      setTeacherFormData(item);
    }
  };

  const handleUpdate = () => {
    if (activeTab === 'students') {
      setStudents(students.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
      resetForm();
    } else if (activeTab === 'drivers') {
      setDrivers(drivers.map(d => d.id === editingId ? { ...driverFormData, id: editingId } : d));
      resetDriverForm();
    } else if (activeTab === 'teachers') {
      setTeachers(teachers.map(t => t.id === editingId ? { ...teacherFormData, id: editingId } : t));
      resetTeacherForm();
    }
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      if (activeTab === 'students') {
        setStudents(students.filter(s => s.id !== id));
      } else if (activeTab === 'drivers') {
        setDrivers(drivers.filter(d => d.id !== id));
      } else if (activeTab === 'teachers') {
        setTeachers(teachers.filter(t => t.id !== id));
      }
    }
  };

  const handleCancel = () => {
    resetForm();
    resetDriverForm();
    resetTeacherForm();
    setIsAdding(false);
    setEditingId(null);
  };

  const filteredStudents = students.filter(student => {
    const term = searchTerm.toLowerCase();
    return (
      (student.name || '').toLowerCase().includes(term) ||
      (student.fatherName || '').toLowerCase().includes(term) ||
      (student.iqama || '').includes(searchTerm) ||
      (student.serialNumber || '').includes(searchTerm) ||
      (student.nationality || '').toLowerCase().includes(term)
    );
  });

  const filteredDrivers = drivers.filter(driver => {
    const term = searchTerm.toLowerCase();
    return (
      (driver.name || '').toLowerCase().includes(term) ||
      (driver.iqama || '').includes(searchTerm) ||
      (driver.raqamAlWadifih || '').includes(searchTerm)
    );
  });

  const filteredTeachers = teachers.filter(teacher => {
    const term = searchTerm.toLowerCase();
    return (
      (teacher.name || '').toLowerCase().includes(term) ||
      (teacher.iqama || '').includes(searchTerm) ||
      (teacher.raqamAlWadifih || '').includes(searchTerm) ||
      (teacher.group || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">School Database Management</h1>
          
          <div className="flex gap-2 mb-6 border-b">
            <button
              onClick={() => { setActiveTab('students'); setIsAdding(false); setEditingId(null); setSearchTerm(''); }}
              className={`px-6 py-3 font-medium transition ${activeTab === 'students' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Users className="inline mr-2" size={20} />
              Students
            </button>
            <button
              onClick={() => { setActiveTab('drivers'); setIsAdding(false); setEditingId(null); setSearchTerm(''); }}
              className={`px-6 py-3 font-medium transition ${activeTab === 'drivers' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Car className="inline mr-2" size={20} />
              Drivers
            </button>
            <button
              onClick={() => { setActiveTab('teachers'); setIsAdding(false); setEditingId(null); setSearchTerm(''); }}
              className={`px-6 py-3 font-medium transition ${activeTab === 'teachers' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <Users className="inline mr-2" size={20} />
              Teachers
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Plus size={20} />
              Add {activeTab === 'students' ? 'Student' : activeTab === 'drivers' ? 'Driver' : 'Teacher'}
            </button>
          </div>

          {activeTab === 'students' && (isAdding || editingId) && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-blue-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
