const NotFound = () => {
  return (
    <div>
        <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
            <Link style={{ color: "white" }} to="/">
                Back to Home
            </Link>
        </main>
    </div>
  );
};

export default NotFound;