import { useState } from 'react';
import { Calendar, Clock, ChevronDown, Plus, Trash2 } from 'lucide-react';

export default function TaskoDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, category: 'Art and Craft', status: 'Pending', date: 'Friday, April 19 - 2024', avatar: null },
    { id: 2, category: 'Art and Craft', status: 'InProgress', date: 'Friday, April 19 - 2024', avatar: '/api/placeholder/32/32' },
    { id: 3, category: 'Art and Craft', status: 'Done', date: 'Friday, April 19 - 2024', avatar: null },
    { id: 4, category: 'Art and Craft', status: 'InProgress', date: 'Friday, April 19 - 2024', avatar: null },
    { id: 5, category: 'Art and Craft', status: 'Done', date: 'Friday, April 19 - 2024', avatar: '/api/placeholder/32/32' },
    { id: 6, category: 'Art and Craft', status: 'Pending', date: 'Friday, April 19 - 2024', avatar: '/api/placeholder/32/32' },
    { id: 7, category: 'Art and Craft', status: 'Pending', date: 'Friday, April 19 - 2024', avatar: null },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-purple-500';
      case 'InProgress': return 'text-amber-500';
      case 'Done': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'Pending': return 'bg-purple-500';
      case 'InProgress': return 'bg-amber-500';
      case 'Done': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-800 to-teal-700 text-white p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
          <div className="relative h-full">
            {/* Header illustrations would go here */}
            <div className="absolute right-6 top-6 w-24 h-24 bg-teal-600 rounded-lg opacity-50"></div>
            <div className="absolute right-24 top-12 w-20 h-20 bg-teal-500 rounded-lg opacity-40"></div>
            <div className="absolute right-16 top-20 w-16 h-16 bg-teal-400 rounded-lg opacity-30"></div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-8 z-10 relative">
          <div className="flex items-center">
            <Clock className="h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold">Tasko</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 bg-teal-700 px-4 py-2 rounded-lg">
              <div className="w-5 h-5 bg-green-400 rounded-md"></div>
              <span>Task List</span>
            </button>
            
            <button className="flex items-center space-x-2">
              <div className="w-5 h-5 border border-white rounded-full"></div>
              <span>Spin</span>
            </button>
            
            <div className="flex items-center space-x-2 bg-teal-700 bg-opacity-30 rounded-full px-3 py-1">
              <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                <img src="/api/placeholder/32/32" alt="User" className="w-full h-full object-cover" />
              </div>
              <span>Thomas M.</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
        
        <div className="z-10 relative">
          <p className="text-teal-200">Hi Thomas</p>
          <h2 className="text-4xl font-bold">Welcome to Dashboard</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 flex-1">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Filter Bar */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">All Task List</h3>
            
            <div className="flex space-x-4 items-center">
              <div className="relative">
                <select className="appearance-none border rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option>Select Task Category</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="relative">
                <select className="appearance-none border rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                  <option>All Task</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              
              <button className="bg-green-400 hover:bg-green-500 text-white rounded-md px-4 py-2 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Task
              </button>
            </div>
          </div>

          {/* Task Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 relative">
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                
                <div className="flex items-start mb-3">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <div className="w-6 h-6 bg-green-500 rounded-md"></div>
                  </div>
                  <h4 className="text-lg font-medium">{task.category}</h4>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Select the role that you want to candidates for and upload your job description.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {task.avatar ? (
                      <img src={task.avatar} alt="User" className="w-8 h-8 rounded-full mr-2" />
                    ) : (
                      <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                    )}
                    <span className="text-sm text-gray-500">{task.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-2 h-2 ${getStatusDot(task.status)} rounded-full mr-2`}></div>
                    <span className={`text-sm ${getStatusColor(task.status)}`}>{task.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}