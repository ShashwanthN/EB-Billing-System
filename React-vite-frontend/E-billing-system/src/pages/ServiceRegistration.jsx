  import React, { useState, useCallback, useEffect } from 'react';
  import axios from 'axios';
  import { useDropzone } from 'react-dropzone';
  import Topbar from '../components/Topbar';
  import bg from "../assets/powerlines.jpg";
  import logo from "../assets/logo.png";
  import { useNavigate } from 'react-router-dom';
  import Select from 'react-select';
  import citiesData from '../assets/cities.json';
  import axiosInstance from '../services/axiosInstance';

  const ServiceRegistration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user_id, setUserId] = useState('');
    const [connectionType, setConnectionType] = useState('household');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState(null);
    const [loadRequired, setLoadRequired] = useState('');
    const [phase, setPhase] = useState('');
    const [applicantPhoto, setApplicantPhoto] = useState(null);
    const [propertyTaxReport, setPropertyTaxReport] = useState(null);
    const [businessName, setBusinessName] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [sqMeter, setSqMeter] = useState('');
    const [ownershipProof, setOwnershipProof] = useState(null);
    const [referenceNumber, setReferenceNumber] = useState(null);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.userId) {
        setUserId(storedUser.userId);
      }
    }, []);

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
      setLoading(true);
      const formData = new FormData();
      formData.append('userId', user_id);
      formData.append('address', `${address}, ${city ? city.label : ''}`);
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
        const token = localStorage.getItem('token'); 

        const response = await axios.post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.data.payment_url) {
          setReferenceNumber(response.data.reference_number);
          navigate('/ApplicationConfirmation', {
            state: {
              paymentUrl: response.data.payment_url,
              referenceNumber: response.data.reference_number,
              userId: user_id,
              address: `${address}, ${city ? city.label : ''}`,
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
      } finally {
        setLoading(false);
      }
    };
    const customStyles = {
      control: (provided) => ({
        ...provided,
        backgroundColor: 'transparent',
        borderColor: 'gray',
        color: '#e7e7e7'
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#1a1a1c',
        color: "#e7e7e7",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'transparent', 
        color: state.isFocused ? '#e7e7e7' : '#e7e7e7',
      }),
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
      <div className="relative h-screen overflow-scroll main-content  bg-cover bg-center">
         {loading && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
      <div className={`loading-bar ${loading ? "loading" : ""}`}></div>
        <img
          src={bg}
          alt="background"
          className="bg-full overflow-hidden brightness-50 hue-rotate-15 max-h-screen"
        />
        <div className="relative h-max max-w-2xl rounded  mx-auto p-8 backdrop-blur-2xl backdrop-brightness-50 border border-[#555555] mb-10">
          <div className="flex items-center mb-10 justify-between">
            <h2 className="text-3xl font-bold text-gray-3">Service Registration</h2>
            <img src={logo} alt="logo" className="w-36 h-36" />
          </div>

          <form onSubmit={handleRegister} className="max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">User ID:</label>
              <div
                className="appearance-none rounded-sm border transition-all border-gray-2 duration-200 bg-transparent hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
                
              >{user_id}</div>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">Connection Type:</label>
              <select
                value={connectionType}
                onChange={(e) => setConnectionType(e.target.value)}
                className="appearance-none rounded-sm border transition-all bg-transparent border-gray-2 duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
              >
                <option value="household">Household</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">Address:</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="appearance-none rounded-sm border bg-transparent transition-all border-gray-2 duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
                placeholder="Enter your address"
              />
            </div>
            <div className="flex flex-col bg-transparent">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">City:</label>
              <Select
                value={city}
                onChange={setCity}
                className='border-gray-2 bg-transparent'
                options={citiesData.map(city => ({ label: city, value: city }))}
                placeholder="Select your city"
                styles={customStyles}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">Load Required (in kW):</label>
              <input
                type="number"
                step="0.01"
                value={loadRequired}
                onChange={(e) => setLoadRequired(e.target.value)}
                required
                className="appearance-none rounded-sm bg-transparent border-gray-2 border transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
                placeholder="Enter the load required"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">Phase:</label>
              <input
                type="number"
                step="0.01"
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                required
                className="appearance-none rounded-sm border bg-transparent border-gray-2 transition-all duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
                placeholder="Enter the phase"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">Applicant Photo:</label>
              <div
                {...applicantPhotoDropzone.getRootProps()}
                className="border-dashed border-2 p-4 rounded-md border-gray-2 transition-all duration-200 hover:border-gray-500 cursor-pointer"
              >
                <input {...applicantPhotoDropzone.getInputProps()} />
                <p className="text-center text-gray-3">
                  {applicantPhoto ? applicantPhoto.name : 'Drag & drop a photo here, or click to select a photo'}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-3 text-sm text-left font-bold mb-2">Property Tax Report:</label>
              <div
                {...propertyTaxReportDropzone.getRootProps()}
                className="border-dashed border-2 p-4 rounded-md border-gray-2 transition-all duration-200 hover:border-gray-500 cursor-pointer"
              >
                <input {...propertyTaxReportDropzone.getInputProps()} />
                <p className="text-center text-gray-3">
                  {propertyTaxReport ? propertyTaxReport.name : 'Drag & drop a property tax report here, or click to select a file'}
                </p>
              </div>
            </div>

            {connectionType === 'commercial' && (
              <>
                <div className="flex flex-col">
                  <label className="block text-gray-3 text-sm text-left font-bold mb-2">Business Name:</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className="appearance-none bg-transparent rounded-sm border transition-all border-gray-2 duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
                    placeholder="Enter the business name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-3 text-sm text-left font-bold mb-2">Business Type:</label>
                  <input
                    type="text"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    required
                    className="appearance-none bg-transparent rounded-sm border transition-all duration-200 border-gray-2 hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
                    placeholder="Enter the business type"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-3 text-sm text-left font-bold mb-2">Area (in sq meters):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={sqMeter}
                    onChange={(e) => setSqMeter(e.target.value)}
                    required
                    className="appearance-none bg-transparent rounded-sm border transition-all border-gray-2 duration-200 hover:border-gray w-full py-2 px-3 text-gray-3 leading-tight focus:outline-accent focus:shadow-outline"
                    placeholder="Enter the area in sq meters"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-gray-3 text-sm text-left font-bold mb-2">Ownership Proof:</label>
                  <div
                    {...ownershipProofDropzone.getRootProps()}
                    className="border-dashed border-2 p-4 rounded-md transition-all  border-gray-2 duration-200 hover:border-gray-500 cursor-pointer"
                  >
                    <input {...ownershipProofDropzone.getInputProps()} />
                    <p className="text-center text-gray-3">
                      {ownershipProof ? ownershipProof.name : 'Drag & drop ownership proof here, or click to select a file'}
                    </p>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-lightBlue-600 hover:bg-lightBlue-700 text-white font- py-2 px-3 rounded-md transition shadow-xl hover:shadow-none hover:outline-none outline outline-1 hover:text-trueGray-300 outline-light-blue-900 duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default ServiceRegistration;
