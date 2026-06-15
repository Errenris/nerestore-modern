import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const payload = req.body;
    console.log("🚨 WEBHOOK DARI PAKASIR MASUK:", payload); 

    const orderId = payload.order_id || payload.reference || payload.id; 
    const status = String(payload.status || payload.transaction_status || payload.state).toLowerCase();
    
    // KODE YANG DI-UPDATE: Menambahkan 'completed' agar dikenali sebagai lunas
    const isSuccess = ['success', 'paid', 'settlement', 'berhasil', 'completed'].includes(status);

    if (isSuccess && orderId) {
      const client = await clientPromise;
      const db = client.db('nerestore');
      const order = await db.collection('orders').findOne({ orderId });
      
      if (order && order.status === 'PENDING') {
        let assignedLinks = [];
        
        for (let item of order.cart) {
          const product = await db.collection('products').findOne({ id: item.id });
          
          if (product && product.links && product.links.length > 0) {
            const givenLink = product.links[0]; // Ambil antrean link teratas
            assignedLinks.push({ productName: product.title, link: givenLink });
            
            // Hapus link yang barusan diambil & turunkan stok
            await db.collection('products').updateOne(
              { id: item.id },
              { $pop: { links: -1 }, $inc: { stock: -1 } }
            );
          } else {
            assignedLinks.push({ productName: product.title, link: "Stok sedang kosong, lapor Admin!" });
          }
        }

        // Ubah status jadi PAID dan tanamkan link di orderan
        await db.collection('orders').updateOne(
          { orderId },
          { $set: { status: 'PAID', linksGiven: assignedLinks } }
        );
        console.log("✅ ORDER", orderId, "BERHASIL DIPROSES & LINK DIBERIKAN!");
      }
    }
    res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.error("❌ ERROR WEBHOOK:", error);
    res.status(500).json({ message: 'Error' });
  }
}
