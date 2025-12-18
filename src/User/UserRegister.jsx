import { useState } from "react";
import { apiFetch } from "../components/Gadgets";
import { useLoading } from "./LoadingContext";

export default function RegisterUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const {setLoading} = useLoading();
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await apiFetch("/UserRegister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // Debug: show what apiFetch returned
    console.log("apiFetch returned:", response);

    // Case A: apiFetch returned parsed body (object/string)
    // -> no .headers available
    if (response && typeof response !== "object" && typeof response !== "string") {
      // very unusual, but keep fallback
    }

    // If apiFetch returned a plain body (JSON parsed already)
    if (response && !response.headers) {
      // treat response as the body/result
      const body = response;
      if (typeof body === "object") {
        localStorage.setItem("userr", JSON.stringify(body));
        // redirect
        window.location.href = "/user/login";
        return;
      } else {
        // server returned text message (error or info)
        alert(String(body));
        return;
      }
    }

    // If we reach here, assume response is the raw fetch Response object
    if (!response) throw new Error("No response from server");

    const contentType = (response.headers && response.headers.get && response.headers.get("content-type")) || "";
    let body;
    if (contentType.includes("application/json")) {
      body = await response.json();
    } else {
      body = await response.text();
    }

    if (!response.ok) {
      // If body is object try message, otherwise show text
      throw new Error((body && body.message) || body || HTTP `${response.status}`);
    }

    // Success
    if (typeof body === "object") {
      localStorage.setItem("userr", JSON.stringify(body));
    } else {
      // text success message
      console.log("Register response text:", body);
    }

    window.location.href = "/user/login";
  } catch (err) {
    console.log("Register error:", err.message);
    console.log("raw localstorage user:", localStorage.getItem("userr"));
    alert(err.message);
  }
  setLoading(false);

};

  return (
    <section className="register-page-wrapper page">
      <div className="register-page">
        <header>
          <h1>Register Page</h1>
        </header>

        <div className="form-holder">
          <form className="register" onSubmit={handleSubmit}>
            <label>Name</label><br />
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
            /><br />

            <label>Email</label><br />
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
            /><br />

            <label>Password</label><br />
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
            /><br />

            <input type="submit" value="Register" className="register btn" />
          </form>
        </div>

        <div className="my-5">
          <span>Or </span>
          <a href="/user/login">Login</a>
        </div>
      </div>
    </section>
  );
}