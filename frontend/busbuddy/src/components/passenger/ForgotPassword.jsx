import React, { useState } from "react";
import loginBg from '../../assets/images/login.jpg';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            // Replace with your API endpoint
            const response = await fetch("/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                setMessage("Password reset link sent to your email.");
            } else {
                setMessage("Failed to send reset link. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
            {/* Background image with dark overlay */}
            <img
                src={loginBg}
                alt="Forgot Password Background"
                className="absolute inset-0 w-full h-full object-contain md:object-cover opacity-100 -z-20 transition-all duration-700"
                draggable="false"
            />
            <div className="absolute inset-0 bg-black/60 -z-10" />
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 w-full max-w-md relative z-10 ring-1 ring-white/40">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">Forgot Password</h2>
                    <p className="text-blue-100 mt-2 drop-shadow">Enter your email to receive a password reset link</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative mb-2">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            autoComplete="off"
                            className="peer w-full px-4 py-3 border border-blue-200 bg-white/30 text-white placeholder-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 shadow-sm backdrop-blur"
                        />
                        <label htmlFor="email" className="absolute left-4 top-3 text-blue-100 text-sm pointer-events-none transition-all duration-200
                            peer-focus:-top-5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-blue-200
                            peer-valid:-top-5 peer-valid:left-2 peer-valid:text-xs peer-valid:text-blue-200
                            bg-transparent px-1">
                            Email Address
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-200 flex items-center justify-center disabled:opacity-50 ring-2 ring-blue-300/40"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-blue-100 font-medium">{message}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;