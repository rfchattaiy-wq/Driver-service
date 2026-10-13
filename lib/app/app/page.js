'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    duration: 2,
    transmission: 'Manual',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('bookings').insert([
      {
        customer_name: formData.name,
        customer_phone: formData.phone,
        pickup_location: formData.pickup,
        destination: formData.destination,
        pickup_date: formData.date,
        pickup_time: formData.time,
        duration_hours: Number(formData.duration),
        transmission_type: formData.transmission,
      },
    ]);

    setLoading(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('ബുക്കിംഗ് രജിസ്റ്റർ ചെയ്തു!');
      const msg = encodeURIComponent(
        `New Driver Booking:\nName: ${formData.name}\nPickup: ${formData.pickup}\nDate: ${formData.date} ${formData.time}`
      );
      window.location.href = `https://wa.me/919999999999?text=${msg}`;
    }
  };

  return (
    <div style={{ maxWidth: '420px', margin: '30px auto', padding: '24px', fontFamily: 'sans-serif', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#111' }}>Book a Driver</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input
          type="text"
          placeholder="നിങ്ങളുടെ പേര്"
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="tel"
          placeholder="ഫോൺ നമ്പർ"
          required
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="പിക്കപ്പ് സ്ഥലം"
          required
          onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="ഡെസ്റ്റിനേഷൻ"
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="date"
            required
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <input
            type="time"
            required
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>
        <select
          onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="Manual">Manual Car</option>
          <option value="Automatic">Automatic Car</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: '12px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}
        >
          {loading ? 'Submitting...' : 'Book Driver'}
        </button>
      </form>
    </div>
  );
}
