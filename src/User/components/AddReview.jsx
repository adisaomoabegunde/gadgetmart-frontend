import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddReview({ gadgetId, onNewReview }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (rating < 1) { alert("Please give a rating"); return; }
    setLoading(true);

    // If you store a JWT token:
    const token = localStorage.getItem("token");

    if(!token){
      alert("Please login again to add a review.");
      navigate("/user/login");
      return;
    }

    try {
      const res = await fetch(`https://gadgetmart.runasp.net/api/gadgetmart/insertreview/${gadgetId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include", // if you rely on cookies for auth
        body: JSON.stringify({ rating, title, body })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || res.statusText);
      }

      const created = await res.json(); // server returns saved review
      setTitle("");
      setBody("");
      setRating(0);
      if (typeof onNewReview === "function") onNewReview(created);
      alert("Review submitted!");
    } catch (err) {
      console.error("Submit review error:", err);
      alert("Could not submit review: try again");
    } finally {
      setLoading(false);
    }
  }

  return (
   <>
     <div className="add-review">
      <h3>Add a review</h3>

      <form onSubmit={handleSubmit}>
        <div className="stars">
          {[1,2,3,4,5].map((i)=>(
            <button
              type="button"
              key={i}
              className={`star ${i <= (hover || rating) ? "active" : ""}`}
              onClick={() => setRating(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              aria-label={`${i} stars`}
            >
              ★
            </button>
          ))}
        </div>

        <input
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <textarea
          placeholder="Was it good? Pros/Cons?"
          value={body}
          onChange={(e)=>setBody(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting…" : "Submit your review"}
        </button>
      </form>

      <style>{`
        .add-review { background:#fff;padding:18px;border-radius:8px }
        .stars { margin-bottom:8px }
        .star { background:transparent;border:0;font-size:22px;cursor:pointer; color:#ccc }
        .star.active { color: #0f5132 } /* green as screenshot */
        input, textarea { display:block;width:100%;margin:8px 0;padding:8px;border:1px solid #ddd;border-radius:6px }
        button[type="submit"] { background:#0f5132;color:#fff;padding:10px 14px;border-radius:6px;border:0 }
      `}</style>
    </div>
   </>
  );
}