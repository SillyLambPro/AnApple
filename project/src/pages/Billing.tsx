import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Download, Printer, DollarSign, CreditCard, Receipt, TrendingUp } from 'lucide-react';

const billingData = [
  {
    id: 1,
    invoiceNumber: 'INV-2024-001',
    patient: 'John Doe',
    patientId: 'P001',
    date: '2024-01-15',
    services: [
      { name: 'Consultation', price: 500, quantity: 1 },
      { name: 'Blood Sugar Test', price: 150, quantity: 1 },
      { name: 'BP Monitoring', price: 100, quantity: 1 }
    ],
    subtotal: 750,
    tax: 75,
    total: 825,
    status: 'Paid',
    paymentMethod: 'UPI',
    paidDate: '2024-01-15'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2024-002',
    patient: 'Jane Smith',
    patientId: 'P002',
    date: '2024-01-14',
    services: [
      { name: 'New Patient Consultation', price: 800, quantity: 1 },
      { name: 'Lab Tests', price: 300, quantity: 1 }
    ],
    subtotal: 1100,
    tax: 110,
    total: 1210,
    status: 'Pending',
    paymentMethod: null,
    paidDate: null
  },
  {
    id: 3,
    invoiceNumber: 'INV-2024-003',
    patient: 'Robert Johnson',
    patientId: 'P003',
    date: '2024-01-13',
    services: [
      { name: 'Follow-up Consultation', price: 400, quantity: 1 },
      { name: 'X-Ray', price: 250, quantity: 1 },
      { name: 'Physiotherapy Session', price: 500, quantity: 2 }
    ],
    subtotal: 1650,
    tax: 165,
    total: 1815,
    status: 'Paid',
    paymentMethod: 'Cash',
    paidDate: '2024-01-13'
  },
  {
    id: 4,
    invoiceNumber: 'INV-2024-004',
    patient: 'Mary Williams',
    patientId: 'P004',
    date: '2024-01-12',
    services: [
      { name: 'Specialist Consultation', price: 1000, quantity: 1 },
      { name: 'MRI Scan', price: 2500, quantity: 1 }
    ],
    subtotal: 3500,
    tax: 350,
    total: 3850,
    status: 'Overdue',
    paymentMethod: null,
    paidDate: null
  }
];

const paymentMethods = ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Check'];

export const Billing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const filteredInvoices = billingData.filter(invoice => {
    const matchesSearch = invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || invoice.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = billingData.reduce((sum, invoice) => sum + (invoice.status === 'Paid' ? invoice.total : 0), 0);
  const pendingAmount = billingData.reduce((sum, invoice) => sum + (invoice.status === 'Pending' ? invoice.total : 0), 0);
  const overdueAmount = billingData.reduce((sum, invoice) => sum + (invoice.status === 'Overdue' ? invoice.total : 0), 0);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="text-gray-600 mt-1">Manage patient billing and financial records</p>
        </div>
        <button
          onClick={() => setShowNewInvoice(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          New Invoice
        </button>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Receipt className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">₹{pendingAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Pending Payments</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">₹{overdueAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Overdue Amount</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{billingData.length}</div>
              <div className="text-sm text-gray-600">Total Invoices</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name, invoice number, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Invoices</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                      {invoice.patient.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{invoice.patient}</h3>
                      <p className="text-sm text-gray-600">
                        {invoice.invoiceNumber} • {invoice.patientId} • {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Services</h4>
                      <div className="space-y-1">
                        {invoice.services.map((service, index) => (
                          <div key={index} className="flex justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <span>{service.name} {service.quantity > 1 && `× ${service.quantity}`}</span>
                            <span>₹{(service.price * service.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="text-gray-900">₹{invoice.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (10%):</span>
                          <span className="text-gray-900">₹{invoice.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-1 border-t border-gray-200">
                          <span className="text-gray-900">Total:</span>
                          <span className="text-gray-900">₹{invoice.total.toLocaleString()}</span>
                        </div>
                        {invoice.paymentMethod && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="text-gray-900">{invoice.paymentMethod}</span>
                          </div>
                        )}
                        {invoice.paidDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Paid Date:</span>
                            <span className="text-gray-900">{new Date(invoice.paidDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Printer className="h-4 w-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  {invoice.status !== 'Paid' && (
                    <button 
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setShowPaymentModal(true);
                      }}
                      className="text-green-600 hover:text-green-800 px-3 py-1 text-sm border border-green-300 rounded hover:bg-green-50 transition-colors"
                    >
                      Record Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Invoice Modal */}
      {showNewInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Invoice</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Select a patient</option>
                    <option>John Doe (P001)</option>
                    <option>Jane Smith (P002)</option>
                    <option>Robert Johnson (P003)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                  <input 
                    type="date" 
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 border border-gray-200 rounded-lg">
                    <input type="text" placeholder="Service name" className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Price" className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Quantity" defaultValue="1" className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Total" readOnly className="px-3 py-2 border border-gray-300 rounded bg-gray-50" />
                  </div>
                  <button 
                    type="button"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add another service
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtotal</label>
                  <input type="number" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax (%)</label>
                  <input type="number" defaultValue="10" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                  <input type="number" readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                  rows={3}
                  placeholder="Additional notes or instructions"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Create Invoice
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewInvoice(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Record Payment</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">Invoice: {selectedInvoice.invoiceNumber}</p>
              <p className="text-sm text-gray-600">Patient: {selectedInvoice.patient}</p>
              <p className="text-lg font-semibold text-gray-900">Amount: ₹{selectedInvoice.total.toLocaleString()}</p>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Received</label>
                <input 
                  type="number" 
                  defaultValue={selectedInvoice.total}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                <input 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reference Number (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Transaction ID, Check number, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Record Payment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedInvoice(null);
                  }}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};