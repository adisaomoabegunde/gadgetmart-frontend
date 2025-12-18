import React, { useEffect, useState } from "react";

export default function ReviewsList({ gadgetId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    if (!gadgetId) return;
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`https://gadgetmart.runasp.net/api/gadgetmart/reviews/${gadgetId}`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (!cancelled) setReviews(data);
      } catch(err) {
        console.error("Load reviews", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; }
  }, [gadgetId]);

  if (loading) return <div>Loading reviews…</div>;
  if (!reviews.length) return <div>No reviews yet — be the first!</div>;

  return (
    <div className="reviews-list">
      <h3>All reviews</h3>
      {reviews.map(r => (
        <div className="review" key={r.id}>
          <div className="rating">{ "★".repeat(r.rating) + "☆".repeat(5-r.rating) }</div>
          <div className="meta">
            <strong>{r.title}</strong>
            <span className="date">{new Date(r.createdAt).toLocaleString()}</span>
          </div>
          <p>{r.body}</p>
        </div>
      ))}

      <style>{`
        .reviews-list { background:#fff;padding:18px;border-radius:8px }
        .review { border-top:1px solid #eee;padding:12px 0 }
        .rating { color:#0f5132 }
        .meta { display:flex;justify-content:space-between;align-items:center }
        .date { font-size:.85rem;color:#777 }
      `}</style>
    </div>
  );
}