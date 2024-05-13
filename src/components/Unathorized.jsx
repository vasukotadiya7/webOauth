const Unauthorized = () => {
  alert("Please try to open login website from your app or website");
  window.close();
  return (
    <div>
      <h2>401 Please try to open login website from your app or website</h2>
    </div>
  );
};

export default Unauthorized;
