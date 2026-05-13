function formatIDR(n) {
  const num = Number(n)
  if (!Number.isFinite(num)) return String(n)
  return new Intl.NumberFormat('id-ID').format(num)
}

export default function ProductCard({ product, onAdd }) {

          </div>

          <button
            onClick={onAdd}

          </button>
        </div>
      </div>
    </article>
  )
}
