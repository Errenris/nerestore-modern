import { useState } from "react"
import Head from "next/head"
import Header from "../components/Header"

export default function Bonus() {
  const [pass, setPass] = useState("")
  const [ok, setOk] = useState(false)

  // GANTI PASSWORD DI SINI
  const PASSWORD = "nerestore123"

  const bonusLink = "https://pastelink.net/q1ycgxfd"

  function checkPass() {
    if (pass === PASSWORD) {
      setOk(true)
    } else {
      alert("Password salah ❌")
    }
  }

  return (
    <>
      <Head>
        <title>Bonus Resource</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>

      <Header />

      <main className="max-w-xl mx-auto px-6 py-20 text-white">
        <div className="bg-white/5 border border-white/10 p-6 rounded-xl">

          <h1 className="text-2xl font-bold mb-4">🔒 Bonus Resource</h1>

          {!ok ? (
            <>
              <p className="text-gray-400 mb-4">
                Halaman ini khusus member. Masukkan password untuk akses bonus.
              </p>

              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Masukkan password..."
                className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white mb-3"
              />

              <button
                onClick={checkPass}
                className="w-full bg-gradient-to-r from-fuchsia-500 to-amber-400 text-black font-bold py-2 rounded-lg"
              >
                Buka Bonus
              </button>
            </>
          ) : (
            <>
              <p className="text-green-400 mb-4">✅ Akses dibuka</p>

              <a
                href={bonusLink}
                target="_blank"
                rel="nofollow noopener"
                className="block text-center bg-white/10 border border-white/20 py-3 rounded-lg hover:bg-white/20 transition"
              >
                🔗 Klik untuk buka Bonus Resource
              </a>
            </>
          )}

        </div>
      </main>
    </>
  )
}