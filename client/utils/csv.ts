type LivestockData = {
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
  purchaseDate?: string;
  purchasePrice?: string;
  notes?: string;
};

export const exportToCSV = (data: LivestockData[], filename: string) => {
  // Define headers
  const headers = [
    'Tag',
    'Type',
    'Breed',
    'Status',
    'Age',
    'Weight',
    'Location',
    'Last Checkup',
    'Next Checkup',
    'Purchase Date',
    'Purchase Price',
    'Notes',
  ];

  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...data.map(item => [
      item.tag,
      item.type,
      item.breed,
      item.status,
      item.age,
      item.weight,
      item.location,
      item.lastCheckup,
      item.nextCheckup,
      item.purchaseDate || '',
      item.purchasePrice || '',
      (item.notes || '').replace(/,/g, ';'), // Replace commas in notes with semicolons
    ].join(',')),
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const parseCSV = (file: File): Promise<LivestockData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',');

        const data: LivestockData[] = lines.slice(1).map((line, index) => {
          const values = line.split(',');
          return {
            id: index + 1, // Generate new IDs
            tag: values[0] || '',
            type: values[1] || '',
            breed: values[2] || '',
            status: values[3] || '',
            age: values[4] || '',
            weight: values[5] || '',
            location: values[6] || '',
            lastCheckup: values[7] || '',
            nextCheckup: values[8] || '',
            purchaseDate: values[9] || undefined,
            purchasePrice: values[10] || undefined,
            notes: values[11] || undefined,
          };
        }).filter(item => item.tag); // Filter out empty rows

        resolve(data);
      } catch (error) {
        reject(new Error('Failed to parse CSV file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}; 