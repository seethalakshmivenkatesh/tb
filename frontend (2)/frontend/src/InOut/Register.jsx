import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        phone: '',
        age: '',
        country: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {

            await axios.post("http://localhost:5000/api/v1/auth/register", formData, { withCredentials: true });

            setFormData({
                username: '',
                password: '',
                phone: '',
                age: '',
                country: '',
            });

            navigate('/homeparent');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6 border p-6 rounded shadow">
            <h2 className="text-2xl italic mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border rounded font-serif p-2"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border font-serif rounded p-2"
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border font-serif rounded p-2"
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border font-serif rounded p-2"
                    required
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border font-serif rounded p-2"
                    required
                />
                <button
                    type="submit"
                    className="w-full mt-4 border italic bg-gray-200 hover:from-red-500 hover:to-purple-700 text-black py-2.5 px-4 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-[1.02]"
                >
                    Register
                </button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
};

export default Register;
