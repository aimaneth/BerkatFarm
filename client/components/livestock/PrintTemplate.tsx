import React from 'react';

interface PrintTemplateProps {
  data: Array<{
    id: number;
    tag: string;
    type: string;
    breed: string;
    status: string;
    age: string;
    weight: string;
    location: string;
    lastCheckup: string;
    nextCheckup: string;
  }>;
}

export function PrintTemplate({ data }: PrintTemplateProps) {
  return (
    <div className="p-8 bg-white print:p-0">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Livestock Inventory Report</h1>
        <p className="text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left border">Tag</th>
            <th className="p-2 text-left border">Type</th>
            <th className="p-2 text-left border">Breed</th>
            <th className="p-2 text-left border">Status</th>
            <th className="p-2 text-left border">Age</th>
            <th className="p-2 text-left border">Weight</th>
            <th className="p-2 text-left border">Location</th>
            <th className="p-2 text-left border">Last Checkup</th>
            <th className="p-2 text-left border">Next Checkup</th>
          </tr>
        </thead>
        <tbody>
          {data.map((animal) => (
            <tr key={animal.id} className="border-b hover:bg-gray-50">
              <td className="p-2 border">{animal.tag}</td>
              <td className="p-2 border">{animal.type}</td>
              <td className="p-2 border">{animal.breed}</td>
              <td className="p-2 border">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  animal.status === 'Healthy'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {animal.status}
                </span>
              </td>
              <td className="p-2 border">{animal.age}</td>
              <td className="p-2 border">{animal.weight}</td>
              <td className="p-2 border">{animal.location}</td>
              <td className="p-2 border">{animal.lastCheckup}</td>
              <td className="p-2 border">{animal.nextCheckup}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p>Total Animals: {data.length}</p>
            <p>Healthy: {data.filter(a => a.status === 'Healthy').length}</p>
            <p>Under Treatment: {data.filter(a => a.status === 'Under Treatment').length}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p className="text-sm text-gray-600">
              This report includes all livestock data as of {new Date().toLocaleString()}.
              Please refer to the digital system for real-time updates.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Berkat Farm - Livestock Management System</p>
      </div>
    </div>
  );
} 