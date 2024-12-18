const handleSignOut = async () => {
  // The page will refresh if the user navigates away from the page while signed in,
  // so we need to prevent the default behavior of the page reload.
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    localStorage.removeItem("jwtToken");
  });

  const token = localStorage.getItem("jwtToken");
  console.log("Token from localStorage:", token);
  if (localStorage.getItem("isLoggedIn") === "true") {
    try {
      const response = await fetch("http://localhost:3000/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer $(token)}`,
        },
        body: JSON.stringify({ token }),
      });
      if (response.ok) {
        console.log("user signed out");
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "/login";
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
};

export { handleSignOut };
