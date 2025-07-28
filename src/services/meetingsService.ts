// Service to create a Daily.co meeting room via backend API
export async function createMeetingRoom() {
  const res = await fetch('http://localhost:4000/api/create-room', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to create meeting room');
  const data = await res.json();
  return data.url || data.join_url || data; // Return the room URL
} 