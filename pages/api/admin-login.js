export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method tidak diizinkan' });
  }

  const { password } = req.body;
  
  // Mengambil password asli dari brankas Vercel (ENV)
  const truePassword = process.env.ADMIN_PASSWORD;

  if (!truePassword) {
    return res.status(500).json({ success: false, message: 'Admin belum setting password di Vercel!' });
  }

  // Cocokkan password dari form dengan password di Vercel
  if (password === truePassword) {
    return res.status(200).json({ success: true, message: 'Login sukses!' });
  } else {
    return res.status(401).json({ success: false, message: 'Password Salah!' });
  }
}
