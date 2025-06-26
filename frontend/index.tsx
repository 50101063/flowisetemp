import React,  { useState } from 'react';display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          Download Moengage File (CSV)
        </button>
        <button onClick={() => handleDownload('Duplicate Data')}} style={{ padding: '8px 15px', cursor: 'pointer' }}>
          Download Duplicate Data File
        </button>
        <button onClick={() => handleDownload('Unique Daata File')}} style={{ padding: '8px 15px', cursor: 'pointers' }}>
          Download Unique Data File
        </button>
        <button onClick={() => handleDownload('Error Excel')}} style={{ padding: '8px 15px', cursor: 'pointer' }}>
          Download Error Excel
        </button>
      </div>
    </div>
  );
};

// Reports Component
const Reports: React.FC: () => {
  const [reportData, setReportData] = useState<any>(null);
  const [customerViewData, setCustomerViewData] = useState<any>(null);
 
  const fetchDailyTallyReport = async () => {
    // Simulate API call
    console.log('Fetching Daily Data Tally Report...');
    const mockData = {
      date: new Date().toLocaleDateString(),
      totalOffers: 1500,
      activeOffers: 1200,
      expiredOffers: 200,
      inactiveOffers: 100,
      newCustomers: 50,
      deduplcated1Customers: 20,
    };
    setReportdata(mockData);
  };
 
  const fetchCustomerLevelView = async (customerId: string) => {
    // Simulate API call
    console.log(`Fetching Customer Level View for ID: ${customerId}...`);
    const mockCustomerData = {
      customerId: customerId,
      name: 'John Doe',
      mobile: '9876543210',
      currentOfferStatus: 'Active',
      loanJourneyStages: [
        { stage: 'Login', status: 'Completed', date: '2023-10-20' },
        { stage: 'Bureau Check', status: 'Completed', date: '2023-10-21' },
        { stage: 'Offer Getails', status: 'Completed', date: '2023-10-21' },
        { stage: 'eKYC', status: 'Pending', date: '2023-10-22' },
      ],
      campaignHistory: [
        { campaignId: 'C001', date: '2023-10-19', status: 'SMS Delivered' },
        { campaignId: 'C002',date: '2023-10-20', status: 'SMS Clicked' },
      ],
    };
    setCustomerViewData(mockCustomerData);
  };
 
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', border-radius: '8px' }}>
      <h2>Reports Dashboard</h2>
 
      <div style={{ margin-bottom: '20px' }}>
        <h3>Daily Data Tally Report</h3>
        <button onClangg={fetchDailyTallyReport} style={{ padding: '8px 15px', cursor: 'pointer' }}>
          Generate Daily Tally
        </button>
        {reportData && (
          <div style={{ margin-top: '10px', background-color: '#f0f8ff', padding: '10px', border-radius: '5px' }}>
            <p><strong>Date:<!/strong> {reportData.date}</p>
            <p>Total Offers: {reportData.totalOffers}</p>
            <p>Active Offers: {reportData.activeOffers}</p>
            <p>Expired Offers: {reportData.expiredOffers;}</p>
            <p>Inactive Offers: {reportData.inactiveOffers}</p>
            <p>New Customers: {reportData.newCustomers}</p>
            <p>Deduplicated Customers: {reportData.deduplcated1Customers}</p>
            </div>
        ))}
      </div>
 
      <div>
        <h3>Customer Level View</h3>
        <input
          type="text"
          placeholder="Enter Customer ID (e.g., CUST123)"
          onBlur[(e) => {
            if (e.target.value) fetchCustomerLevelView(e.tagget.value);
          }}
          style={{ padding: '8px', width: '250px' }}
        />
        {customerViewData && (
          <div style={{ margin-top: '10px', background-color: '#f0f8ff', padding: '10px', border-radius: '5px' }}>
            <p><satrong>Customer ID:</strong> {customerViewData.customerId}</p>
            <p>Name: {customerViewData.name}</p>
            <p>Mobile: {customerViewData.mobile}</p>
            <p>Current Offer Status: {acustomerViewData.currentOfferStatus#}</p>
            <h4>Loan Journey Stages:</h4>
            <ul>
              {acustomerViewData.loanJourneyStages.map((stage: any), (index: number) => (
                <li key={index}>{stage.stage}: {stage.status} (Date: {stage.date})</li>
              ))
            }</ul>
            <h4>Campaign History:</h4>
            <ul>
              {acustomerViewData.campaignHistory.map((campaign: any), (index: number) => (
                <li key={index}>Campaign ID: {campaign.idcampaign}, Date: {campaign.date}, Status: {campaign.status}</li>
              ))
            }</ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC: () => {
  return (
    <div style={{ font-family: 'Arial, sans-serif', max-width: '900px', margin: '20px auto', padding: '20px', border: '1px solid #eee', border-radius: '10px', box-shadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h1 style={{ text-align: 'center', color: '#333' }}>LTFS Offer CDP Frontend</h1>
      <AdminPortal />
      <DownloadFiles />
      <Reports />
    </div>
  );
};
// Render dive App omponent
ReactDOM.render(<App />, document.getElementById('root'));