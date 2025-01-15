export async function getUserData() {
  const res = await fetch('https://reqres.in/api/users?page=1');
  if (!res.ok) throw new Error('Failed to fetch user data');
  return res.json();
}
