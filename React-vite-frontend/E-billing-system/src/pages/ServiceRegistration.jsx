import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Topbar from '../components/Topbar';
import bg from "../assets/powerlines.jpg";
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

const ServiceRegistration = () => {
  const navigate = useNavigate();

  const [user_id, setUserId] = useState('');
  const [connectionType, setConnectionType] = useState('household');
  const [address, setAddress] = useState('');
  const [loadRequired, setLoadRequired] = useState('');
  const [phase, setPhase] = useState('');
  const [applicantPhoto, setApplicantPhoto] = useState(null);
  const [propertyTaxReport, setPropertyTaxReport] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [sqMeter, setSqMeter] = useState('');
  const [ownershipProof, setOwnershipProof] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections, setFile) => {
      if (acceptedFiles.length) {
        setFile(acceptedFiles[0]);
      }

      if (fileRejections.length) {
        fileRejections.forEach((file) => {
          file.errors.forEach((err) => {
            if (err.code === 'file-too-large') {
              alert('File is too large. Max size is 10MB.');
            }
          });
        });
      }
    },
    []
  );

  const handleRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('userId', user_id);
    formData.append('address', address);
    formData.append('load_required', loadRequired);
    formData.append('phase', phase);
    formData.append('applicant_photo', applicantPhoto);
    formData.append('property_tax_report', propertyTaxReport);

    let url = 'http://localhost:8080/connections/household';

    if (connectionType === 'commercial') {
      formData.append('business_name', businessName);
      formData.append('business_type', businessType);
      formData.append('sq_meter', sqMeter);
      formData.append('ownership_proof', ownershipProof);
      url = 'http://localhost:8080/connections/commercial';
    }

    try {
      const response = await axios.post(url, formData);
      if (response.data.payment_url) {
        setReferenceNumber(response.data.reference_number);
        navigate('/ApplicationConfirmation', {
          state: {
            paymentUrl: response.data.payment_url,
            referenceNumber: response.data.reference_number,
            userId: user_id,
            address: address,
            loadRequired: loadRequired,
            phase: phase,
            connectionType: connectionType,
            businessName: businessName,
            businessType: businessType,
            sqMeter: sqMeter,
          },
        });
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('There was an error registering the connection!', error);
      alert('Registration failed');
    }
  };

  const applicantPhotoDropzone = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => onDrop(acceptedFiles, fileRejections, setApplicantPhoto),
    maxSize: 10485760,
    multiple: false,
    accept: 'image/*',
  });

  const propertyTaxReportDropzone = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => onDrop(acceptedFiles, fileRejections, setPropertyTaxReport),
    maxSize: 10485760,
    multiple: false,
    accept: 'application/pdf',
  });

  const ownershipProofDropzone = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => onDrop(acceptedFiles, fileRejections, setOwnershipProof),
    maxSize: 10485760,
    multiple: false,
    accept: 'image/*',
  });

  return (
    <div className="relative h-screen overflow-scroll mt-2 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <Topbar />
      <div className="relative h-max max-w-2xl mx-auto p-8 bg-white mt-10">
        <div className="flex items-center my-10 justify-between">
          <h2 className="text-3xl font-bold text-gray-700">Service Registration</h2>
          <img src={logo} alt="logo" className="w-36 h-36" />
        </div>

        <form onSubmit={handleRegister} className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col">
            <label className="block text-gray text-sm text-left font-bold mb-2">User ID:</label>
            <input
              type="text"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              placeholder="Enter your User ID"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-gray text-sm text-left font-bold mb-2">Connection Type:</label>
            <select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value)}
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
            >
              <option value="household">Household</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="block text-gray text-sm text-left font-bold mb-2">Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              placeholder="Enter your address"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-gray text-sm text-left font-bold mb-2">Load Required (in kW):</label>
            <input
              type="number"
              step="0.01"
              value={loadRequired}
              onChange={(e) => setLoadRequired(e.target.value)}
              required
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              placeholder="Enter the load required"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-gray text-sm text-left font-bold mb-2">Phase:</label>
            <input
              type="number"
              step="0.01"
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              required
              className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
              placeholder="Enter the phase"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-gray text-sm text-left font-bold mb-2">Applicant Photo:</label>
            <div
              {...applicantPhotoDropzone.getRootProps()}
              className="border-dashed border-2 p-4 rounded-md transition-all duration-200 hover:border-gray-500 cursor-pointer"
            >
              <input {...applicantPhotoDropzone.getInputProps()} />
              <p className="text-center text-gray-500">
                {applicantPhoto ? applicantPhoto.name : 'Drag & drop a photo here, or click to select a photo'}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray text-sm text-left font-bold mb-2">Property Tax Report:</label>
            <div
              {...propertyTaxReportDropzone.getRootProps()}
              className="border-dashed border-2 p-4 rounded-md transition-all duration-200 hover:border-gray-500 cursor-pointer"
            >
              <input {...propertyTaxReportDropzone.getInputProps()} />
              <p className="text-center text-gray-500">
                {propertyTaxReport ? propertyTaxReport.name : 'Drag & drop a file here, or click to select a file'}
              </p>
            </div>
          </div>

          {connectionType === 'commercial' && (
            <>
              <div className="flex flex-col">
                <label className="block text-gray text-sm text-left font-bold mb-2">Business Name:</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required={connectionType === 'commercial'}
                  className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
                  placeholder="Enter your business name"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray text-sm text-left font-bold mb-2">Business Type:</label>
                <input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  required={connectionType === 'commercial'}
                  className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
                  placeholder="Enter your business type"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray text-sm text-left font-bold mb-2">Square Meters:</label>
                <input
                  type="number"
                  step="0.01"
                  value={sqMeter}
                  onChange={(e) => setSqMeter(e.target.value)}
                  required={connectionType === 'commercial'}
                  className="appearance-none rounded-sm border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray leading-tight focus:outline-accent focus:shadow-outline"
                  placeholder="Enter the square meters"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray text-sm text-left font-bold mb-2">Ownership Proof:</label>
                <div
                  {...ownershipProofDropzone.getRootProps()}
                  className="border-dashed border-2 p-4 rounded-md transition-all duration-200 hover:border-gray-500 cursor-pointer"
                >
                  <input {...ownershipProofDropzone.getInputProps()} />
                  <p className="text-center text-gray-500">
                    {ownershipProof ? ownershipProof.name : 'Drag & drop a file here, or click to select a file'}
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-accent hover:bg-accent-dark text-white font-bold rounded-md focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceRegistration;
