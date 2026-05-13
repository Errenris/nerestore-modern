import { useMemo, useState } from 'react'

function formatIDR(n) {
  const num = Number(n)
  if (!Number.isFinite(num)) return String(n)
  return new Intl.NumberFormat('id-ID').format(num)
}

export default function CartModal({ open, setOpen, cart, setCart }) {
  const [showQR, setShowQR] = useState(false)

  const total = useMemo(
    () => cart.reduce((sum, p) => sum + (Number(p.price) || 0), 0),
    [cart]
  )

  if (!open) return null

  const removeAt = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx))

  const buildMessage = () => {
    const lines = cart.map((p, i) => `${i + 1}. ${p.displayTitle || p.title} — Rp ${formatIDR(p.price)}`)
    lines.push(`\nTotal: Rp ${formatIDR(total)}`)
    lines.push(`\nNama: `)
    lines.push(`Alamat/Email Canva (jika perlu): `)
    return encodeURIComponent(lines.join('\n'))
  }

  const checkoutWA = () => {
    const wa = '6289601570287'
    const url = `https://wa.me/${wa}?text=${buildMessage()}`
    window.open(url, '_blank')
  }

  return (

          </div>

          <button
            onClick={() => setOpen(false)}

          >
            Tutup
          </button>
        </div>


            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((p, idx) => (

                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}


              <div className="text-2xl font-black text-white">Rp {formatIDR(total)}</div>
            </div>
          </div>


            >
              Checkout WA
            </button>

            <button
              onClick={() => setShowQR((v) => !v)}

            >
              {showQR ? 'Tutup QRIS' : 'Lihat QRIS'}
            </button>

            <button
              disabled={cart.length === 0}
              onClick={() => setCart([])}

            >
              Bersihkan
            </button>
          </div>

          {showQR && (

          </p>
        </div>
      </div>
    </div>
  )
}
