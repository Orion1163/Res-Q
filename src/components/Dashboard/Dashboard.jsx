import {database} from '../../firebasecon'
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { app, auth } from '../../firebase-config';
import { collection, deleteDoc, doc, getDocs, setDoc,updateDoc, getFirestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Navigation } from '../navigation';

function Dashboard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [val, setVal] = useState([]);
  const [selectedCredential, setSelectedCredential] = useState(null); // State to hold the selected credential
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  useEffect(() => {
    getData();
  }, []);

  const value = collection(database, "policeOfficers");

  const getData = async () => {
    const dbVal = await getDocs(value);
    setVal(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  }

  const handleCreate = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Successfully created user:', userCredential.user.uid);
      await setDoc(doc(value, userCredential.user.uid), { Email: email });
      setEmail("");
      setPassword("");
      getData();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(value, id));
    getData();
  }

  const toggleShowCredentials = (credential) => {
    setSelectedCredential(credential); // Set the selected credential
    setShowModal(true); // Show the modal
  }

  const closeModal = () => {
    setShowModal(false); // Close the modal
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const collectionRef = collection(database, 'police_users');
        const snapshot = await getDocs(collectionRef);
        const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleVerified = async (id, currentVerified) => {
    try {
      const docRef = doc(database, 'police_users', id);
      await updateDoc(docRef, { verified: !currentVerified });
      // Update the local state to reflect the change
      setData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, verified: !currentVerified } : item
        )
      );
    } catch (error) {
      console.error('Error updating verification status:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#333', color: '#ffffff', height: '500%' }}>
      <div className='container' style={{ backgroundColor: '#333', color: '#ffffff' }}>
        <Navigation />
        <div className="content" style={{ backgroundColor: '#333' }}>
          <div className="container-box">
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='input-box' placeholder='Email' style={{ color: '#000000' }} /><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input-box' placeholder='Password' style={{ color: '#000000' }} /> <br />
            <button onClick={handleCreate} className='create-box'>Create</button>
          </div><br /><br />
          <h2>Police Officers List</h2>
          <table style={{ backgroundColor: '#333', color: '#ffffff' }}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {val.map(values =>
                <tr key={values.id}>
                  <td>{values.Email}</td>
                  <td>
                    <button onClick={() => handleDelete(values.id)} className='delete-box'>Delete</button>
                    <button onClick={() => toggleShowCredentials(values)} className='show-box'>Show Credentials</button> {/* Button to toggle visibility of credentials */}
                  </td>
                </tr>
              )}
            </tbody>
          </table><br /><br /><br />
          {showModal && ( // Conditionally render the modal if showModal is true
            <div className="modal">
              <div className="modal-content" style={{ backgroundColor: '#333', color: '#ffffff' }}>
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Credentials</h2>
                <p><strong>Email:</strong> {selectedCredential?.Email}</p>
                <p><strong>Password:</strong> {selectedCredential?.Password}</p>
              </div>
            </div>
          )}
        </div>
        <div>
        <h2>Data from Firebase:</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Service City</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.serviceCity}</td>
              <td>
                <button onClick={() => toggleVerified(item.id, item.verified)}>
                  {item.verified ? 'Verified' : 'Not Verified'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
      
    </div>
  );
}

export default Dashboard;
