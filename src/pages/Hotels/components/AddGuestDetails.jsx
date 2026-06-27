import React, {Component} from 'react';

class AddGuestDetails extends Component {
    render() {
    const {guest,update} =this.props;
        return (
            <div>
                <div className="grid gap-3 sm:grid-cols-2 mt-4">
                    <Input label="First Name" value={guest.firstName} onChange={update("firstName")} required />
                    <Input label="Last Name" value={guest.lastName} onChange={update("lastName")} required />
                    <Input label="Email" type="email" value={guest.email} onChange={update("email")} required />
                    <Input label="Mobile Number" type="tel" pattern="[0-9]{10}" value={guest.phone} onChange={update("phone")} required />
                </div>
                <label className="block mt-3">
                    <span className="text-xs font-semibold text-gray-600">Special Requests (optional)</span>
                    <textarea
                        value={guest.requests}
                        onChange={update("requests")}
                        rows={3}
                        className="w-full mt-1 border border-gray-200 rounded p-2 text-sm outline-none focus:border-mmtBlue"
                        placeholder="Late check-in, high floor, etc."
                    />
                </label>
            </div>
        );
    }
}

function Input({ label, ...rest }) {
    return (
        <label className="block">
            <span className="text-xs font-semibold text-gray-600">{label}</span>
            <input
                {...rest}
                className="w-full mt-1 border border-gray-200 rounded p-2 text-sm outline-none focus:border-mmtBlue"
            />
        </label>
    );
}

export default AddGuestDetails;
